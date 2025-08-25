/* Landing 1 logic: toast, progress, localization */
(function(){
  const $ = (s, r=document)=>r.querySelector(s);

  // Year in footer
  $('#year').textContent = new Date().getFullYear();

  // Geo text via timezone
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  const geo = (tz && tz.includes('Europe/Prague')) ? 'v Praze' : 've tvé oblasti';
  $('#geoText').innerHTML = geo.replace(' ', '&nbsp;');
  $('#geoInline').textContent = geo;

  // Progress bar on scroll
  const progress = $('#progress');
  const onScroll = () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
    progress.style.width = Math.max(0, Math.min(1, scrolled)) * 100 + '%';
  };
  document.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Toast helper
  const toast = (msg, t=2400)=>{
    const el = $('#toast');
    $('#toastMsg').textContent = msg;
    el.classList.add('show');
    setTimeout(()=>el.classList.remove('show'), t);
  };

  // First-visit marker
  try{
    const key = 'l1_first_visit_ts';
    if(!localStorage.getItem(key)){
      localStorage.setItem(key, String(Date.now()));
      toast('Vítej! Toto je statická vizitka mimo IG WebView.');
    }else{
      toast('Vítej zpět 👋');
    }
  }catch(e){/* storage blocked */}

  // CTA → go to gate.html, record source
  $('#unlockBtn').addEventListener('click', (e)=>{
    try{
      localStorage.setItem('l1_last_click_ts', String(Date.now()));
      localStorage.setItem('utm_src', new URL(location.href).searchParams.get('utm_source') || 'direct');
    }catch(_){}
    // allow default navigation (href="gate.html")
  });
})();
