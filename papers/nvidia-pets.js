(()=>{"use strict";
const $=s=>document.querySelector(s);
const abstractText="NVIDIA Pets is a browser-based digital companion prototype that explores how independent robotic-animal characters can display movement, personality-specific responses, and memory within a shared interactive environment.";
const citation="NVIDIA Pets project contributors. (2026). NVIDIA Pets: Interactive Multi-Agent Digital Companions with Autonomous Behavior and Local Memory. Independent project report, version 0.1. https://github.com/ClaudeAIOfficial/huggingface-clone/tree/main/nvidia-pets";
async function copy(text,btn){
 try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(text)}else{const el=document.createElement("textarea");el.value=text;el.style.position="fixed";el.style.left="-1000px";document.body.appendChild(el);el.select();document.execCommand("copy");el.remove()}const label=btn.textContent;btn.textContent="Copied";setTimeout(()=>btn.textContent=label,1300)}
 catch{btn.textContent="Select and copy"}
}
$("#copyCitation")?.addEventListener("click",e=>copy(citation,e.currentTarget));
$("#copyAbstract")?.addEventListener("click",e=>copy(abstractText,e.currentTarget));
const search=$("#paperSearch");
search?.addEventListener("keydown",e=>{
 if(e.key!=="Enter")return;e.preventDefault();
 const q=search.value.trim().toLowerCase();if(!q)return;
 const sections=[...document.querySelectorAll("main h2,main h3")];const found=sections.find(x=>x.textContent.toLowerCase().includes(q));
 if(found)found.scrollIntoView({behavior:"smooth",block:"start"});
 else search.setCustomValidity("No matching heading");
});
search?.addEventListener("input",()=>search.setCustomValidity(""));
const KEY="nvidia-pets-paper-comments-v1";let comments=[];
try{const stored=JSON.parse(localStorage.getItem(KEY)||"[]");if(Array.isArray(stored))comments=stored.filter(c=>c&&typeof c.text==="string").slice(0,60)}catch{}
const list=$("#commentList"),count=$("#commentCount");
function render(){if(count)count.textContent=comments.length+" comment"+(comments.length===1?"":"s");if(!list)return;list.replaceChildren();for(const c of comments){
 const div=document.createElement("div");div.className="posted";
 const avatar=document.createElement("div");avatar.className="avatar";avatar.textContent="You";
 const wrap=document.createElement("div");const name=document.createElement("b");name.textContent="You";
 const date=document.createElement("small");date.textContent=new Date(c.at).toLocaleDateString(undefined,{month:"short",day:"numeric",year:"numeric"});
 const p=document.createElement("p");p.textContent=c.text;wrap.append(name,date,p);div.append(avatar,wrap);list.append(div);
}}
render();
$("#commentForm")?.addEventListener("submit",e=>{
 e.preventDefault();const field=$("#commentInput"),value=field.value.trim();
 if(!value){field.focus();return}
 comments.unshift({text:value.slice(0,1000),at:Date.now()});comments=comments.slice(0,60);
 try{localStorage.setItem(KEY,JSON.stringify(comments))}catch{}
 field.value="";render();
});
})();