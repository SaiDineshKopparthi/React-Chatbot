import { VertexAI } from "@google-cloud/vertexai";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

let model;

export async function getVertexModel() {
  if (model) return model;

  const project = process.env.GCP_PROJECT;
  const location = process.env.GCP_REGION || "us-east1";
  const secretName = process.env.GOOGLE_SECRET_NAME;

  if (!secretName) {
    throw new Error("GOOGLE_SECRET_NAME is missing or not loaded");
  }

  console.log("Using secret:", secretName);

  const client = new SecretManagerServiceClient();

  const [accessResponse] = await client.accessSecretVersion({
    name: `projects/${project}/secrets/${secretName}/versions/latest`,
  });

  const serviceAccountJSON = accessResponse.payload.data.toString("utf8");

  const vertexAI = new VertexAI({
    project,
    location,
    credentials: JSON.parse(serviceAccountJSON),
  });

  model = vertexAI.getGenerativeModel({
    model: "gemini-2.5-pro",
    generationConfig: {
      maxOutputTokens: 1500,
      temperature: 0.7
    },
    systemInstruction: {
      role: "system",
      parts: [
        { text: "Always provide complete, clear, and well-structured answers in plain text." }
      ]
    },
    safetySettings: [],
  });


  return model;
}