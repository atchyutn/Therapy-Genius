import json
import math

def reduce_lottie_json(input_file, output_file, precision=2):
    # Load the Lottie JSON file
    with open(input_file, 'r') as f:
        lottie_data = json.load(f)
    
    # Reduce the JSON
    reduced_data = reduce_animation(lottie_data, precision)
    
    # Remove empty or invisible layers
    reduced_data = remove_empty_invisible_layers(reduced_data)
    
    # Save the reduced JSON
    with open(output_file, 'w') as f:
        json.dump(reduced_data, f, separators=(',', ':'))

def reduce_animation(data, precision):
    if isinstance(data, dict):
        return {k: reduce_animation(v, precision) for k, v in data.items()}
    elif isinstance(data, list):
        return [reduce_animation(v, precision) for v in data]
    elif isinstance(data, float):
        return round(data, precision)
    else:
        return data

def remove_unused_assets(data):
    used_assets = set()
    for layer in data.get('layers', []):
        if 'refId' in layer:
            used_assets.add(layer['refId'])
    
    data['assets'] = [asset for asset in data.get('assets', []) if asset.get('id') in used_assets]
    return data

def simplify_keyframes(data, tolerance=0.001):
    if 'k' in data and isinstance(data['k'], list) and len(data['k']) > 2:
        simplified = [data['k'][0]]
        for i in range(1, len(data['k']) - 1):
            prev, curr, next = data['k'][i-1], data['k'][i], data['k'][i+1]
            if not is_keyframe_redundant(prev, curr, next, tolerance):
                simplified.append(curr)
        simplified.append(data['k'][-1])
        data['k'] = simplified
    return data

def is_keyframe_redundant(prev, curr, next, tolerance):
    t1, t2 = curr['t'] - prev['t'], next['t'] - curr['t']
    for i in range(len(curr['s'])):
        expected = prev['s'][i] + (next['s'][i] - prev['s'][i]) * (t1 / (t1 + t2))
        if abs(curr['s'][i] - expected) > tolerance:
            return False
    return True

def remove_empty_invisible_layers(data):
    if 'layers' in data:
        data['layers'] = [layer for layer in data['layers'] if not is_layer_empty_or_invisible(layer)]
    return data

def is_layer_empty_or_invisible(layer):
    # Check if the layer has zero duration
    if layer.get('ip', 0) >= layer.get('op', 0):
        return True
    
    # Check if the layer has zero opacity
    if 'ks' in layer and 'o' in layer['ks']:
        opacity = layer['ks']['o'].get('k', 100)
        if isinstance(opacity, (int, float)) and opacity == 0:
            return True
        elif isinstance(opacity, list) and all(keyframe.get('s', [100])[0] == 0 for keyframe in opacity):
            return True
    
    # Check if the layer is a shape layer with no shapes
    if layer.get('ty') == 4 and 'shapes' in layer and len(layer['shapes']) == 0:
        return True
    
    # The layer is not empty or invisible
    return False

# Usage
input_file = './activities-loader.json'
output_file = './activities-loader.json'
reduce_lottie_json(input_file, output_file)