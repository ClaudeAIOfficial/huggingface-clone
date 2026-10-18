(() => {
  "use strict";
  const ROOT="https://huggingface.co";
  const site={
    models:"/models",datasets:"/datasets",spaces:"/spaces",buckets:"/buckets",storage:"/buckets",
    docs:"/docs",enterprise:"/enterprise",pricing:"/pricing",tasks:"/tasks",chat:"/chat",
    collections:"/collections",languages:"/languages",organizations:"/organizations",blog:"/blog",
    posts:"/posts",papers:"/papers",hardware:"/hardware",learn:"/learn",pro:"/pricing",
    login:"/login",join:"/join",nvidia:"/nvidia",support:"/support",terms:"/terms-of-service",
    "terms-of-service":"/terms-of-service", "organizations-cards":"/docs/hub/organizations-cards",
    "inference-endpoints":"https://endpoints.huggingface.co",discord:"https://discord.gg/hugging-face"
  };
  const authors=new Set(["emelryan","nv-simonec","nv-kmcgill53","nv-sam","nv-kyamasaki","jbalam-nv","erastorgueva-nv","sasha-meister"]);
  const collectionIds=new Set(["parakeet-659711f49d1469e51546e021","nemotron-speech","nemotron-pre-training-datasets","nemotron-math-and-reasoning","nemotron-code-and-swe","nemotron-chat-and-instruction-following","nemotron-agentic-and-tool-use","nemotron-safety-and-content-moderation","nemotron-vision-language","nemotron-reinforcement-learning","nemotron-reward-modeling","nemotron-post-training-datasets","nemotron-supervised-fine-tuning","nemotron-personas","local-ai-optimized-checkpoints","nemotron-labs-dory","llama-nemotron","cosmos-3"]);
  const knownModels=new Set(["parakeet-tdt-0.6b-v3","parakeet-rnnt-1.1b","canary-1b-v2","nemotron-speech-streaming-en-0.6b","nemotron-3.5-asr-streaming-0.6b","parakeet_realtime_eou_120m-v1","multitalker-parakeet-streaming-0.6b-v1","NVIDIA-Nemotron-Parse-v1.2","NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16","NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-NVFP4","NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4"]);
  const articleSlugs=new Set(["scaling-indic-pretraining","nemotron-ioi-and-imo-2026","kumo-tabular","nemotron-diarization","magpie-tts-multilingual-voice-agents","cosmos-h-dreams","state-of-simulation-for-physical-ai","scale-diffusers-finetuning-nemo-automodel","nemotron-3-embed-wins-rteb","open-data-for-agents","nemotron-3-5-content-safety","fine-tuning-nemotron-35-asr","task-seeded-sdg","cosmos-3-for-physical-ai","nemotron-labs-diffusion","cosmos-fine-tuning-for-robot-video-generation","nemotron-3-nano-omni-multimodal-intelligence","raw2insights-adaptive-ultrasound-imaging","build-korean-agents-with-nemotron-personas","nemotron-ocr-v2","gr00t-n1-7","domain-specific-embedding-finetune","nemotron-3-content-safety","speed-bench","nemotron-3-nano-4b","physical-ai-for-healthcare-robotics","nemo-retriever-agentic-retrieval","nemo-agent-toolkit-data-explorer-dabstep-1st-place","synthetic-code-concepts","open-data-for-ai","cosmos-on-jetson","nemotron-personas-japan-nttdata-ja","nemotron-personas-japan-nttdata","nemotron-nano-9b-v2-japanese-ja","nemotron-nano-9b-v2-japanese","nemotron-colembed-v2","cosmos-policy-for-robot-control","nemotron-personas-brazil","nemotron-personas-singapore","earth-2-open-models","llama-nemotron-vl-1b","generalist-robotpolicy-eval-isaaclab-arena-lerobot","nemotron-speech-asr-scaling-voice-agents","nemotron-3-nano-evaluation-recipe","nemotron-3-nano-efficient-open-intelligent-models","custom-policy-reasoning-nemotron-content-safety","nemotron-pii","nemotron-personas-usa","nemotron-vlm-dataset-v2","cosmos-predict-and-transfer2-5","nemotron-open-models-data","llama-embed-nemotron-8b","ioi-gold-medal-with-open-weight","nemotron-personas-india","nemotron-personas-japan-ja","nemotron-personas-japan","multilingual-reasoning-v1","supercharge-ai-reasoning-with-nemotron-nano-2","nemotron-cc-math","ai-q-top-ranking-open-portable-deep-research-agent","multi-llm-nim","openreasoning-nemotron","llama-nemoretriever-colembed","llama-nemotron-nano-vl","cosmos-predict-2","gr00t-n1-5-so101-tuning","supercharge-edge-ai-with-llama-nemotron-nano","nemotron-personas","open-reasoning-models"]);
  const spaces=new Set(["PhysicalAI-Robotics-VoMP-Demo","PhysicalAI-OOD-Leaderboard","kvpress-leaderboard","nv-generate","music-flamingo","nemotron-labs-audio-visual-flamingo"]);
  const datasetNames=new Set(["simready-dsx","simready-assets","Open-H-RF","nemotron-indic-pretraining-report","Nemotron-Personas-Vietnam","omni-dreams-scenes","Nemotron-SFT-BBQ-v1","Nemotron-RL-litmus-bench-v0.2","Nemotron-Image-Training-v3.5","Nemotron-SFT-Instruction-Following-Chat-v4"]);
  const knownOther={
    "parakeet-659711f49d1469e51546e021":"/collections/nvidia/parakeet-asr",
    "nvidia":"/nvidia", "buckets":"/buckets",
    "nemotron-transcribe-storage":"/buckets/nvidia/nemotron-transcribe-storage"
  };
  function route(a){
    const raw=a.getAttribute("href"); if(!raw || raw[0]==="#" || /^(mailto:|tel:|javascript:|data:)/i.test(raw))return null;
    let u;try{u=new URL(raw,location.href)}catch{return null}
    if(u.hostname!=="huggingface.co" && u.hostname!==location.hostname)return null;
    let path=u.pathname;
    if(path.startsWith("/pages/"))path="/"+path.slice(7).replace(/\.html$/,"");
    else if(/^\.\/pages\//.test(raw))path="/"+raw.replace(/^\.\/pages\//,"").replace(/\.html(?:\?.*)?$/,"");
    else if(path.startsWith("/nvidia/"))path="/"+path.slice("/nvidia/".length);
    else if(path.startsWith("/blog/nvidia/")||path.startsWith("/collections/")||path.startsWith("/datasets/")||path.startsWith("/spaces/")||path.startsWith("/buckets/"))return null;
    else if(path==="/"||path==="/nvidia")return null;
    else if(path.startsWith("/api/")||path.startsWith("/front/"))return null;
    const slug=decodeURIComponent(path.slice(1));
    if(!slug || slug.includes("/") || !/^[\w.\-]+$/.test(slug))return null;
    let out;
    if(site[slug])out=site[slug];
    else if(knownOther[slug])out=knownOther[slug];
    else if(authors.has(slug))out="/"+slug;
    else if(articleSlugs.has(slug))out="/blog/nvidia/"+slug;
    else if(collectionIds.has(slug))out="/collections/nvidia/"+slug;
    else if(spaces.has(slug)||a.closest("#spaces"))out="/spaces/nvidia/"+slug;
    else if(datasetNames.has(slug)||a.closest("#datasets"))out="/datasets/nvidia/"+slug;
    else if(a.closest("#buckets"))out="/buckets/nvidia/"+slug;
    else if(a.closest("#collections"))out="/collections/nvidia/"+slug;
    else if(knownModels.has(slug)||a.closest("#models"))out="/nvidia/"+slug;
    else if(a.closest("section")?.textContent?.includes("Articles"))out="/blog/nvidia/"+slug;
    else out="/nvidia/"+slug;
    return /^https?:/.test(out)?out:ROOT+out;
  }
  function apply(){
    let fixed=0;
    document.querySelectorAll("a[href]").forEach(a=>{
      const fixedUrl=route(a);
      if(fixedUrl && fixedUrl!==a.href){a.href=fixedUrl;fixed++}
    });
    document.documentElement.dataset.correctedHfLinks=String(fixed);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",apply,{once:true});else apply();
  document.addEventListener("click",event=>{
    const a=event.target.closest?.("a[href]");if(!a)return;
    const target=route(a);if(target&&target!==a.href)a.href=target;
  },true);
})();