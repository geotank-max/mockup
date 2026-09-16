// --- PRODUCT DETAIL & STORE MENU (product-detail.js) ---

// Cart State tracking: { prodId: { id, name, price, qty } }
const cartState = {};

let toastTimeout = null;

document.addEventListener('DOMContentLoaded', () => {
  // Extract URL parameters if passed from products list
  const params = new URLSearchParams(window.location.search);
  const storeName = params.get('store') || params.get('name');
  const storeImg = params.get('img');
  const storeRating = params.get('rating');
  const storeDistance = params.get('dist');
  const storeTime = params.get('time');
  const storeFee = params.get('fee');
  const storeOldFee = params.get('oldFee');

  if (storeName) {
    const titleEl = document.getElementById('storeBrandTitle');
    if (titleEl) titleEl.textContent = decodeURIComponent(storeName);
  }

  if (storeImg) {
    const bannerEl = document.getElementById('storeBannerImg');
    if (bannerEl) bannerEl.src = decodeURIComponent(storeImg);
  }

  if (storeRating) {
    const ratingEl = document.getElementById('storeRatingVal');
    if (ratingEl) ratingEl.textContent = storeRating;
  }

  if (storeDistance) {
    const distEl = document.getElementById('storeDistance');
    if (distEl) distEl.textContent = storeDistance;
  }

  if (storeTime) {
    const timeEl = document.getElementById('storeMinutes');
    if (timeEl) timeEl.textContent = storeTime;
  }

  if (storeFee) {
    const feeEl = document.getElementById('storeDeliveryFee');
    if (feeEl) feeEl.textContent = storeFee;
  }

  if (storeOldFee) {
    const oldFeeEl = document.getElementById('storeDeliveryFeeOld');
    if (oldFeeEl) oldFeeEl.textContent = storeOldFee;
  }

  // Initial render of cart bar (hidden when empty)
  updateCartBar();
});

// Change Product Quantity (+ or -)
window.changeQty = function(prodId, delta, name, price) {
  if (!cartState[prodId]) {
    cartState[prodId] = { id: prodId, name: name, price: Number(price), qty: 0 };
  }

  cartState[prodId].qty += delta;

  if (cartState[prodId].qty <= 0) {
    delete cartState[prodId];
  }

  updateProductUI(prodId, name, price);
  updateCartBar();
};

// Update individual product button / stepper UI
function updateProductUI(prodId, name, price) {
  const wrap = document.getElementById(`qtyWrap-${prodId}`);
  if (!wrap) return;

  const currentItem = cartState[prodId];
  const qty = currentItem ? currentItem.qty : 0;

  if (qty > 0) {
    wrap.innerHTML = `
      <div class="qty-stepper-pill">
        <button class="btn-qty-minus" onclick="changeQty('${prodId}', -1, '${name}', ${price})" aria-label="ដក">&minus;</button>
        <span class="qty-value" id="qtyVal-${prodId}">${qty}</span>
        <button class="btn-qty-plus" onclick="changeQty('${prodId}', 1, '${name}', ${price})" aria-label="បន្ថែម">&#43;</button>
      </div>
    `;
  } else {
    wrap.innerHTML = `
      <button class="btn-h-add-cart" onclick="changeQty('${prodId}', 1, '${name}', ${price})" title="បន្ថែម">+</button>
    `;
  }
}

// Update docked bottom cart bar (Types Count + Total Price, show if > 0, hide if 0)
function updateCartBar() {
  const typesEl = document.getElementById('cartTypesCount');
  const priceEl = document.getElementById('cartPriceSum');
  const cartBar = document.getElementById('floatingCartBar');

  let totalCost = 0;
  let uniqueTypes = 0;

  for (const id in cartState) {
    if (cartState[id].qty > 0) {
      uniqueTypes += 1;
      totalCost += cartState[id].qty * cartState[id].price;
    }
  }

  if (typesEl) typesEl.textContent = `${uniqueTypes} មុខ`;
  if (priceEl) priceEl.textContent = `សរុប:$${totalCost.toFixed(2)}`;

  if (cartBar) {
    if (uniqueTypes > 0) {
      cartBar.style.display = 'flex';
      cartBar.classList.remove('cart-bump');
      void cartBar.offsetWidth; // Trigger reflow for bump animation
      cartBar.classList.add('cart-bump');
    } else {
      cartBar.style.display = 'none';
    }
  }
}

// Navigation Back
window.goBack = function() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = 'products.html';
  }
};

// Toggle Store Favorite
window.toggleStoreFav = function() {
  const btn = document.getElementById('btnFav');
  const isLiked = btn.classList.toggle('liked');
  const heart = document.getElementById('favHeartIcon');

  if (isLiked) {
    heart.setAttribute('fill', '#ff4757');
    heart.setAttribute('stroke', '#ff4757');
    openToast('បានរក្សាទុកហាងក្នុងបញ្ជីពេញចិត្ត');
  } else {
    heart.setAttribute('fill', 'none');
    heart.setAttribute('stroke', 'currentColor');
    openToast('បានដកហាងចេញពីបញ្ជីពេញចិត្ត');
  }
};

// Close Promo Ribbon
window.closePromoRibbon = function() {
  const ribbon = document.getElementById('promoRibbon');
  if (ribbon) ribbon.style.display = 'none';
};

// Filter Menu Tabs
window.filterMenuTab = function(category, element) {
  document.querySelectorAll('.menu-tab-item').forEach(t => t.classList.remove('active'));
  element.classList.add('active');
  openToast(`បានជ្រើសរើស: ${element.textContent.trim()}`);
};

// Open Checkout (Buy button "រួចរាល់" -> Go to Payment page)
window.openCheckout = function() {
  let totalCost = 0;
  let uniqueTypes = 0;
  const items = [];

  for (const id in cartState) {
    if (cartState[id].qty > 0) {
      uniqueTypes += 1;
      totalCost += cartState[id].qty * cartState[id].price;
      items.push({
        id: id,
        name: cartState[id].name,
        price: cartState[id].price,
        qty: cartState[id].qty
      });
    }
  }

  if (uniqueTypes === 0) {
    openToast('សូមជ្រើសរើសទំនិញយ៉ាងហោចណាស់ ១ មុខ');
    return;
  }

  // Save selected cart items & store name for payment page
  const storeTitle = document.getElementById('storeBrandTitle');
  if (storeTitle) {
    localStorage.setItem('cropwise_cart_store', storeTitle.textContent.trim());
  }
  localStorage.setItem('cropwise_cart_items', JSON.stringify(items));
  localStorage.setItem('cropwise_cart_total', totalCost.toFixed(2));

  window.location.href = 'payment.html';
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
  }, 2800);
};
