export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID;
const POLLING_INTERVAL = 1000; // 1 second

interface RequestBody {
  name: string;
  age: number;
  gender: string;
  therapyType: string;
  goals: string[];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedBody = validateRequestBody(body);

    const thread = await createThread();
    await addMessageToThread(thread.id, validatedBody);
    const run = await runAssistant(thread.id);
    await waitForRunCompletion(thread.id, run.id);
    const activities = await retrieveActivities(thread.id);

    await deleteThread(thread.id);

    return NextResponse.json({ activities });
  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

function validateRequestBody(body: any): RequestBody {
  const { name, age, gender, therapyType, goals } = body;

  if (!name || typeof name !== "string") {
    throw new Error("Invalid name");
  }
  if (!age || typeof Number(age) !== "number" || age <= 0) {
    throw new Error("Invalid age");
  }
  if (!gender || typeof gender !== "string") {
    throw new Error("Invalid gender");
  }
  if (!therapyType || typeof therapyType !== "string") {
    throw new Error("Invalid therapyType");
  }
  if (!goals || !Array.isArray(goals) || goals.length === 0) {
    throw new Error("Invalid goals");
  }

  return { name, age, gender, therapyType, goals };
}

async function createThread() {
  return await openai.beta.threads.create();
}

async function addMessageToThread(threadId: string, body: RequestBody) {
  const { name, age, gender, therapyType, goals } = body;
  await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: `{Name: ${name}, Age: ${age} years, Gender: ${gender}, Therapy Type: ${therapyType}, Goals: ${goals.join(
      ", "
    )}}`,
  });
}

async function runAssistant(threadId: string) {
  if (!ASSISTANT_ID) {
    throw new Error("ASSISTANT_ID is not defined");
  }
  return await openai.beta.threads.runs.create(threadId, {
    assistant_id: ASSISTANT_ID,
  });
}

async function waitForRunCompletion(threadId: string, runId: string) {
  let status;
  do {
    const statusResponse = await openai.beta.threads.runs.retrieve(
      threadId,
      runId
    );
    status = statusResponse.status;
    console.log(`Run status: ${status}`);
    if (status !== "completed") {
      await new Promise((resolve) => setTimeout(resolve, POLLING_INTERVAL));
    }
  } while (status !== "completed");
}

async function retrieveActivities(threadId: string) {
  const messagesResponse = await openai.beta.threads.messages.list(threadId);
  const latestMessage = messagesResponse.data[0];
  if (latestMessage.content[0].type === "text") {
    console.log(latestMessage.content[0].text.value);
    return latestMessage.content[0].text.value;
  }
  return {};
}

async function deleteThread(threadId: string) {
  await openai.beta.threads.del(threadId);
}
