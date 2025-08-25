(function(){
  const $ = (s, r=document)=>r.querySelector(s);
  const slidesWrap = $('#slides');
  const slideEls = Array.from(slidesWrap.querySelectorAll('.slide'));
  const prev = $('#prevBtn');
  const next = $('#nextBtn');
  const dotsWrap = $('#dots');

  let idx = 0;
  function go(i){
    idx = (i + slideEls.length) % slideEls.length;
    slidesWrap.style.transform = `translateX(-${idx*100}%)`;
    slideEls.forEach((el, k)=> el.classList.toggle('is-active', k===idx));
    updateDots();
  }

  function updateDots(){
    dotsWrap.innerHTML='';
    slideEls.forEach((_, i)=>{
      const b = document.createElement('button');
      b.setAttribute('role','tab');
      b.setAttribute('aria-selected', i===idx ? 'true' : 'false');
      b.addEventListener('click', ()=>go(i));
      dotsWrap.appendChild(b);
    });
  }

  prev.addEventListener('click', ()=>go(idx-1));
  next.addEventListener('click', ()=>go(idx+1));

  // Swipe support
  let sx=0, dx=0;
  slidesWrap.addEventListener('pointerdown', e=>{ sx=e.clientX; slidesWrap.setPointerCapture(e.pointerId); });
  slidesWrap.addEventListener('pointerup', e=>{
    dx = e.clientX - sx;
    if(Math.abs(dx) > 40){
      if(dx<0) go(idx+1); else go(idx-1);
    }
  });

  // Auto-advance (gentle)
  setInterval(()=>go(idx+1), 6500);

  updateDots();
  go(0);
})();