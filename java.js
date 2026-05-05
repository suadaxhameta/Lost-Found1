/* ================================================================
   java.js  —  Lost & Found  |  100% Front-End
   Punon ne: index.html, airport.html, hotel.html, software1-12.html
   dhe te gjitha faqet e tjera
   ================================================================ */

document.addEventListener('DOMContentLoaded', function () {
  setupNavbar();
  setupHeroForm();
  setupIndustryForm();
});


/* ================================================================
   1.  NAVBAR  — punon ne çdo faqe
   ================================================================ */
function setupNavbar() {

  /* Top-bar */
  document.querySelectorAll('.top-links a').forEach(function (a) {
    var t = a.textContent.trim().toUpperCase();
    if (t.includes('BUSINESS')) a.href = 'business.html';
    if (t.includes('CUSTOMER')) a.href = 'customer.html';
  });

  /* Main nav */
  document.querySelectorAll('.main-nav a').forEach(function (a) {
    var t = a.textContent.trim().toUpperCase();
    if (t.includes('SUBMIT LOST')) {
      a.href = '#';
      a.addEventListener('click', function (e) { e.preventDefault(); openModal('lost'); });
    }
    if (t.includes('SUBMIT FOUND')) {
      a.href = '#';
      a.addEventListener('click', function (e) { e.preventDefault(); openModal('found'); });
    }
    if (t.includes('VIEW RECENT') || t.includes('RECENT POSTS')) {
      a.href = '#';
      a.addEventListener('click', function (e) { e.preventDefault(); openRecentPosts(); });
    }
  });

  /* Footer quick-links */
  document.querySelectorAll('.footer-links a').forEach(function (a) {
    var t = a.textContent.trim().toUpperCase();
    if (t === 'HOME')               { a.href = 'index.html'; }
    if (t.includes('SUBMIT LOST'))  { a.href = '#'; a.addEventListener('click', function(e){ e.preventDefault(); openModal('lost');  }); }
    if (t.includes('SUBMIT FOUND')) { a.href = '#'; a.addEventListener('click', function(e){ e.preventDefault(); openModal('found'); }); }
    if (t.includes('RECENT'))       { a.href = '#'; a.addEventListener('click', function(e){ e.preventDefault(); openRecentPosts(); }); }
  });

  /* Logo -> home */
  var logo = document.querySelector('.logo-area');
  if (logo) {
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', function () { window.location.href = 'index.html'; });
  }
}

/* backward-compat per index.html qe ka onclick="openForm('lost')" */
window.openForm  = openModal;
window.closeForm = closeModal;


/* ================================================================
   2.  HERO FORM  (index.html)
       Butonat ruajne DIREKT ne localStorage, pa modal
   ================================================================ */
function setupHeroForm() {
  var btns = document.querySelectorAll('.form-card .button-row .search-btn');
  if (!btns.length) return;

  btns.forEach(function (btn) {
    btn.setAttribute('type', 'button');
    var type = btn.textContent.trim().toUpperCase().includes('LOST') ? 'lost' : 'found';

    btn.addEventListener('click', function () {
      var itemEl = document.getElementById('item');
      var locEl  = document.getElementById('location');
      var item   = itemEl ? itemEl.value.trim() : '';
      var loc    = locEl  ? locEl.value         : '';

      if (!item) {
        if (itemEl) { itemEl.style.border = '2px solid #c0392b'; itemEl.focus(); }
        setTimeout(function () { if (itemEl) itemEl.style.border = ''; }, 1500);
        return;
      }
      if (!loc || loc === 'Select' || loc === '') {
        if (locEl) locEl.style.border = '2px solid #c0392b';
        setTimeout(function () { if (locEl) locEl.style.border = ''; }, 1500);
        return;
      }

      saveEntry({
        id:       Date.now(),
        type:     type,
        item:     item,
        location: loc,
        desc:     '',
        date:     todayStr(),
        email:    '',
        from:     'index.html'
      });

      if (itemEl) itemEl.value = '';
      if (locEl)  locEl.value  = '';

      showToast(type === 'lost'
        ? '✅ Lost item submitted successfully!'
        : '✅ Found item submitted successfully!');
    });
  });
}


/* ================================================================
   3.  INDUSTRY FORMS  (airport, hotel, bus etj.)
       Butonat ruajne DIREKT ne localStorage, pa modal
   ================================================================ */
function setupIndustryForm() {
  var form = document.querySelector(
    '#airportForm, #hotelForm, #busForm, #taxiForm, #carForm,' +
    '#barForm, #restaurantForm, #museumForm, #parkForm,' +
    '#venueForm, #collegeForm, #animalForm'
  );
  if (!form) return;

  form.querySelectorAll('button').forEach(function (btn) {
    btn.setAttribute('type', 'button');
    var type = btn.textContent.trim().toUpperCase().includes('LOST') ? 'lost' : 'found';

    btn.addEventListener('click', function () {
      var itemEl = form.querySelector('input[type="text"]');
      var locEl  = form.querySelector('select');
      var item   = itemEl ? itemEl.value.trim() : '';
      var loc    = locEl  ? locEl.value         : '';

      if (!item) {
        if (itemEl) { itemEl.style.border = '2px solid #c0392b'; itemEl.focus(); }
        setTimeout(function () { if (itemEl) itemEl.style.border = ''; }, 1500);
        return;
      }
      if (!loc || loc === '') {
        if (locEl) locEl.style.border = '2px solid #c0392b';
        setTimeout(function () { if (locEl) locEl.style.border = ''; }, 1500);
        return;
      }

      saveEntry({
        id:       Date.now(),
        type:     type,
        item:     item,
        location: loc,
        desc:     '',
        date:     todayStr(),
        email:    '',
        from:     window.location.pathname.split('/').pop()
      });

      if (itemEl) itemEl.value = '';
      if (locEl)  locEl.selectedIndex = 0;

      showToast(type === 'lost'
        ? '✅ Lost item submitted successfully!'
        : '✅ Found item submitted successfully!');
    });
  });
}


/* ================================================================
   4.  MODAL  (vetem per navbar — me x te rregullt)
   ================================================================ */
function openModal(type) {
  if (!document.getElementById('formModal')) buildModal();

  var modal = document.getElementById('formModal');
  var title = document.getElementById('modalTitle');

  modal.dataset.type = type;
  title.textContent  = type === 'lost' ? '📋 Submit Lost Item' : '✅ Submit Found Item';
  title.style.color  = type === 'lost' ? '#c0392b' : '#27ae60';

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  setTimeout(function () {
    var first = modal.querySelector('input');
    if (first) first.focus();
  }, 80);
}

function closeModal() {
  var modal = document.getElementById('formModal');
  if (!modal) return;
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

function buildModal() {
  /* CSS */
  var style = document.createElement('style');
  style.textContent =
    '#formModal{display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9999;justify-content:center;align-items:center;padding:16px;}' +
    '#formModal .fm-box{background:#fff;border-radius:12px;padding:32px 28px 24px;width:100%;max-width:460px;position:relative;box-shadow:0 8px 32px rgba(0,0,0,.22);font-family:Open Sans,sans-serif;}' +
    '#formModal .fm-close{position:absolute;top:12px;right:16px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:22px;cursor:pointer;color:#888;background:none;border:none;padding:0;line-height:1;}' +
    '#formModal .fm-close:hover{color:#c0392b;}' +
    '#modalTitle{margin:0 0 20px;font-size:20px;}' +
    '#modalForm input,#modalForm textarea{width:100%;padding:10px 12px;margin-bottom:14px;border:1px solid #ccc;border-radius:6px;font-size:14px;font-family:inherit;box-sizing:border-box;transition:border .2s;}' +
    '#modalForm input:focus,#modalForm textarea:focus{outline:none;border-color:#003366;}' +
    '#modalForm textarea{resize:vertical;min-height:80px;}' +
    '#modalForm .fm-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}' +
    '#modalForm .fm-submit{width:100%;padding:12px;background:#003366;color:#fff;border:none;border-radius:6px;font-size:15px;font-weight:600;cursor:pointer;margin-top:4px;transition:background .2s;}' +
    '#modalForm .fm-submit:hover{background:#00509e;}' +
    '#lf-toast{position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(80px);background:#1a3a5c;color:#fff;padding:14px 28px;border-radius:8px;font-size:15px;z-index:99999;transition:transform .35s,opacity .35s;opacity:0;pointer-events:none;white-space:nowrap;font-family:Open Sans,sans-serif;}' +
    '#lf-toast.show{transform:translateX(-50%) translateY(0);opacity:1;}' +
    '@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}';
  document.head.appendChild(style);

  /* HTML */
  var div = document.createElement('div');
  div.id = 'formModal';
  div.innerHTML =
    '<div class="fm-box">' +
      '<button class="fm-close" id="fmCloseBtn">&times;</button>' +
      '<h2 id="modalTitle">Submit Item</h2>' +
      '<form id="modalForm" autocomplete="off">' +
        '<input type="text"  id="modalItem"     placeholder="Item name (e.g. Wallet, Phone, Keys...)" required />' +
        '<input type="text"  id="modalLocation" placeholder="Location (e.g. Airport, Hotel, Bus...)"  required />' +
        '<textarea           id="modalDesc"      placeholder="Description: color, brand, identifying details..."></textarea>' +
        '<div class="fm-row">' +
          '<input type="date"  id="modalDate" />' +
          '<input type="email" id="modalEmail" placeholder="Email (optional)" />' +
        '</div>' +
        '<button type="submit" class="fm-submit">Submit</button>' +
      '</form>' +
    '</div>';
  document.body.appendChild(div);

  document.getElementById('fmCloseBtn').addEventListener('click', closeModal);
  div.addEventListener('click', function (e) { if (e.target === div) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
  document.getElementById('modalForm').addEventListener('submit', handleModalSubmit);
}

function handleModalSubmit(e) {
  e.preventDefault();

  var modal = document.getElementById('formModal');
  var type  = modal.dataset.type || 'lost';
  var itemEl = document.getElementById('modalItem');
  var locEl  = document.getElementById('modalLocation');
  var item   = itemEl.value.trim();
  var loc    = locEl.value.trim();

  if (!item) { itemEl.style.border = '2px solid #c0392b'; itemEl.focus(); return; }
  if (!loc)  { locEl.style.border  = '2px solid #c0392b'; locEl.focus();  return; }

  saveEntry({
    id:       Date.now(),
    type:     type,
    item:     item,
    location: loc,
    desc:     document.getElementById('modalDesc')  ? document.getElementById('modalDesc').value.trim()  : '',
    date:     document.getElementById('modalDate')  ? document.getElementById('modalDate').value || todayStr() : todayStr(),
    email:    document.getElementById('modalEmail') ? document.getElementById('modalEmail').value.trim() : '',
    from:     window.location.pathname.split('/').pop() || 'index.html'
  });

  document.getElementById('modalForm').reset();
  closeModal();
  showToast(type === 'lost'
    ? '✅ Lost item submitted successfully!'
    : '✅ Found item submitted successfully!');
}


/* ================================================================
   5.  LOCALSTORAGE
   ================================================================ */
var STORAGE_KEY = 'lostfound_entries';

function saveEntry(entry) {
  var all = getAllEntries();
  all.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

function getAllEntries() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch (e) { return []; }
}


/* ================================================================
   6.  RECENT POSTS PANEL
   ================================================================ */
function openRecentPosts() {
  var old = document.getElementById('recentPanel');
  if (old) { old.remove(); return; }

  var entries = getAllEntries();

  var panel = document.createElement('div');
  panel.id = 'recentPanel';
  panel.style.cssText = 'position:fixed;top:0;right:0;bottom:0;width:360px;max-width:100vw;background:#fff;box-shadow:-4px 0 24px rgba(0,0,0,.2);z-index:10000;display:flex;flex-direction:column;font-family:Open Sans,sans-serif;animation:slideIn .25s ease;';

  /* header */
  var hdr = document.createElement('div');
  hdr.style.cssText = 'background:#003366;color:#fff;padding:16px 20px;display:flex;justify-content:space-between;align-items:center;flex-shrink:0;';
  hdr.innerHTML =
    '<strong style="font-size:16px;">📋 Recent Posts (' + entries.length + ')</strong>' +
    '<button id="rpClose" style="background:none;border:none;color:#fff;font-size:28px;cursor:pointer;line-height:1;padding:0;display:flex;align-items:center;justify-content:center;width:32px;height:32px;">&times;</button>';
  panel.appendChild(hdr);

  /* list */
  var list = document.createElement('div');
  list.style.cssText = 'flex:1;overflow-y:auto;padding:16px;';

  if (!entries.length) {
    list.innerHTML = '<p style="color:#aaa;text-align:center;margin-top:50px;font-size:15px;">No submissions yet.</p>';
  } else {
    entries.forEach(function (en) {
      var card = document.createElement('div');
      card.style.cssText = 'border:1px solid #e8e8e8;border-radius:8px;padding:12px 14px;margin-bottom:12px;border-left:4px solid ' + (en.type === 'lost' ? '#c0392b' : '#27ae60') + ';';
      card.innerHTML =
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">' +
          '<span style="font-weight:700;font-size:14px;">' + esc(en.item) + '</span>' +
          '<span style="font-size:11px;font-weight:700;padding:2px 9px;border-radius:12px;background:' + (en.type==='lost'?'#fde8e8':'#e8f8ee') + ';color:' + (en.type==='lost'?'#c0392b':'#27ae60') + ';">' + (en.type === 'lost' ? 'LOST' : 'FOUND') + '</span>' +
        '</div>' +
        '<div style="font-size:12px;color:#555;margin-bottom:3px;">📍 ' + esc(en.location) + '</div>' +
        (en.desc ? '<div style="font-size:12px;color:#777;margin-bottom:3px;">' + esc(en.desc) + '</div>' : '') +
        '<div style="font-size:11px;color:#bbb;">🗓 ' + esc(en.date) + '</div>';
      list.appendChild(card);
    });
  }
  panel.appendChild(list);

  /* footer clear all */
  if (entries.length) {
    var ftr = document.createElement('div');
    ftr.style.cssText = 'padding:12px 16px;border-top:1px solid #eee;flex-shrink:0;';
    var clr = document.createElement('button');
    clr.textContent = '🗑  Clear All';
    clr.style.cssText = 'width:100%;padding:10px;background:#c0392b;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;font-family:inherit;';
    clr.addEventListener('click', function () {
      if (confirm('Delete all posts from memory?')) {
        localStorage.removeItem(STORAGE_KEY);
        panel.remove();
        showToast('🗑 All posts cleared.');
      }
    });
    ftr.appendChild(clr);
    panel.appendChild(ftr);
  }

  document.body.appendChild(panel);
  document.getElementById('rpClose').addEventListener('click', function () { panel.remove(); });
}


/* ================================================================
   7.  UTILITIES
   ================================================================ */
function showToast(msg) {
  var t = document.getElementById('lf-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'lf-toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function () { t.classList.remove('show'); }, 3200);
}

function todayStr() {
  var d = new Date();
  return ('0'+d.getDate()).slice(-2)+'/'+('0'+(d.getMonth()+1)).slice(-2)+'/'+d.getFullYear();
}

function esc(str) {
  return String(str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}