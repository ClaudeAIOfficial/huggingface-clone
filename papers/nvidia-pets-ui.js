(()=>{"use strict";
const $=s=>document.querySelector(s);
const COPY_LABEL="NVIDIA Pets · Product Paper";
const memoryKey="nvidia-pets-paper-community-v3",voteKey="nvidia-pets-paper-upvote-v3";
function getStored(k,fallback){try{const raw=localStorage.getItem(k);return raw===null?fallback:JSON.parse(raw)}catch{return fallback}}
function setStored(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch{}}
async function copyToClipboard(value,btn){
 let copied=false;
 try{await navigator.clipboard.writeText(value);copied=true}catch{}
 if(!copied){const area=document.createElement("textarea");area.value=value;area.style.cssText="position:fixed;opacity:0;pointer-events:none;";document.body.append(area);area.select();try{copied=document.execCommand("copy")}catch{}area.remove()}
 if(!btn)return;
 const old=btn.dataset.originalLabel||btn.textContent.trim();btn.dataset.originalLabel=old;
 btn.textContent=copied?"Copied!":"Select to copy";
 if(!copied){btn.title=value.slice(0,900)}
 window.setTimeout(()=>{btn.textContent=old},1350);
}
function markdownPaper(){
 const parts=["# NVIDIA Pets","Product paper · October 2026",""];
 const sections=[...document.querySelectorAll(".hf-abstract,.hf-paper-longform section")];
 for(const section of sections){
  const heading=section.querySelector("h2");
  if(heading)parts.push("## "+heading.innerText.trim());
  const intro=section.querySelector(".abstract-highlight");
  if(intro)parts.push(intro.innerText.trim());
  const featured=section.querySelectorAll("h3,p,.feature-point");
  for(const item of featured){
   if(item.closest(".feature-point")&&item.classList.contains("feature-point"))continue;
   if(item.tagName==="H3")parts.push("### "+item.innerText.trim());
   if(item.tagName==="P")parts.push(item.innerText.trim());
  }
  parts.push("");
 }
 return parts.join("\n\n");
}
document.querySelectorAll("[data-copy]").forEach(btn=>btn.addEventListener("click",()=>{
 const abstract=$(".hf-abstract"),what=btn.dataset.copy;
 const v=what==="abstract"?abstract?.innerText.trim():markdownPaper();
 copyToClipboard(v||COPY_LABEL,btn);
}));
$("#copyPaperRef")?.addEventListener("click",e=>copyToClipboard(COPY_LABEL,e.currentTarget));
document.querySelectorAll("[data-scroll]").forEach(btn=>btn.addEventListener("click",()=>{$("#"+btn.dataset.scroll)?.scrollIntoView({behavior:"smooth",block:"start"})}));
const vote=$("#upvotePaper"),counter=$("#upvoteCount");let voted=getStored(voteKey,false)===true;
function updateVote(){vote?.setAttribute("aria-pressed",String(voted));if(counter)counter.textContent=voted?"1":"0"}
vote?.addEventListener("click",()=>{voted=!voted;setStored(voteKey,voted);updateVote()});updateVote();
let comments=getStored(memoryKey,[]);if(!Array.isArray(comments))comments=[];comments=comments.filter(x=>x&&typeof x.text==="string").slice(0,40);
const results=$("#commentResults"),input=$("#paperComment");
function renderComments(){results.replaceChildren();for(const item of comments){const outer=document.createElement("div");outer.className="hf-comment";const by=document.createElement("strong");by.textContent="You  ·  ";const time=document.createElement("small");time.textContent=new Date(item.time).toLocaleDateString();const msg=document.createElement("p");msg.textContent=item.text;outer.append(by,time,msg);results.append(outer)}}
$("#postComment")?.addEventListener("click",()=>{const content=(input?.value||"").trim();if(!content){input?.focus();return}comments.unshift({text:content.slice(0,800),time:Date.now()});comments=comments.slice(0,40);setStored(memoryKey,comments);input.value="";renderComments()});
renderComments();
})();