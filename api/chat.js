// Vercel serverless endpoint. Set HF_TOKEN in Vercel project environment settings.
// The product is an independent project, not an official Hugging Face release.
const MODEL = process.env.HF_MODEL || 'Qwen/Qwen3-32B';
module.exports = async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  if(req.method==='GET')return res.status(200).json({ready:Boolean(process.env.HF_TOKEN)});
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  if(!process.env.HF_TOKEN)return res.status(503).json({error:'Agent Hug needs an inference backend. Set HF_TOKEN in your Vercel environment variables.'});
  const messages=req.body?.messages;
  if(!Array.isArray(messages)||!messages.length||messages.length>60)return res.status(400).json({error:'Invalid conversation.'});
  const safe=messages.slice(-24).map(m=>({role:m.role,content:String(m.content||'').slice(0,12000)}));
  if(safe.some(m=>!['user','assistant'].includes(m.role)))return res.status(400).json({error:'Invalid message role.'});
  try{
    const signal=AbortSignal.timeout(55000);
    const upstream=await fetch('https://router.huggingface.co/v1/chat/completions',{method:'POST',headers:{'Authorization':`Bearer ${process.env.HF_TOKEN}`,'Content-Type':'application/json'},body:JSON.stringify({model:MODEL,messages:[{role:'system',content:'You are Agent Hug, a helpful, clear, friendly AI assistant created for an independent community project. Be accurate, concise, and transparent. Never claim to be an official Hugging Face product or that you are a custom-trained model unless that is actually true.'},...safe],max_tokens:1200,temperature:0.7}),signal});
    const j=await upstream.json().catch(()=>({}));
    if(!upstream.ok)return res.status(502).json({error:'The inference provider could not process the request. Check HF_MODEL and token permissions.'});
    return res.status(200).json({reply:j?.choices?.[0]?.message?.content||''});
  }catch(e){return res.status(502).json({error:'Could not reach the model provider. Please try again.'});}
};
