(()=>{"use strict";
const $=s=>document.querySelector(s);
const paperId="NVIDIA-PETS-001";
const voteKey="nvidia-pets-paper-upvote-v3";
function getVote(){try{return localStorage.getItem(voteKey)==="true"}catch{return false}}
function setVote(v){try{localStorage.setItem(voteKey,String(v))}catch{}}
function titleFor(el){return el?.textContent?.trim()||""}
function asMarkdown(){
  const parts=["# NVIDIA Pets","","Product paper · October 2026","","Authors: NVIDIA Pets Design, NVIDIA Pets Robotics, NVIDIA Pets Research (editorial group credits)",""];
  const abstract=$(".hf-abstract");
  if(abstract){
    parts.push("## Abstract","");
    for(const el of abstract.querySelectorAll(".abstract-highlight,p"))parts.push(titleFor(el),"");
  }
  for(const section of document.querySelectorAll(".hf-paper-longform section")){
    const heading=section.querySelector("h2");
    if(heading)parts.push("## "+titleFor(heading),"");
    for(const child of section.querySelectorAll("p,h3,.feature-point")){
      if(child.classList?.contains("feature-point")){
        const name=child.querySelector("h3"),p=child.querySelector("p");
        if(name)parts.push("### "+titleFor(name));
        if(p)parts.push(titleFor(p),"");
      }else if(child.closest(".feature-point")){
        continue;
      }else if(child.tagName==="H3"){
        parts.push("### "+titleFor(child));
      }else if(child.tagName==="P"){
        parts.push(titleFor(child),"");
      }
    }
  }
  parts.push("Editorial design specification: robot capabilities described here are illustrative, not verified official NVIDIA features.");
  return parts.join("\n");
}
async function writeClipboard(value,button){
  let success=false;
  try{await navigator.clipboard.writeText(value);success=true}catch{}
  if(!success){
    const t=document.createElement("textarea");t.value=value;t.style.cssText="position:fixed;left:-2000px;top:0;opacity:0;";document.body.append(t);t.select();
    try{success=document.execCommand("copy")}catch{}t.remove();
  }
  if(button){
    const label=button.dataset.buttonLabel||button.innerHTML;
    button.dataset.buttonLabel=label;
    if(success)button.textContent="Copied!";
    else {button.textContent="Select to copy";button.title=value.slice(0,500)}
    setTimeout(()=>{button.innerHTML=label},1100);
  }
}
for(const btn of document.querySelectorAll("[data-copy]")){
  btn.addEventListener("click",()=>{
    const raw=$(".hf-abstract");
    const text=btn.dataset.copy==="abstract"?titleFor(raw):asMarkdown();
    writeClipboard(text,btn);
  });
}
$("#copyPaperRef")?.addEventListener("click",e=>writeClipboard(paperId,e.currentTarget));
for(const button of document.querySelectorAll("[data-scroll]")){
  button.addEventListener("click",()=>$("#"+button.dataset.scroll)?.scrollIntoView({behavior:"smooth",block:"start"}));
}
const vote=$("#upvotePaper"),counter=$("#upvoteCount");
let voted=getVote();
function displayVote(){vote?.setAttribute("aria-pressed",String(voted));if(counter)counter.textContent=voted?"1":"0"}
vote?.addEventListener("click",()=>{voted=!voted;setVote(voted);displayVote()});displayVote();
})();