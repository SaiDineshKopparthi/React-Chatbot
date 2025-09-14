import express from "express";
import { getVertexModel } from "../services/vertex.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    const finalPrompt = `${prompt}\n\nAnswer in no more than 200 words.`;

    const model = await getVertexModel();
    const result = await model.generateContent(finalPrompt);

    const reply =
      result.response.candidates?.[0]?.content?.parts
        ?.map((p) => p.text)
        .join(" ") || "No response generated.";


    res.json({ response: reply });
  } catch (error) {
    console.error("Error during chat:", error.stack || error);
    res.status(500).json({ error: "Failed to generate response." });
  }
});

export default router;