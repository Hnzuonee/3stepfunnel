(function(){
  const $ = (s, r=document)=>r.querySelector(s);

  // Footer year
  $('#year').textContent = new Date().getFullYear();

  // Geo via timezone
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  const geo = (tz && tz.includes('Europe/Prague')) ? 'v Praze' : 've tvé oblasti';
  $('#geoText').innerHTML = geo.replace(' ', '&nbsp;');
  $('#geoInline').textContent = geo;

  // Progress bar
  const progress = $('#progress');
  const onScroll = () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
    progress.style.width = Math.max(0, Math.min(1, scrolled)) * 100 + '%';
    // sticky CTA reveal after 33% scroll
    const sticky = $('#stickyCta');
    if(scrolled > 0.33) sticky.classList.add('show'); else sticky.classList.remove('show');
  };
  document.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Toast
  const toast = (msg, t=2400)=>{
    const el = $('#toast');
    $('#toastMsg').textContent = msg;
    el.classList.add('show');
    setTimeout(()=>el.classList.remove('show'), t);
  };

  try{
    const key = 'l1_first_visit_ts_v2';
    if(!localStorage.getItem(key)){
      localStorage.setItem(key, String(Date.now()));
      toast('Vítej! Tohle je bezpečný SFW náhled. Plný obsah až za branou.');
    }
  }catch(e){}

  // CTA + sticky CTA
  function handleClick(){
    try{
      localStorage.setItem('l1_last_click_ts', String(Date.now()));
      localStorage.setItem('utm_src', new URL(location.href).searchParams.get('utm_source') || 'direct');
    }catch(_){}
    // continue to href (gate.html)
  }
  $('#unlockBtn').addEventListener('click', handleClick);
  $('#stickyCta').addEventListener('click', ()=>{
    handleClick();
    location.href = 'gate.html';
  });
})();