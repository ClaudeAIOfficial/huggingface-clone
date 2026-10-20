(()=>{"use strict";
const tabs=new Set(["overview","engineering","files","community","about"]);
const get=id=>document.getElementById(id);
function navigate(id,updateHash=true){
 if(!tabs.has(id))return;
 document.querySelectorAll(".tabpanel").forEach(el=>el.classList.toggle("shown",el.id===id));
 document.querySelectorAll(".tabbar [data-tab]").forEach(btn=>{const on=btn.dataset.tab===id;btn.classList.toggle("current",on);btn.setAttribute("aria-selected",String(on))});
 if(updateHash)window.history.replaceState(null,"","#"+id);
}
document.querySelectorAll(".tabbar [data-tab]").forEach(btn=>btn.addEventListener("click",()=>navigate(btn.dataset.tab)));
function jump(hash){
 if(!hash)return;
 const id=hash.replace(/^#/,"");if(tabs.has(id)){navigate(id,false);return}
 const target=get(id);if(!target)return;
 navigate("overview",false);
 requestAnimationFrame(()=>target.scrollIntoView({behavior:"smooth",block:"start"}));
}
window.addEventListener("hashchange",()=>jump(location.hash));if(location.hash)jump(location.hash);
document.querySelectorAll('a[href="#film"]').forEach(a=>a.addEventListener("click",e=>{e.preventDefault();navigate("overview",false);requestAnimationFrame(()=>get("film")?.scrollIntoView({behavior:"smooth",block:"start"}))}));
get("page-search")?.addEventListener("submit",e=>{
 e.preventDefault();const query=get("search-term")?.value.toLowerCase().trim();if(!query)return;
 const found=[...document.querySelectorAll(".tabpanel h2,.tabpanel h3")].find(x=>x.textContent.toLowerCase().includes(query));
 if(found){navigate(found.closest(".tabpanel").id,false);requestAnimationFrame(()=>found.scrollIntoView({behavior:"smooth",block:"start"}))}
 else{get("search-term").setCustomValidity("No matching section");get("search-term").reportValidity()}
});
get("search-term")?.addEventListener("input",e=>e.currentTarget.setCustomValidity(""));
const key="nvidia-pets-robot-feedback-v1";
let posts=[];
try{const data=JSON.parse(localStorage.getItem(key)||"[]");if(Array.isArray(data))posts=data.slice(0,40).filter(x=>x&&typeof x.title==="string"&&typeof x.message==="string")}catch{}
const panel=get("discussionList"),counter=get("discussionCount"),form=get("discussionForm");
function draw(){
 counter.textContent=String(posts.length);panel.replaceChildren();
 if(!posts.length){const empty=document.createElement("div");empty.className="discussion-empty";const b=document.createElement("b");b.textContent="No discussions yet";const p=document.createElement("p");p.textContent="Share a design idea or engineering question.";empty.append(b,p);panel.append(empty);return}
 for(const post of posts){const row=document.createElement("div");row.className="discussion-row";const b=document.createElement("b");b.textContent=post.title;const p=document.createElement("p");p.textContent=post.message;const date=document.createElement("small");date.textContent="Saved locally · "+new Date(post.date).toLocaleDateString();row.append(b,p,date);panel.append(row)}
}
get("newDiscussion")?.addEventListener("click",()=>{form.hidden=!form.hidden;if(!form.hidden)get("discussionTitle")?.focus()});
get("cancelDiscussion")?.addEventListener("click",()=>{form.hidden=true;form.reset()});
form?.addEventListener("submit",e=>{e.preventDefault();const title=get("discussionTitle").value.trim().slice(0,100),message=get("discussionBody").value.trim().slice(0,1200);if(!title||!message)return;posts.unshift({title,message,date:Date.now()});posts=posts.slice(0,40);try{localStorage.setItem(key,JSON.stringify(posts))}catch{}form.reset();form.hidden=true;draw()});
draw();
})();