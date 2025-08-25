/* Landing 2 logic: countdown to 23:59, scarcity, notifications */
(function(){
  const $ = (s, r=document)=>r.querySelector(s);

  // Footer year
  $('#year').textContent = new Date().getFullYear();

  // Geo via timezone
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  const geo = (tz && tz.includes('Europe/Prague')) ? 'v Praze' : 've tvé oblasti';
  $('#geoText').innerHTML = geo.replace(' ', '&nbsp;');
  $('#geoInline').innerHTML = geo.replace(' ', '&nbsp;');

  // Countdown target: persist per-device to end of "today" 23:59:59
  const storage = {
    get(k){ try{ return JSON.parse(localStorage.getItem(k)); }catch(_){ return null } },
    set(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(_){ } }
  };

  function endOfTodayTs(){
    const now = new Date();
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    return end.getTime();
  }

  function ensureTarget(){
    let t = storage.get('gate_target_ts');
    const now = Date.now();
    if(!t || now > t){
      t = endOfTodayTs();
      storage.set('gate_target_ts', t);
      // (Re)seed counters at new day
      seedCounters(true);
    }
    return t;
  }

  // Digits update helper
  const ids = ['hh1','hh2','mm1','mm2','ss1','ss2'].map(id=>$('#'+id));
  function setDigits(h, m, s){
    const pad = (n)=>String(n).padStart(2,'0');
    const [H,M,S] = [pad(h), pad(m), pad(s)];
    const next = [H[0],H[1],M[0],M[1],S[0],S[1]];
    ids.forEach((el,i)=>{
      if(el.textContent !== next[i]){
        el.textContent = next[i];
        // small flip-ish effect
        el.parentElement.style.transform = 'translateY(-2px)';
        setTimeout(()=>{ el.parentElement.style.transform = 'translateY(0)'; }, 120);
      }
    });
  }

  function tick(){
    const now = Date.now();
    const t = ensureTarget();
    let diff = Math.max(0, t - now);
    const s = Math.floor(diff/1000);
    const h = Math.floor(s/3600);
    const m = Math.floor((s%3600)/60);
    const sec = s%60;
    setDigits(h,m,sec);
    if(diff<=0){
      // reset to end of today again (next tick will reseed)
      storage.set('gate_target_ts', endOfTodayTs());
    }
  }
  tick();
  setInterval(tick, 1000);

  // Scarcity counters
  const $spots = $('#spotsLeft');
  const $joined = $('#joinedToday');

  function randint(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }

  function seedCounters(force=false){
    let spots = storage.get('spots_left');
    let joined = storage.get('joined_today');
    const todayKey = 'day_key';
    const today = new Date().toDateString();
    const dayKey = storage.get(todayKey);

    if(force || dayKey !== today){
      spots = randint(9, 25);
      joined = randint(50, 180);
      storage.set('spots_left', spots);
      storage.set('joined_today', joined);
      storage.set(todayKey, today);
      storage.set('last_decay_ts', Date.now());
    }
  }

  function renderCounters(){
    const spots = storage.get('spots_left') ?? '—';
    const joined = storage.get('joined_today') ?? '—';
    $spots.textContent = spots;
    $joined.textContent = joined;
  }

  function decaySpots(){
    let spots = storage.get('spots_left');
    if(typeof spots !== 'number') return;
    const floor = 3;
    const now = Date.now();
    const last = storage.get('last_decay_ts') || 0;
    // degrade roughly every 45–120 seconds by 1
    if(now - last > randint(45,120)*1000 && spots > floor){
      spots -= 1;
      storage.set('spots_left', spots);
      storage.set('last_decay_ts', now);
      renderCounters();
    }
  }

  seedCounters(false);
  renderCounters();
  setInterval(decaySpots, 4000);

  // Notifications
  const notifNames = ['Tereza','Anna','Eliška','Adéla','Karolína','Klára','Nela','Sofie','Laura','Natálie','Lucie','Michaela'];
  const notifCities = ['Praha','Brno','Ostrava','Plzeň','Olomouc','Hradec','Liberec','České Budějovice','Zlín','Pardubice'];
  const stack = $('#notifStack');

  function addNotif(){
    const name = notifNames[randint(0, notifNames.length-1)];
    const city = notifCities[randint(0, notifCities.length-1)];
    const mins = randint(1, 9);
    const el = document.createElement('div');
    el.className = 'notif';
    el.innerHTML = '<div class="dot"></div><div class="text"><strong>'+name+'</strong> z ' + city + ' se právě přidala • před '+mins+' min</div>';
    stack.appendChild(el);
    requestAnimationFrame(()=> el.classList.add('show'));
    // auto remove
    setTimeout(()=>{
      el.classList.remove('show');
      setTimeout(()=> el.remove(), 300);
    }, 6000);
    // increment joinedToday
    let joined = storage.get('joined_today') || 0;
    joined += randint(1, 3);
    storage.set('joined_today', joined);
    renderCounters();
  }

  // schedule notifs
  setTimeout(addNotif, 1500);
  setInterval(()=>{
    if(Math.random() < 0.7){ addNotif(); }
  }, 15000);

  // Final CTA (demo)
  $('#finalCta').addEventListener('click', ()=>{
    alert('DEMO: Tady by proběhl POST na backend a následný 302 redirect na cílovou URL s tokenem. (gate.html)');
  });
})();
