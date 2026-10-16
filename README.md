# Agent Hug website

A static Hugging Face-inspired homepage with an independent Agent Hug chat experience.

## Preview
Open `index.html`, then use **Talk to Agent Hug** to open `agent-hug.html`. The static UI works locally, but AI responses require a deployed server-side API.

## Enable real AI responses on Vercel
1. Deploy this folder to Vercel with the root directory at the project root.
2. Set `HF_TOKEN` in Vercel project environment variables using a token with Hugging Face Inference Providers permissions. Keep it server-side.
3. Optionally set `HF_MODEL` to a currently supported chat model offered through the HF router, e.g. an appropriate Qwen model. Model availability changes and the default may need updating.
4. Redeploy. The `api/chat.js` endpoint calls the Hugging Face OpenAI-compatible inference router.

The project does not train or host a proprietary model yet and is not an official Hugging Face release. Conversation history is stored locally in the browser.
