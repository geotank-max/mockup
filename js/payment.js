// --- PAYMENT & CHECKOUT PAGE LOGIC (payment.js) ---

const EXCHANGE_RATE_KHR = 4070;
const DELIVERY_FEE = 0.45;

// Product images lookup
const productImages = {
  'f1': 'assets/images/fertilize (1) .jpg',
  'f2': 'assets/images/fertilizer (2) .jpg',
  'f3': 'assets/images/fertilize (3) .jpg',
  'f4': 'assets/images/ad_seeds.jpg',
  'f5': 'assets/images/ad_fertilizer.jpg'
};

let toastTimeout = null;
let currentDeliveryMode = 'immediate';
let currentPayMethod = 'aba';

document.addEventListener('DOMContentLoaded', () => {
  const storeNameEl = document.getElementById('paymentStoreName');
  const savedStore = localStorage.getItem('cropwise_cart_store');
  if (storeNameEl && savedStore) {
    storeNameEl.textContent = savedStore;
  }

  // Check if payment method was selected from payment-methods.html
  const savedPayMethod = localStorage.getItem('cropwise_pay_method');
  if (savedPayMethod) {
    const payNameEl = document.getElementById('selectedPayName');
    const payBadgeEl = document.getElementById('selectedPayBadge');
    if (payNameEl) payNameEl.textContent = savedPayMethod;
    if (payBadgeEl) {
      if (savedPayMethod.includes('ABA')) {
        payBadgeEl.textContent = 'ABA';
        payBadgeEl.style.background = '#004f71';
      } else if (savedPayMethod.includes('KHQR')) {
        payBadgeEl.textContent = 'KHQR';
        payBadgeEl.style.background = '#d8232a';
      } else if (savedPayMethod.includes('Wing')) {
        payBadgeEl.textContent = 'WING';
        payBadgeEl.style.background = '#84bd00';
      } else if (savedPayMethod.includes('Woori')) {
        payBadgeEl.textContent = 'WB';
        payBadgeEl.style.background = '#0077c8';
      } else if (savedPayMethod.includes('ACLEDA')) {
        payBadgeEl.textContent = 'AC';
        payBadgeEl.style.background = '#11335b';
      } else if (savedPayMethod.includes('សាច់ប្រាក់') || savedPayMethod.includes('Cash')) {
        payBadgeEl.textContent = 'CASH';
        payBadgeEl.style.background = '#1e6d34';
      }
    }
  }

  renderOrderSummary();
});

// Render Ordered Items and Cost Breakdown
function renderOrderSummary() {
  const container = document.getElementById('orderItemsContainer');
  if (!container) return;

  // Retrieve cart items from storage or fallback to default single item
  let items = [];
  try {
    const stored = localStorage.getItem('cropwise_cart_items');
    if (stored) {
      items = JSON.parse(stored);
    }
  } catch (e) {
    items = [];
  }

  // If no items in storage, provide default item for preview
  if (!items || items.length === 0) {
    items = [
      { id: 'f2', name: 'ជីកសិកម្ម ២: ជីអ៊ុយរ៉េ កំហាប់ខ្ពស់ Urea 46-0-0', price: 26.50, qty: 1 }
    ];
  }

  container.innerHTML = '';
  let subtotal = 0;

  items.forEach(item => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;
    const imgSrc = productImages[item.id] || 'assets/images/fertilizer (2) .jpg';

    const itemRow = document.createElement('div');
    itemRow.className = 'order-item-row';
    itemRow.innerHTML = `
      <img src="${imgSrc}" alt="${item.name}" class="order-item-img" />
      <div class="order-item-info">
        <h4 class="order-item-title">${item.name}</h4>
        <span class="order-item-qty">x${item.qty}</span>
      </div>
      <div class="order-item-price-col">
        <span class="order-item-current-price">$${itemTotal.toFixed(2)}</span>
        <span class="order-item-old-price">$${(itemTotal * 1.3).toFixed(2)}</span>
      </div>
    `;
    container.appendChild(itemRow);
  });

  const total = subtotal + DELIVERY_FEE;
  const totalKhr = Math.round(total * EXCHANGE_RATE_KHR);

  // Update Breakdown Card
  const subtotalEl = document.getElementById('breakdownSubtotal');
  const deliveryFeeEl = document.getElementById('breakdownDeliveryFee');
  const totalEl = document.getElementById('breakdownTotal');

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (deliveryFeeEl) deliveryFeeEl.textContent = `+$${DELIVERY_FEE.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;

  // Update Bottom Bar
  const bottomUsdEl = document.getElementById('bottomTotalUsd');
  const bottomKhrEl = document.getElementById('bottomTotalKhr');

  if (bottomUsdEl) bottomUsdEl.textContent = `$${total.toFixed(2)}`;
  if (bottomKhrEl) bottomKhrEl.textContent = `៛${totalKhr.toLocaleString()}`;
}

// Delivery Mode Selection
window.selectDeliveryMode = function(mode) {
  currentDeliveryMode = mode;
  const immPill = document.getElementById('modeImmediate');
  const schPill = document.getElementById('modeScheduled');

  if (mode === 'immediate') {
    immPill.classList.add('active');
    schPill.classList.remove('active');
    openToast('បានជ្រើសរើស: ដឹកជញ្ជូនភ្លាមៗ (២៥-៣០ នាទី)');
  } else {
    immPill.classList.remove('active');
    schPill.classList.add('active');
    openToast('បានជ្រើសរើស: ការកក់ដឹកជញ្ជូន ម៉ោង 3:30 PM');
    const scheduleTimeText = document.getElementById('scheduleTimeText');
    if (scheduleTimeText) scheduleTimeText.textContent = 'ថ្ងៃនេះ, 3:30 PM';
  }
};

// Payment Method Selection
window.selectPayMethod = function(method) {
  currentPayMethod = method;
  const abaPill = document.getElementById('payMethodAba');
  const codPill = document.getElementById('payMethodCod');

  if (method === 'aba') {
    abaPill.classList.add('active');
    codPill.classList.remove('active');
    openToast('បានជ្រើសរើស: ABA KHQR / ធនាគារចល័ត');
  } else {
    abaPill.classList.remove('active');
    codPill.classList.add('active');
    openToast('បានជ្រើសរើស: ទូទាត់ពេលទទួលទំនិញ (Cash on Delivery)');
  }
};

// Location Picker Mock
window.selectLocation = function() {
  openToast('ជ្រើសរើសទីតាំង: បឹងកេងកង ១, រាជធានីភ្នំពេញ');
};

// Alternative Payment -> Navigate to Payment Methods Page
window.openAltPaymentModal = function() {
  window.location.href = 'payment-methods.html';
};

// Submit Order ("ធ្វើការកុម្ម៉ង់ឥឡូវនេះ")
window.submitOrder = function() {
  const method = localStorage.getItem('cropwise_pay_method') || 'ABA PAY';
  openToast(`កំពុងដំណើរការបញ្ជាទិញ (${method})...`);
  setTimeout(() => {
    // Clear cart
    localStorage.removeItem('cropwise_cart_items');
    localStorage.removeItem('cropwise_cart_total');
    // Navigate to order tracking
    window.location.href = 'order-tracking.html';
  }, 1000);
};

// Navigation Back
window.goBack = function() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = 'product-detail.html';
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
