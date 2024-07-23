function parseActivitiesResponse(response: any) {
  if (!response) {
    return "No activities found.";
  }

  let formattedResponse = "";

  for (const [key, value] of Object.entries(response)) {
    console.log("parser activity",key, value);
    if (key.startsWith("Goal")) {
      formattedResponse += `${key}: ${value}\n\nActivities:\n`;
    } else if (key === "Activities" && Array.isArray(value)) {
      value.forEach((activity: any, index: number) => {
        formattedResponse += `Activity ${index + 1}:\n`;
        for (const [actKey, actValue] of Object.entries(activity)) {
          formattedResponse += `  ${actKey}: ${actValue}\n`;
        }
        formattedResponse += "\n";
      });
    }
  }

  return formattedResponse.replace(/"/g, "");
}
