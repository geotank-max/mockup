// --- PAYMENT METHODS SELECTION LOGIC (payment-methods.js) ---

const EXCHANGE_RATE_KHR = 4070;
const DELIVERY_FEE = 0.45;

let selectedMainType = 'online'; // 'online' | 'cod'
let selectedProvider = 'aba'; // 'balance' | 'aba' | 'khqr' | 'acleda' | 'woori' | 'pipay' | 'emoney' | 'wing'
let selectedProviderName = 'ABA PAY';
let toastTimeout = null;

document.addEventListener('DOMContentLoaded', () => {
  renderTotalSummary();
});

// Render Order Total Summary
function renderTotalSummary() {
  let subtotal = 26.50;

  try {
    const storedTotal = localStorage.getItem('cropwise_cart_total');
    if (storedTotal) {
      subtotal = parseFloat(storedTotal);
    }
  } catch (e) {
    subtotal = 26.50;
  }

  const total = subtotal + DELIVERY_FEE;
  const totalKhr = Math.round(total * EXCHANGE_RATE_KHR);

  const totalUsdEl = document.getElementById('bottomTotalUsd');
  const totalKhrEl = document.getElementById('bottomTotalKhr');

  if (totalUsdEl) totalUsdEl.textContent = `$${total.toFixed(2)}`;
  if (totalKhrEl) totalKhrEl.textContent = `៛${totalKhr.toLocaleString()}`;
}

// Select Main Type: Online vs Cash on Delivery
window.selectMainType = function(type) {
  selectedMainType = type;
  const radioOnline = document.getElementById('radioMainOnline');
  const radioCod = document.getElementById('radioMainCod');

  if (type === 'online') {
    radioOnline.classList.add('checked');
    radioCod.classList.remove('checked');
    // Restore active provider
    updateProviderRadios(selectedProvider);
    openToast(`បានជ្រើសរើស: ទូទាត់តាមអនឡាញ (${selectedProviderName})`);
  } else {
    radioOnline.classList.remove('checked');
    radioCod.classList.add('checked');
    // Deselect all online provider radios
    clearAllProviderRadios();
    selectedProviderName = 'សាច់ប្រាក់នៅពេលដឹកជញ្ជូន (Cash on Delivery)';
    openToast('បានជ្រើសរើស: សាច់ប្រាក់នៅពេលដឹកជញ្ជូន');
  }
};

// Select Online Provider (ABA, KHQR, Wing, Woori, etc.)
window.selectProvider = function(providerId, providerName, isDisabled) {
  if (isDisabled) {
    openToast('សមតុល្យមិនគ្រប់គ្រាន់ ($0.00) សូមជ្រើសរើសធនាគារផ្សេងទៀត');
    return;
  }

  selectedMainType = 'online';
  selectedProvider = providerId;
  selectedProviderName = providerName;

  // Make sure top Online radio is checked
  const radioOnline = document.getElementById('radioMainOnline');
  const radioCod = document.getElementById('radioMainCod');
  if (radioOnline) radioOnline.classList.add('checked');
  if (radioCod) radioCod.classList.remove('checked');

  updateProviderRadios(providerId);
  openToast(`បានជ្រើសរើស: ${providerName}`);
};

// Helper: Update provider radio circles
function updateProviderRadios(activeId) {
  const providerIds = ['balance', 'aba', 'khqr', 'acleda', 'woori', 'pipay', 'emoney', 'wing'];
  providerIds.forEach(id => {
    const el = document.getElementById(`radio-${id}`);
    if (el) {
      if (id === activeId) {
        el.classList.add('checked');
      } else {
        el.classList.remove('checked');
      }
    }
  });
}

// Helper: Clear all provider radio circles
function clearAllProviderRadios() {
  const providerIds = ['balance', 'aba', 'khqr', 'acleda', 'woori', 'pipay', 'emoney', 'wing'];
  providerIds.forEach(id => {
    const el = document.getElementById(`radio-${id}`);
    if (el) el.classList.remove('checked');
  });
}

// Confirm Payment & Place Order
window.confirmPaymentAndOrder = function() {
  localStorage.setItem('cropwise_pay_method', selectedProviderName);
  openToast(`កំពុងដំណើរការទូទាត់តាម ${selectedProviderName}...`);

  setTimeout(() => {
    // Clear cart on successful checkout
    localStorage.removeItem('cropwise_cart_items');
    localStorage.removeItem('cropwise_cart_total');
    window.location.href = 'order-tracking.html';
  }, 1000);
};

// Navigation Back
window.goBack = function() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = 'payment.html';
  }
};

// Toast notification
window.openToast = function(msg) {
  const toast = document.getElementById('toastPopup');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = msg;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
};
