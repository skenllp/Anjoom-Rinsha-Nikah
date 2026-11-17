(function () {
  'use strict';
  var W = window.WEDDING;
  var $ = function (id) { return document.getElementById(id); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var site = $('site'), overlay = $('overlay'), video = $('video'), stage = $('stage');
  var phase = 'poster', timers = [], audio = null, userMuted = false;

  /* ───────── Opening: poster → video → site ───────── */
  function setPhase(p) {
    phase = p;
    document.body.classList.toggle('locked', p !== 'site');
    overlay.classList.toggle('is-playing', p === 'playing');
    overlay.classList.toggle('hide', p === 'site');
    overlay.setAttribute('aria-hidden', p === 'site');
    if (p === 'site') { site.removeAttribute('inert'); site.removeAttribute('aria-hidden'); }
    else { site.setAttribute('inert', ''); site.setAttribute('aria-hidden', 'true'); }
  }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }
  var heroPlayed = false;
  function finish() {
    clearTimers();
    try { video.pause(); } catch (e) {}
    setPhase('site');
    playHero();
    if (audio && !userMuted) audio.play().catch(function () { /* blocked: guest can use the toggle */ });
    timers.push(setTimeout(function () { stage.classList.remove('on'); }, 1300));
  }
  function start() {
    clearTimers();
    stage.classList.remove('on');
    // The song starts the moment the guest taps (a user gesture, so every phone allows it) and keeps playing.
    if (audio && audio.paused && !userMuted) audio.play().catch(function () {});
    setPhase('playing');
    try { video.currentTime = 0; } catch (e) {}
    video.muted = true; // the song is the soundtrack from the first tap
    var p = video.play();
    if (p && p.catch) p.catch(finish);
    timers.push(setTimeout(function () { if (!video.currentTime || video.paused) finish(); }, 6000));
    timers.push(setTimeout(finish, ((video.duration || 8) + 3) * 1000));
  }
  video.addEventListener('playing', function () { stage.classList.add('on'); });
  video.addEventListener('ended', finish);
  video.addEventListener('error', finish);
  $('btn-open').addEventListener('click', start);
  $('btn-skip').addEventListener('click', finish);
  $('btn-replay').addEventListener('click', start); // play() inside the click handler (iOS)
  setPhase('poster');

  /* ───────── Animations (GSAP) — skipped for reduced-motion users ───────── */
  function playHero() {
    if (heroPlayed || reduce || !window.gsap) return;
    heroPlayed = true;
    gsap.to('.hl', { opacity: 1, y: 0, duration: 1.3, stagger: 0.2, ease: 'power3.out', delay: 0.25 });
  }
  if (!reduce && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.set('.hl', { opacity: 0, y: 16 });
    gsap.utils.toArray('.rv').forEach(function (el) {
      gsap.from(el, { opacity: 0, y: 20, duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });
    gsap.utils.toArray('[data-parallax]').forEach(function (el) {
      var k = parseFloat(el.getAttribute('data-parallax')) || 0;
      gsap.to(el, { yPercent: k * 100, ease: 'none', scrollTrigger: { trigger: el.closest('section'), start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
    });
    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  }

  /* ───────── Countdown (start of the calendar date, venue-local timezone) ───────── */
  var target = new Date(W.date.iso + 'T00:00:00' + W.date.utcOffset).getTime();
  var pad = function (n) { return String(n).padStart(2, '0'); };
  $('cd-note').textContent = 'Counting down to the start of 26 December 2026 (12:00 am ' + W.date.timezoneLabel + '). The ceremony time is not yet announced.';
  function tick() {
    var diff = target - Date.now();
    if (diff <= 0) { $('countdown').hidden = true; $('cd-done').hidden = false; return false; }
    var s = Math.floor(diff / 1000);
    $('cd-d').textContent = Math.floor(s / 86400);
    $('cd-h').textContent = pad(Math.floor((s % 86400) / 3600));
    $('cd-m').textContent = pad(Math.floor((s % 3600) / 60));
    $('cd-s').textContent = pad(s % 60);
    return true;
  }
  if (tick()) { var cdTimer = setInterval(function () { if (!tick()) clearInterval(cdTimer); }, 1000); }

  /* ───────── Add to calendar (all-day: no ceremony time supplied) ───────── */
  var parts = W.date.iso.split('-').map(Number);
  var ymd = function (d) { return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()); };
  var dStart = ymd(new Date(Date.UTC(parts[0], parts[1] - 1, parts[2])));
  var dEnd = ymd(new Date(Date.UTC(parts[0], parts[1] - 1, parts[2] + 1)));
  var evTitle = 'Nikah of ' + W.groom.name + ' & ' + W.bride.name;
  var evDetails = W.share.text + '\n\nWith best compliments from ' + W.compliments + '.';
  $('btn-gcal').href = 'https://calendar.google.com/calendar/render?' + new URLSearchParams({ action: 'TEMPLATE', text: evTitle, dates: dStart + '/' + dEnd, details: evDetails, location: W.venue.name }).toString();
  $('btn-ics').addEventListener('click', function () {
    var esc = function (s) { return s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;'); };
    var lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Nikah Invitation//EN', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
      'UID:nikah-' + dStart + '@invitation', 'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      'DTSTART;VALUE=DATE:' + dStart, 'DTEND;VALUE=DATE:' + dEnd, 'SUMMARY:' + esc(evTitle), 'LOCATION:' + esc(W.venue.name),
      'DESCRIPTION:' + esc(evDetails + (W.venue.mapsUrl ? '\n\nDirections: ' + W.venue.mapsUrl : '')), 'END:VEVENT', 'END:VCALENDAR'];
    var url = URL.createObjectURL(new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' }));
    var a = document.createElement('a'); a.href = url; a.download = 'anjoom-rinsha-nikah.ics';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  });

  /* ───────── Venue: directions button ───────── */
  $('venue-name').textContent = W.venue.name;
  var maps = $('btn-directions');
  if (W.venue.mapsUrl) maps.href = W.venue.mapsUrl;
  else { maps.removeAttribute('href'); maps.setAttribute('aria-disabled', 'true'); maps.setAttribute('role', 'link'); }

  /* ───────── Share on WhatsApp ───────── */
  $('btn-wa').href = 'https://wa.me/?text=' + encodeURIComponent(W.share.title + '\n\n' + W.share.text + '\n\n' + W.share.url);

  /* ───────── Wishes: never claims a wish was saved unless it really was ───────── */
  var status = $('wstatus');
  function say(text, type) { status.textContent = text; status.className = 'wstatus' + (type === 'error' ? ' error' : ''); }
  $('wform').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = $('g-name').value.trim(), msg = $('g-msg').value.trim();
    if (!name || !msg) return say('Please add your name and a few words of blessing.', 'error');
    var cfg = W.wishes;
    if (cfg.endpoint) {
      say('Sending…'); $('wsend').disabled = true;
      fetch(cfg.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ name: name, message: msg, event: 'Nikah invitation' }) })
        .then(function (res) { if (!res.ok) throw new Error(res.status); $('g-name').value = ''; $('g-msg').value = ''; say('JazakAllah khair — your blessing has been delivered.'); })
        .catch(function () { say('We could not deliver your blessing just now. Please try again in a moment.', 'error'); })
        .then(function () { $('wsend').disabled = false; });
      return;
    }
    if (cfg.whatsappNumber) {
      var text = 'Assalamu alaikum 🤍\n' + msg + '\n\n— ' + name + '\n(Blessings for the Nikah of ' + W.groom.name + ' & ' + W.bride.name + ')';
      var url = 'https://wa.me/' + cfg.whatsappNumber + '?text=' + encodeURIComponent(text);
      if (!window.open(url, '_blank', 'noopener')) window.location.href = url;
      return say('WhatsApp is opening with your blessing ready. Please press Send there — it is only delivered once you do.');
    }
    say('Blessings cannot be submitted from this page yet, so nothing has been sent. Please share your wishes with the family directly.');
  });

  /* ───────── Background music (starts after the opening; toggle always available) ───────── */
  if (W.audio && W.audio.src) {
    audio = new Audio(W.audio.src); audio.loop = true; audio.preload = 'auto'; audio.volume = 0.6;
    var ab = $('audio-btn'); ab.hidden = false;
    var setUI = function (on) { ab.setAttribute('aria-pressed', on); ab.setAttribute('aria-label', on ? 'Mute music' : 'Play music'); ab.textContent = on ? '♪' : '♫'; ab.style.opacity = on ? '1' : '.75'; };
    audio.addEventListener('play', function () { setUI(true); });
    audio.addEventListener('pause', function () { setUI(false); });
    ab.addEventListener('click', function () { userMuted = !audio.paused; if (audio.paused) audio.play().catch(function () {}); else audio.pause(); });
    setUI(false);
  }
})();
