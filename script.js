(function(){
"use strict";

/* ---------- CONFIG ---------- */
const WHATSAPP_NUMBER = "9647809957512"; // 07809957512
const IG_URL = "https://instagram.com/9ryan_c";
const ADDRESS = "الناصرية - الشطرة - الشوملي - قرب المربعة";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(ADDRESS + " مطبخ بيانو");

function waLink(message){
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
}
const defaultMsg = "مرحبًا، وصلت لصفحتكم واحب استفسر عن مطبخ بيانو 😊";

/* ---------- MENU DATA ---------- */
const MENU = [
  // قسم الكيك
  {name:"كيك أمريكي", price:7000, cat:"cake", icon:"🍰", desc:"كيك أمريكي طري بطعم مميز"},
  {name:"كيك بيت", price:8000, cat:"cake", icon:"🍰", desc:"كيك منزلي بوصفة بيتية أصيلة"},
  {name:"كيك بركاني - حجم صغير", price:10000, cat:"cake", icon:"🌋", desc:"كيك بركاني بحجم صغير"},
  {name:"كيك بركاني - حجم وسط", price:15000, cat:"cake", icon:"🌋", desc:"كيك بركاني بحجم وسط"},
  {name:"كيك بركاني - حجم كبير", price:25000, cat:"cake", icon:"🌋", desc:"كيك بركاني بحجم كبير"},
  {name:"جيز كيك قالب", price:15000, cat:"cake", icon:"🧀", desc:"تشيز كيك ناعم على شكل قالب"},
  {name:"دريم كيك", price:5000, cat:"cake", icon:"✨", desc:"كيك دريم خفيف وطري"},
  {name:"كيك دبي", price:8000, cat:"cake", icon:"🍫", desc:"كيك دبي بطعم الكنافة والشوكولاتة"},
  // قطع الكيك
  {name:"قطعة كيك - حجم صغير", price:500, cat:"slice", icon:"🍰", desc:"قطعة كيك مفردة بحجم صغير"},
  {name:"قطعة كيك - حجم وسط", price:2000, cat:"slice", icon:"🍰", desc:"قطعة كيك مفردة بحجم وسط"},
  {name:"قطعة كيك - حجم كبير", price:3000, cat:"slice", icon:"🍰", desc:"قطعة كيك مفردة بحجم كبير"},
  // قوالب كيك
  {name:"قالب كيك - حجم صغير", price:10000, cat:"mold", icon:"🎂", desc:"قالب كيك للمناسبات - حجم صغير"},
  {name:"قالب كيك - وسط", price:15000, cat:"mold", icon:"🎂", desc:"قالب كيك للمناسبات - حجم وسط"},
  {name:"قالب كيك - كبير", price:25000, cat:"mold", icon:"🎂", desc:"قالب كيك للمناسبات - حجم كبير"},
  // الكليجة
  {name:"كليجة تمر (كيلو)", price:7000, cat:"kleicha", icon:"🥮", desc:"كليجة محشوة بالتمر - سعر الكيلو"},
  {name:"كليجة حلقوم (كيلو)", price:7000, cat:"kleicha", icon:"🥮", desc:"كليجة محشوة بالحلقوم - سعر الكيلو"},
  {name:"كليجة جوز (كيلو)", price:9000, cat:"kleicha", icon:"🥮", desc:"كليجة محشوة بالجوز - سعر الكيلو"},
  {name:"كليجة فستق (كيلو)", price:10000, cat:"kleicha", icon:"🥮", desc:"كليجة محشوة بالفستق - سعر الكيلو"},
  {name:"كليجة مشكل", price:8000, cat:"kleicha", icon:"🥮", desc:"تشكيلة متنوعة من الكليجة"},
  // الكوكيز
  {name:"كوكيز كلاسيك (قطعة)", price:1000, cat:"cookies", icon:"🍪", desc:"كوكيز كلاسيك بالقطعة"},
  {name:"كوكيز محشي (قطعة)", price:1500, cat:"cookies", icon:"🍪", desc:"كوكيز محشي بالقطعة"},
  {name:"كوكيز بستاشيو", price:2000, cat:"cookies", icon:"🍪", desc:"كوكيز بطعم البستاشيو"},
  {name:"كندر", price:2000, cat:"cookies", icon:"🍫", desc:"كوكيز بطعم الكندر"},
  {name:"كيكة كوكيز قالب", price:10000, cat:"cookies", icon:"🍪", desc:"قالب كيك بطعم الكوكيز"},
];
const catLabel = {cake:"قسم الكيك",slice:"قطع الكيك",mold:"قوالب كيك",kleicha:"الكليجة",cookies:"الكوكيز"};

function fmt(n){ return n.toLocaleString('en-US') + " د.ع"; }

const grid = document.getElementById('menuGrid');
MENU.forEach((p,i)=>{
  const card = document.createElement('div');
  card.className = 'product-card';
  card.dataset.cat = p.cat;
  card.style.transitionDelay = (i%6)*0.05 + "s";
  card.innerHTML = `
    <div class="product-top">
      <div class="product-icon">${p.icon}</div>
      <div class="product-price">${fmt(p.price)}</div>
    </div>
    <div>
      <div class="product-cat">${catLabel[p.cat]}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-desc">${p.desc}</div>
    </div>
    <button class="add-cart-btn" data-name="${p.name}" data-price="${p.price}" data-icon="${p.icon}">➕ أضف إلى السلة</button>
  `;
  grid.appendChild(card);
});

function applyReveal(){
  document.querySelectorAll('.product-card').forEach(c=>{
    if(!c.classList.contains('hidden')) c.classList.add('show');
  });
}

/* ---------- FILTER ---------- */
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    filterBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.product-card').forEach(card=>{
      card.classList.remove('show');
      const match = (f==='all' || card.dataset.cat === f);
      card.classList.toggle('hidden', !match);
    });
    requestAnimationFrame(()=> requestAnimationFrame(applyReveal));
  });
});
requestAnimationFrame(()=> requestAnimationFrame(applyReveal));

/* ============================================================
   CART SYSTEM
   ============================================================ */
let cart = [];
try{
  const saved = localStorage.getItem('piano-cart');
  if(saved) cart = JSON.parse(saved);
}catch(e){ cart = []; }

function saveCart(){
  try{ localStorage.setItem('piano-cart', JSON.stringify(cart)); }catch(e){}
}

function addToCart(name, price, icon){
  const existing = cart.find(i => i.name === name);
  if(existing){ existing.qty += 1; }
  else{ cart.push({name, price:Number(price), icon, qty:1}); }
  saveCart();
  renderCart();
}

function changeQty(name, delta){
  const item = cart.find(i => i.name === name);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0){ cart = cart.filter(i => i.name !== name); }
  saveCart();
  renderCart();
}

function removeFromCart(name){
  cart = cart.filter(i => i.name !== name);
  saveCart();
  renderCart();
}

function cartCount(){ return cart.reduce((s,i)=> s + i.qty, 0); }
function cartTotal(){ return cart.reduce((s,i)=> s + i.qty * i.price, 0); }

function renderCart(){
  const count = cartCount();
  [document.getElementById('cartBadge'), document.getElementById('mobileCartBadge')].forEach(b=>{
    if(!b) return;
    b.textContent = count;
    b.classList.toggle('show', count > 0);
  });

  const body = document.getElementById('cartBody');
  const foot = document.getElementById('cartFoot');

  if(cart.length === 0){
    body.innerHTML = `<div class="cart-empty"><div class="emoji">🛍️</div><p>سلتك فارغة حاليًا<br>أضيفي أصنافك المفضلة من المنيو</p></div>`;
    foot.style.display = 'none';
    return;
  }

  foot.style.display = 'block';
  body.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-icon">${item.icon || '🍰'}</div>
      <div class="cart-item-info">
        <strong>${item.name}</strong>
        <span>${fmt(item.price)} × ${item.qty}</span>
      </div>
      <div class="cart-item-actions">
        <div class="qty-stepper">
          <button data-action="dec" data-name="${item.name}" aria-label="إنقاص الكمية">−</button>
          <span>${item.qty}</span>
          <button data-action="inc" data-name="${item.name}" aria-label="زيادة الكمية">+</button>
        </div>
        <button class="remove-item" data-action="remove" data-name="${item.name}" aria-label="حذف الصنف">🗑️</button>
      </div>
    </div>
  `).join('');

  document.getElementById('cartTotal').textContent = fmt(cartTotal());
}
renderCart();

document.getElementById('cartBody').addEventListener('click', (e)=>{
  const btn = e.target.closest('button[data-action]');
  if(!btn) return;
  const name = btn.dataset.name;
  if(btn.dataset.action === 'inc') changeQty(name, 1);
  if(btn.dataset.action === 'dec') changeQty(name, -1);
  if(btn.dataset.action === 'remove') removeFromCart(name);
});

/* ---------- ADD TO CART BUTTONS ---------- */
document.addEventListener('click', function(e){
  const btn = e.target.closest('.add-cart-btn');
  if(btn){
    addToCart(btn.dataset.name, btn.dataset.price, btn.dataset.icon);
    const original = btn.textContent;
    btn.textContent = '✔ أُضيف للسلة';
    btn.classList.add('added');
    showToast(`أُضيف "${btn.dataset.name}" إلى السلة 🛒`);
    setTimeout(()=>{ btn.textContent = original; btn.classList.remove('added'); }, 1400);
  }
});

/* ---------- CART DRAWER OPEN/CLOSE ---------- */
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
function openCart(){ cartDrawer.classList.add('open'); cartOverlay.classList.add('show'); document.body.style.overflow='hidden'; }
function closeCartFn(){ cartDrawer.classList.remove('open'); cartOverlay.classList.remove('show'); document.body.style.overflow=''; }
document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('mobileCartBtn').addEventListener('click', ()=>{ closeNav(); openCart(); });
document.getElementById('closeCart').addEventListener('click', closeCartFn);
cartOverlay.addEventListener('click', ()=>{ closeCartFn(); closeCheckoutFn(); });

/* ---------- CHECKOUT MODAL ---------- */
const checkoutModal = document.getElementById('checkoutModal');
function openCheckout(){
  if(cart.length === 0) return;
  document.getElementById('checkoutSummary').innerHTML =
    `<b>${cartCount()} صنف في السلة</b> — الإجمالي: <b>${fmt(cartTotal())}</b>`;
  checkoutModal.classList.add('open');
  cartOverlay.classList.add('show');
}
function closeCheckoutFn(){ checkoutModal.classList.remove('open'); if(!cartDrawer.classList.contains('open')) cartOverlay.classList.remove('show'); }
document.getElementById('checkoutBtn').addEventListener('click', openCheckout);
document.getElementById('closeCheckout').addEventListener('click', closeCheckoutFn);
document.getElementById('checkoutBackdrop').addEventListener('click', closeCheckoutFn);

/* ---------- CHECKOUT FORM VALIDATION & SUBMIT ---------- */
document.getElementById('checkoutForm').addEventListener('submit', function(e){
  e.preventDefault();

  const fields = [
    {id:'custName', grp:'grp-name', validate: v => v.trim().length >= 2},
    {id:'custPhone', grp:'grp-phone', validate: v => /^0?7\d{9}$/.test(v.trim().replace(/\s|-/g,''))},
    {id:'custGov', grp:'grp-gov', validate: v => v.trim().length > 0},
    {id:'custAddress', grp:'grp-address', validate: v => v.trim().length >= 3},
    {id:'custLandmark', grp:'grp-landmark', validate: v => v.trim().length >= 2},
  ];

  let valid = true;
  fields.forEach(f=>{
    const el = document.getElementById(f.id);
    const ok = f.validate(el.value);
    document.getElementById(f.grp).classList.toggle('error', !ok);
    if(!ok) valid = false;
  });

  if(!valid){
    showToast('الرجاء إكمال الحقول المطلوبة بشكل صحيح ⚠️');
    return;
  }

  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const gov = document.getElementById('custGov').value;
  const address = document.getElementById('custAddress').value.trim();
  const landmark = document.getElementById('custLandmark').value.trim();
  const notes = document.getElementById('custNotes').value.trim();

  let itemsList = cart.map(i => `• ${i.name} × ${i.qty} = ${fmt(i.qty * i.price)}`).join('\n');

  let msg = `مرحبًا، أرغب بتأكيد طلبي من مطبخ بيانو 🍰\n\n`;
  msg += `🧾 *تفاصيل الطلب:*\n${itemsList}\n\n`;
  msg += `💰 *الإجمالي: ${fmt(cartTotal())}*\n\n`;
  msg += `👤 *بيانات التوصيل:*\n`;
  msg += `الاسم: ${name}\n`;
  msg += `رقم الهاتف: ${phone}\n`;
  msg += `المحافظة: ${gov}\n`;
  msg += `العنوان: ${address}\n`;
  msg += `أقرب نقطة دالة: ${landmark}\n`;
  if(notes) msg += `ملاحظات: ${notes}\n`;

  window.open(waLink(msg), '_blank');
  showToast('تم تجهيز طلبك، أكملي التأكيد على واتساب 💬');

  cart = [];
  saveCart();
  renderCart();
  closeCheckoutFn();
  closeCartFn();
  this.reset();
  document.getElementById('custGov').value = 'ذي قار';
});

/* ---------- SET WA LINKS (general contact) ---------- */
["headerWaBtn","heroWaBtn","contactWaBtn","socialWa","locationWaBtn"].forEach(id=>{
  const el = document.getElementById(id);
  if(el) el.href = waLink(defaultMsg);
});
document.getElementById('floatingWaBtn').href = waLink(defaultMsg);
document.getElementById('mapBtn').href = MAPS_URL;
document.getElementById('mapBtn').target = "_blank";

/* ---------- LOADER ---------- */
window.addEventListener('load', ()=>{
  setTimeout(()=>{
    document.getElementById('loader').classList.add('hide');
  }, 600);
});

/* ---------- HEADER SCROLL ---------- */
const header = document.getElementById('siteHeader');
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', ()=>{
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 40);
  backTop.classList.toggle('show', y > 500);
}, {passive:true});

/* ---------- MOBILE NAV ---------- */
const hamburger = document.getElementById('hamburgerBtn');
const mobileNav = document.getElementById('mobileNav');
const overlay = document.getElementById('overlay');
function openNav(){ mobileNav.classList.add('open'); overlay.classList.add('show'); hamburger.classList.add('open'); document.body.style.overflow='hidden'; }
function closeNav(){ mobileNav.classList.remove('open'); overlay.classList.remove('show'); hamburger.classList.remove('open'); document.body.style.overflow=''; }
hamburger.addEventListener('click', ()=> mobileNav.classList.contains('open') ? closeNav() : openNav());
document.getElementById('closeMobileNav').addEventListener('click', closeNav);
overlay.addEventListener('click', closeNav);
document.querySelectorAll('.mobile-link').forEach(l=> l.addEventListener('click', closeNav));
document.addEventListener('keydown', e=>{
  if(e.key==='Escape'){ closeNav(); closeCheckoutFn(); closeCartFn(); }
});

/* ---------- ACTIVE NAV LINK ---------- */
const navLinks = document.querySelectorAll('.nav-link');
const sections = ["home","about","menu","location","contact"].map(id=>document.getElementById(id));
const navObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const id = entry.target.id;
      navLinks.forEach(l=>{
        l.classList.toggle('active', l.getAttribute('href') === '#'+id);
      });
    }
  });
}, {rootMargin:"-45% 0px -45% 0px"});
sections.forEach(s=> s && navObserver.observe(s));

/* ---------- REVEAL ON SCROLL ---------- */
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){ entry.target.classList.add('in'); revealObserver.unobserve(entry.target); }
  });
}, {threshold:0.15});
document.querySelectorAll('.reveal:not(.in)').forEach(el=> revealObserver.observe(el));

/* ---------- THEME TOGGLE ---------- */
const themeToggle = document.getElementById('themeToggle');
function setTheme(dark){
  document.body.classList.toggle('dark', dark);
  themeToggle.textContent = dark ? '☀️' : '🌙';
  try{ localStorage.setItem('piano-theme', dark ? 'dark' : 'light'); }catch(e){}
}
try{
  const saved = localStorage.getItem('piano-theme');
  if(saved === 'dark') setTheme(true);
}catch(e){}
themeToggle.addEventListener('click', ()=> setTheme(!document.body.classList.contains('dark')));

/* ---------- BACK TO TOP ---------- */
backTop.addEventListener('click', (e)=>{ e.preventDefault(); window.scrollTo({top:0, behavior:'smooth'}); });

/* ---------- TOAST ---------- */
let toastTimer;
function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> t.classList.remove('show'), 2600);
}

})();
