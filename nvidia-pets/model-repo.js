/* Extended model-repository UI: local community drafts and file/use controls. */
(()=>{
  "use strict";
  const lsKey="nvidia-pets-model-community-v1";
  const likedKey="nvidia-pets-liked";
  const savedKey="nvidia-pets-saved";
  const qs=id=>document.getElementById(id);
  function readPosts(){try{const saved=JSON.parse(localStorage.getItem(lsKey)||"[]");return Array.isArray(saved)?saved.slice(0,50):[]}catch{return []}}
  function safeWrite(posts){try{localStorage.setItem(lsKey,JSON.stringify(posts))}catch{}}
  let posts=readPosts();
  let filter="all";
  const formatDate=timestamp=>{try{return new Intl.DateTimeFormat(undefined,{month:"short",day:"numeric"}).format(new Date(timestamp))}catch{return "recently"}};
  const favorites=qs("favoriteRepo"),save=qs("saveRepo");
  function setFav(){
    const on=localStorage.getItem(likedKey)==="yes";
    favorites?.setAttribute("aria-pressed",String(on));
    if(favorites)favorites.innerHTML=(on?"♥ Liked ":"♡ Like ")+'<span id="likeCount">'+(on?"1":"0")+"</span>";
    const saved=localStorage.getItem(savedKey)==="yes";
    save?.setAttribute("aria-pressed",String(saved));
    if(save)save.textContent=saved?"★ Saved":"☆ Save";
  }
  favorites?.addEventListener("click",()=>{localStorage.setItem(likedKey,localStorage.getItem(likedKey)==="yes"?"no":"yes");setFav()});
  save?.addEventListener("click",()=>{localStorage.setItem(savedKey,localStorage.getItem(savedKey)==="yes"?"no":"yes");setFav()});
  setFav();
  const panel=qs("usagePanel");
  qs("openUsage")?.addEventListener("click",()=>{
    panel.hidden=!panel.hidden;
    qs("openUsage").setAttribute("aria-expanded",String(!panel.hidden));
  });
  document.querySelectorAll(".copy-snippet").forEach(button=>{
    button.addEventListener("click",async()=>{
      const target=qs(button.dataset.copyTarget);
      if(!target)return;
      const source=target.innerText||target.textContent;
      try{
        if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(source);
        else{
          const field=document.createElement("textarea");field.value=source;field.style.position="fixed";field.style.opacity="0";document.body.append(field);field.select();document.execCommand("copy");field.remove();
        }
        button.textContent="Copied";
        setTimeout(()=>{button.textContent="Copy"},1100);
      }catch{button.textContent="Select text"}
    });
  });
  const form=qs("discussionForm");
  qs("newDiscussion")?.addEventListener("click",()=>{
    form.hidden=!form.hidden;
    if(!form.hidden)qs("discussionTitle")?.focus();
  });
  qs("cancelDiscussion")?.addEventListener("click",()=>{form.hidden=true;form.reset()});
  const list=qs("discussionList");
  const discussionCount=qs("communityCount");
  function drawPosts(){
    if(discussionCount)discussionCount.textContent=posts.length;
    list.replaceChildren();
    const phrase=(qs("discussionSearch")?.value||"").toLowerCase().trim();
    const shown=posts.filter(post=>(filter==="all"||filter===post.kind)&&post.title.toLowerCase().includes(phrase));
    if(!shown.length){
      const empty=document.createElement("div");empty.className="discussion-empty";
      const strong=document.createElement("strong");strong.textContent=posts.length?"No matching discussions":"Welcome to the community";
      const detail=document.createElement("span");detail.textContent=posts.length?"Try a different search or filter.":"Start a local conversation about pet behaviors, feature ideas or suggestions.";
      empty.append(strong,detail);list.append(empty);return;
    }
    for(const post of shown){
      const row=document.createElement("article");row.className="discussion-item";
      const icon=document.createElement("div");icon.className="discussion-icon";icon.textContent=post.kind==="suggestion"?"✦":"◉";
      const copy=document.createElement("div");copy.style.minWidth="0";
      const title=document.createElement("h3");title.textContent=post.title;
      const message=document.createElement("p");message.textContent=post.message;
      const meta=document.createElement("small");meta.textContent=(post.kind==="suggestion"?"Suggestion":"Discussion")+" · Saved locally · "+formatDate(post.createdAt);
      copy.append(title,message,meta);row.append(icon,copy);list.append(row);
    }
  }
  qs("discussionSearch")?.addEventListener("input",drawPosts);
  document.querySelectorAll("[data-discussion-filter]").forEach(button=>{
    button.addEventListener("click",()=>{
      filter=button.dataset.discussionFilter;
      document.querySelectorAll("[data-discussion-filter]").forEach(b=>b.classList.toggle("active",b===button));
      drawPosts();
    })
  });
  form?.addEventListener("submit",e=>{
    e.preventDefault();
    const title=qs("discussionTitle").value.trim().slice(0,100);
    const message=qs("discussionBody").value.trim().slice(0,1200);
    if(!title||!message)return;
    const kind=/\b(add|feature|suggest|idea|request|should)\b/i.test(title)?"suggestion":"discussion";
    posts.unshift({id:Date.now(),title,message,kind,createdAt:Date.now()});
    posts=posts.slice(0,50);safeWrite(posts);form.reset();form.hidden=true;drawPosts();
  });
  drawPosts();
  // TOC links point to the model card, even when another tab is currently open.
  document.querySelectorAll(".toc-rail a").forEach(link=>link.addEventListener("click",event=>{
    const target=qs((link.getAttribute("href")||"").slice(1));
    if(!target)return;
    event.preventDefault();
    qs("tab-overview")?.click();
    requestAnimationFrame(()=>target.scrollIntoView({behavior:"smooth",block:"start"}));
  }));
  document.querySelectorAll('a[data-switch="demo"],a[data-switch="files"]').forEach(link=>link.addEventListener("click",event=>{
    event.preventDefault();
    const tab=link.dataset.switch;
    qs("tab-"+tab)?.click();
    qs(tab)?.scrollIntoView({behavior:"smooth",block:"start"});
  }));
  // The like/save controls are browser-local: no false server counts or public follow claims.
})();