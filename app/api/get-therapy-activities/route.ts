import axios from "axios";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Only POST requests are allowed" });
    return;
  }

  const { name, age, gender, therapyType, goals } = req.body;

  if (!isTherapyRelated(goals)) {
    res.status(400).json({ message: "Query not related to therapy goals" });
    return;
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: generatePrompt(name, age, gender, therapyType, goals),
        max_tokens: 200,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    res.status(200).json({ activities: response.data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

function isTherapyRelated(goals: string[]) {
  const therapyKeywords = [
    "therapy",
    "rehabilitation",
    "treatment",
    "exercise",
    "activity",
  ];
  return therapyKeywords.some((keyword) => goals.includes(keyword));
}

const formatTemplate = `
{
  "Goal": "Goal Description",
  "Activities": [
    {
      "Activity": "Activity Description",
      "Objective": "Objective of the activity",
      "Procedure": "Step-by-step procedure",
      "Task": "Task to be completed"
    }
  ]
}
`;

function generatePrompt(
  name: string,
  age: number,
  gender: string,
  therapyType: string,
  goals: string[]
) {
  return `Given the following details:

Name: ${name}
Age: ${age} years
Gender: ${gender}
Therapy Type: ${therapyType}

Goals:
${goals}

Suggest therapy activities in JSON format based on the above information. Use the following format:

${formatTemplate}

Please ensure the response is concise and formatted as JSON.`;
}
