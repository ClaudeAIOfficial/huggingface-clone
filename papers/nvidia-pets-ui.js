/* Paper controls: clipboard, local reaction, safe draft preview, and theme. */
(()=>{
"use strict";
const $=s=>document.querySelector(s);
const paperId="NVIDIA-PETS-001";
const voteKey="nvidia-pets-paper-upvote-v3";
const draftKey="nvidia-pets-paper-draft-v1";
const themeKey="nvidia-pets-paper-theme-v1";
function readStored(key,fallback){try{const value=localStorage.getItem(key);return value===null?fallback:value}catch{return fallback}}
function writeStored(key,value){try{localStorage.setItem(key,value)}catch{}}
function text(el){return el?.textContent?.trim()||""}
function asMarkdown(){
 const parts=["# NVIDIA Pets","","Product paper · October 2026","","Authors: NVIDIA (project-supplied attribution)",""];
 const abstract=$(".hf-abstract");
 if(abstract){parts.push("## Abstract","");for(const el of abstract.querySelectorAll(".abstract-highlight,p"))parts.push(text(el),"")}
 for(const section of document.querySelectorAll(".hf-paper-longform section")){
  const heading=section.querySelector("h2");if(heading)parts.push("## "+text(heading),"");
  for(const child of section.querySelectorAll("p,h3,.feature-point")){
   if(child.classList?.contains("feature-point")){
    const title=child.querySelector("h3"),paragraph=child.querySelector("p");
    if(title)parts.push("### "+text(title));if(paragraph)parts.push(text(paragraph),"");
   }else if(child.closest(".feature-point")){continue}
   else if(child.tagName==="H3"){parts.push("### "+text(child))}
   else if(child.tagName==="P"){parts.push(text(child),"")}
  }
 }
 parts.push("Editorial design specification: robot capabilities described here are illustrative, not verified official NVIDIA features.");
 return parts.join("\n");
}
async function writeClipboard(value,button){
 let success=false;
 try{await navigator.clipboard.writeText(value);success=true}catch{}
 if(!success){const field=document.createElement("textarea");field.value=value;field.style.cssText="position:fixed;left:-2000px;top:0;opacity:0;";document.body.append(field);field.select();try{success=document.execCommand("copy")}catch{}field.remove()}
 if(!button)return;
 const label=button.dataset.buttonLabel||button.innerHTML;button.dataset.buttonLabel=label;
 if(success)button.textContent="Copied!";else{button.textContent="Select to copy";button.title=value.slice(0,500)}
 setTimeout(()=>{button.innerHTML=label},1100);
}
for(const button of document.querySelectorAll("[data-copy]"))button.addEventListener("click",()=>writeClipboard(button.dataset.copy==="abstract"?text($(".hf-abstract")):asMarkdown(),button));
for(const id of ["#copyPaperRef","#copyPaperBadge"])$(id)?.addEventListener("click",event=>writeClipboard(paperId,event.currentTarget));
const reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)");
function scrollToElement(el){el?.scrollIntoView({behavior:reducedMotion.matches?"auto":"smooth",block:"start"})}
for(const button of document.querySelectorAll("[data-scroll]"))button.addEventListener("click",()=>scrollToElement(document.getElementById(button.dataset.scroll)));
const vote=$("#upvotePaper"),counter=$("#upvoteCount");let voted=readStored(voteKey,"false")==="true";
function renderVote(){vote?.setAttribute("aria-pressed",String(voted));if(counter)counter.textContent=voted?"1":"0"}
vote?.addEventListener("click",()=>{voted=!voted;writeStored(voteKey,String(voted));renderVote()});renderVote();

/* Comments are drafts only. No public posting or credential collection. */
const editor=$("#paperDraft"),preview=$("#commentPreviewPanel"),editPanel=$("#commentEditPanel");
const editTab=$("#commentEditTab"),previewTab=$("#commentPreviewTab");
function inlinePreview(parent,value){
 const tokens=/(\*\*([^*\n]+)\*\*|`([^`\n]+)`|\*([^*\n]+)\*)/g;let last=0,match;
 while((match=tokens.exec(value))!==null){
  if(match.index>last)parent.append(document.createTextNode(value.slice(last,match.index)));
  const tag=match[2]?"strong":match[3]?"code":"em";
  const node=document.createElement(tag);node.textContent=match[2]||match[3]||match[4];parent.append(node);last=tokens.lastIndex;
 }
 if(last<value.length)parent.append(document.createTextNode(value.slice(last)));
}
function renderPreview(){
 if(!preview||!editor)return;preview.replaceChildren();const value=editor.value.trim();
 if(!value){const empty=document.createElement("p");empty.className="paper-preview-empty";empty.textContent="Nothing to preview yet.";preview.append(empty);return}
 for(const paragraph of value.split(/\n\s*\n/)){const block=document.createElement("p");inlinePreview(block,paragraph);preview.append(block)}
}
function selectEditorTab(which,focus=false){
 if(!editor||!preview||!editPanel||!editTab||!previewTab)return;
 const isPreview=which==="preview";editPanel.hidden=isPreview;preview.hidden=!isPreview;
 editTab.setAttribute("aria-selected",String(!isPreview));previewTab.setAttribute("aria-selected",String(isPreview));editTab.tabIndex=isPreview?-1:0;previewTab.tabIndex=isPreview?0:-1;
 if(isPreview)renderPreview();if(focus)(isPreview?previewTab:editTab).focus();
}
if(editor){editor.value=readStored(draftKey,"").slice(0,6000);editor.addEventListener("input",()=>{writeStored(draftKey,editor.value);if(preview&&!preview.hidden)renderPreview()})}
editTab?.addEventListener("click",()=>selectEditorTab("edit"));previewTab?.addEventListener("click",()=>selectEditorTab("preview"));
for(const tab of [editTab,previewTab])tab?.addEventListener("keydown",event=>{
 if(["ArrowLeft","ArrowRight","Home","End"].includes(event.key)){event.preventDefault();const next=event.key==="Home"?"edit":event.key==="End"?"preview":tab===editTab?"preview":"edit";selectEditorTab(next,true)}
});
$("#paperReply")?.addEventListener("click",()=>{selectEditorTab("edit");scrollToElement($(".paper-comment-box"));editor?.focus({preventScroll:true})});

/* Theme choice stays local and follows the OS in System mode. */
const allowedThemes=new Set(["system","light","dark"]);
let theme=readStored(themeKey,"system");if(!allowedThemes.has(theme))theme="system";
const darkPreference=window.matchMedia("(prefers-color-scheme: dark)");
const themeMenu=$("#paperThemeMenu"),themeButton=$("#paperThemeButton"),themeLabel=$("#paperThemeLabel");
function applyTheme(){
 const resolved=theme==="system"?(darkPreference.matches?"dark":"light"):theme;
 document.documentElement.dataset.paperTheme=resolved;
 if(themeLabel)themeLabel.textContent=theme.charAt(0).toUpperCase()+theme.slice(1)+" theme";
 for(const button of document.querySelectorAll("[data-theme-choice]"))button.setAttribute("aria-pressed",String(button.dataset.themeChoice===theme));
}
function closeThemeMenu(){if(themeMenu)themeMenu.hidden=true;themeButton?.setAttribute("aria-expanded","false")}
themeButton?.addEventListener("click",()=>{if(!themeMenu)return;themeMenu.hidden=!themeMenu.hidden;themeButton.setAttribute("aria-expanded",String(!themeMenu.hidden))});
for(const button of document.querySelectorAll("[data-theme-choice]"))button.addEventListener("click",()=>{const choice=button.dataset.themeChoice;if(!allowedThemes.has(choice))return;theme=choice;writeStored(themeKey,theme);applyTheme();closeThemeMenu();themeButton?.focus()});
document.addEventListener("click",event=>{if(!event.target.closest?.(".paper-theme-control"))closeThemeMenu()});
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&themeMenu&&!themeMenu.hidden){closeThemeMenu();themeButton?.focus()}});
if(darkPreference.addEventListener)darkPreference.addEventListener("change",()=>{if(theme==="system")applyTheme()});
applyTheme();
})();
