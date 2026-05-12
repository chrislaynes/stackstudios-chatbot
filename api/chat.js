import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are the AI assistant for Stack Studios...
[paste your full stackstudios_faq.md content here]
Only answer using the information above. If you don't know, say so and offer to connect the visitor with Chris. Only ask for name/email/phone when the visitor explicitly asks to be contacted.`;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { messages } = req.body;
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    max_tokens: 400,
  });
  res.json({ reply: completion.choices[0].message.content });
}