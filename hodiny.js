const STORAGE_KEY = 'clockOffset';

const clockEl = document.getElementById('clock');
const dateEl = document.getElementById('date');
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const offsetInput = document.getElementById('offsetInput');
const saveBtn = document.getElementById('saveBtn');
const toast = document.getElementById('toast');

let offsetMin = loadOffset();
let toastTimer;

function loadOffset() {
  const n = parseInt(localStorage.getItem(STORAGE_KEY), 10);
  return Number.isNaN(n) ? 0 : n;
}

const pad = n => String(n).padStart(2, '0');

function tick() {
  const now = new Date(Date.now() + offsetMin * 60 * 1000);

  clockEl.textContent =
    `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  dateEl.textContent = now.toLocaleDateString('cs-CZ', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }); 
}

function showToast(text) {
  toast.textContent = text;
  toast.classList.add('show');

  clearTimeout(toastTimer); 
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}
settingsBtn.addEventListener('click', () => {
  const isOpen = settingsPanel.classList.toggle('open');
  settingsBtn.setAttribute('aria-expanded', isOpen);
});
saveBtn.addEventListener('click', () => {
  const value = parseInt(offsetInput.value, 10);

  if (Number.isNaN(value)) {
    showToast('Zadej platné číslo');
    return;
  }

  offsetMin = value;
  localStorage.setItem(STORAGE_KEY, value);
  tick(); 

  const sign = value > 0 ? '+' : '';
  showToast(`Nastavení uloženo: ${sign}${value} min`);
});
offsetInput.value = offsetMin;
tick();
setInterval(tick, 1000);