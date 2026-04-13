var tr = {
  en: { on: 'ON', off: 'OFF', skip: 'Skip Ads', saved: 'Saved', skipped: 'Skipped', ads: 'Ads', clear: 'Clear' },
  es: { on: 'ON', off: 'OFF', skip: 'Saltar Anuncios', saved: 'Ahorrado', skipped: 'Saltados', ads: 'Anuncios', clear: 'Limpiar' },
  fr: { on: 'ON', off: 'OFF', skip: 'Passer les pubs', saved: 'Économisé', skipped: 'Sautés', ads: 'Pubs', clear: 'Effacer' },
  de: { on: 'ON', off: 'OFF', skip: 'Werbung überspringen', saved: 'Gespart', skipped: 'Übersprungen', ads: 'Werbung', clear: 'Löschen' },
  ja: { on: 'ON', off: 'OFF', skip: '広告スキップ', saved: '節約', skipped: 'スキップ', ads: '広告', clear: 'クリア' },
  ko: { on: 'ON', off: 'OFF', skip: '광고 건너뛰기', saved: '절약', skipped: '건너뛴', ads: '광고', clear: '초기화' },
  zh: { on: 'ON', off: 'OFF', skip: '跳过广告', saved: '节省', skipped: '跳过', ads: '广告', clear: '清除' },
  pt: { on: 'ON', off: 'OFF', skip: 'Pular Anúncios', saved: 'Economizado', skipped: 'Pulados', ads: 'Anúncios', clear: 'Limpar' }
};

var lang = 'en', enabled = true;
var langNames = { en: 'English', es: 'Español', fr: 'Français', de: 'Deutsch', ja: '日本語', ko: '한국어', zh: '中文', pt: 'Português' };

function fmt(s) {
  if (!s) return '0s';
  var d = Math.floor(s / 86400);
  var h = Math.floor((s % 86400) / 3600);
  var m = Math.floor(((s % 86400) % 3600) / 60);
  var sec = s % 60;
  if (d) return d + 'd ' + h + 'h';
  if (h) return h + 'h ' + m + 'm';
  if (m) return m + 'm ' + sec + 's';
  return sec + 's';
}

function load() {
  browser.storage.local.get('skipix_stats').then(function(r) {
    if (r.skipix_stats) {
      var s = r.skipix_stats;
      document.getElementById('tm').textContent = fmt(s.adTime || 0);
      document.getElementById('sk').textContent = (s.segments || 0).toLocaleString();
      document.getElementById('ad').textContent = (s.segments || 0).toLocaleString();
    }
  }).catch(function() {});
  
  browser.storage.sync.get(['settings', 'language']).then(function(r) {
    if (r.language) { lang = r.language; updateLangUI(); }
    if (r.settings) {
      enabled = r.settings.Core ? r.settings.Core.skipAd !== false : true;
      document.getElementById('sw').classList.toggle('on', enabled);
      document.getElementById('st').classList.toggle('on', enabled);
      document.getElementById('tc').classList.toggle('active', enabled);
      updateUI();
    }
  }).catch(function() {});
}

document.addEventListener('visibilitychange', function() {
  if (!document.hidden) { load(); }
});

browser.storage.onChanged.addListener(function(changes, area) {
  if (area === 'sync' && changes.settings) { load(); }
  if (area === 'local' && changes.skipix_stats) { load(); }
});

load();

function updateUI() {
  var tx = tr[lang] || tr.en;
  document.getElementById('st').textContent = enabled ? tx.on : tx.off;
  document.getElementById('st').classList.toggle('on', enabled);
  document.getElementById('tl').textContent = tx.skip;
  var lbls = document.querySelectorAll('.sl');
  if (lbls[0]) lbls[0].textContent = tx.saved;
  if (lbls[1]) lbls[1].textContent = tx.skipped;
  if (lbls[2]) lbls[2].textContent = tx.ads;
}

function updateLangUI() {
  document.getElementById('lt').textContent = langNames[lang] || 'English';
  var opts = document.querySelectorAll('.o');
  for (var i = 0; i < opts.length; i++) {
    opts[i].classList.toggle('sel', opts[i].getAttribute('data-lang') === lang);
  }
}

var db = document.getElementById('db');
var dm = document.getElementById('dm');
if (db) db.onclick = function(e) { 
  e.stopPropagation(); 
  db.classList.toggle('open'); 
  dm.classList.toggle('open'); 
};

var langOpts = document.querySelectorAll('.o');
for (var i = 0; i < langOpts.length; i++) {
  langOpts[i].onclick = function(e) { 
    e.stopPropagation(); 
    lang = this.getAttribute('data-lang'); 
    db.classList.remove('open'); 
    dm.classList.remove('open'); 
    updateLangUI(); 
    updateUI(); 
    browser.storage.sync.set({ language: lang }); 
  };
}

document.body.onclick = function(e) { 
  if (!e.target.closest('.d')) { 
    db.classList.remove('open'); 
    dm.classList.remove('open'); 
  } 
};

var tc = document.getElementById('tc');
if (tc) tc.onclick = function() {
  enabled = !enabled;
  document.getElementById('sw').classList.toggle('on');
  document.getElementById('st').classList.toggle('on');
  tc.classList.toggle('active');
  updateUI();
  browser.storage.sync.get(['settings']).then(function(r) { 
    var s = r.settings || {}; 
    s.Core = s.Core || {}; 
    s.Core.skipAd = enabled; 
    browser.storage.sync.set({ settings: s }); 
  });
};

var trash = document.getElementById('trash');
if (trash) trash.onclick = function() {
  var emptyStats = { adTime: 0, segments: 0 };
  localStorage.setItem('skipix_stats', JSON.stringify(emptyStats));
  browser.storage.local.set({ skipix_stats: emptyStats }).catch(function() {});
  document.getElementById('tm').textContent = '0s';
  document.getElementById('sk').textContent = '0';
  document.getElementById('ad').textContent = '0';
  trash.style.transform = 'scale(1.2)';
  setTimeout(function() { trash.style.transform = ''; }, 200);
};