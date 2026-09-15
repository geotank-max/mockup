// --- PRODUCT DETAIL & STORE MENU (product-detail.js) ---

let cartCount = 0;
let cartTotal = 0.00;
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
});

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

// Add to Cart
window.addToCart = function(productName, price) {
  cartCount += 1;
  cartTotal += Number(price);

  const cartBar = document.getElementById('floatingCartBar');
  const countEl = document.getElementById('cartItemCount');
  const priceEl = document.getElementById('cartPriceSum');

  if (countEl) countEl.textContent = cartCount;
  if (priceEl) priceEl.textContent = `$${cartTotal.toFixed(2)}`;

  if (cartBar) {
    cartBar.style.display = 'flex';
    cartBar.style.animation = 'cartBounce 0.3s ease';
  }

  openToast(`បានបន្ថែម "${productName}" ទៅក្នុងកន្ត្រក`);
};

// Open Checkout
window.openCheckout = function() {
  openToast(`កំពុងដំណើរការបញ្ជាទិញ (${cartCount} មុខទំនិញ - សរុប $${cartTotal.toFixed(2)})`);
  setTimeout(() => {
    window.location.href = 'order-tracking.html';
  }, 1000);
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
