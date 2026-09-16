/**
 * my-orders.js - Logic for Orders Page (Dam Ey Agriculture App)
 */

const ordersList = [
  {
    id: 'ORD-104',
    status: 'delivering',
    statusLabel: 'កំពុងដឹកជញ្ជូន',
    isPulse: true,
    date: '2026-09-16 14:25:10',
    store: 'ដេប៉ូ ជីកសិកម្ម អង្គរ',
    title: 'ជីសរីរាង្គកំប៉ុស្ត៍ជន្លេន ធម្មជាតិ 100% (25kg)',
    img: 'assets/images/fertilize (1)  (1).jpg',
    tag: '',
    price: '$14.00',
    qty: 'x1',
    hasTrackBtn: true
  },
  {
    id: 'ORD-101',
    status: 'cancelled',
    statusLabel: 'ការកុម្ម៉ង់ត្រូវបានលុបចោល',
    isPulse: false,
    date: '2026-09-15 14:41:44',
    store: 'ហាងកសិកម្ម បឹងកេងកង / Green Agri',
    title: 'ជីអ៊ុយរ៉េ កំហាប់ខ្ពស់ Urea 46-0-0 (50kg)',
    img: 'assets/images/fertilize (1) .jpg',
    tag: '70%',
    price: '$26.50',
    qty: 'x1',
    hasTrackBtn: false
  },
  {
    id: 'ORD-102',
    status: 'cancelled',
    statusLabel: 'ការកុម្ម៉ង់ត្រូវបានលុបចោល',
    isPulse: false,
    date: '2026-09-15 14:37:35',
    store: 'ហាងកសិកម្ម បាត់ដំបង Green Agri',
    title: 'Bio-NPK 16-16-8 + Humic Acid (50kg)',
    img: 'assets/images/fertilizer (2) .jpg',
    tag: '',
    price: '$24.00',
    qty: 'x1',
    hasTrackBtn: false
  },
  {
    id: 'ORD-103',
    status: 'completed',
    statusLabel: 'ការកុម្ម៉ង់បានបញ្ចប់',
    isPulse: false,
    date: '2026-05-09 13:36:17',
    store: 'ហាងកសិកម្ម សៀមរាប ដាំអី Organic',
    title: 'ថ្នាំការពារដំណាំ Neem Bio-Defense Spray (1L)',
    img: 'assets/images/fertilize (3) .jpg',
    tag: '',
    price: '$12.50',
    qty: 'x2',
    hasTrackBtn: false
  }
];

let currentSearchTerm = '';

function renderOrdersCards(items) {
  const container = document.getElementById('ordersScrollContent');
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `
      <div class="empty-orders-box">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9bb1a1" stroke-width="1.8">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
        <p>រកមិនឃើញការកុម្ម៉ង់ដែលត្រូវនឹង "${currentSearchTerm}"</p>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(ord => `
    <article class="order-history-card">
      <!-- Status & Timestamp Header -->
      <div class="order-card-status-header">
        <div class="order-status-row">
          <span class="order-status-text ${ord.status}">
            ${ord.isPulse ? '<span class="pulse-green-dot"></span>' : ''}
            ${ord.statusLabel}
          </span>
        </div>
        <span class="order-timestamp">${ord.date}</span>
      </div>

      <!-- Store Container Row -->
      <div class="order-store-row" onclick="openToast('${ord.store}')" title="មើលហាង">
        <div class="order-store-info-left">
          <div class="order-store-avatar">🌿</div>
          <span class="order-store-name">${ord.store}</span>
        </div>
        <svg class="order-store-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>

      <!-- Product Details Row -->
      <div class="order-prod-details-row">
        <div class="order-prod-img-wrap">
          <img src="${ord.img}" alt="${ord.title}" class="order-prod-img" />
          ${ord.tag ? `<span class="order-prod-promo-tag">${ord.tag}</span>` : ''}
        </div>
        <div class="order-prod-meta">
          <h4 class="order-prod-title">${ord.title}</h4>
        </div>
        <div class="order-prod-price-col">
          <div class="order-prod-price-group">
            <span>${ord.price}</span>
            <span class="price-chevron">∨</span>
          </div>
          <span class="order-prod-qty">${ord.qty}</span>
        </div>
      </div>

      <!-- Action Buttons Row -->
      <div class="order-card-actions">
        ${ord.hasTrackBtn ? `
          <button type="button" class="btn-track-order" onclick="trackOrder('${ord.id}')">
            តាមដានការដឹក
          </button>
        ` : ''}
        <button type="button" class="btn-reorder" onclick="reorderItem('${ord.id}', '${ord.title}')">
          កុម្ម៉ង់ទៀត
        </button>
      </div>
    </article>
  `).join('');
}

function filterOrders(query) {
  currentSearchTerm = (query || '').trim().toLowerCase();
  if (!currentSearchTerm) {
    renderOrdersCards(ordersList);
    return;
  }

  const filtered = ordersList.filter(ord => {
    return (
      ord.title.toLowerCase().includes(currentSearchTerm) ||
      ord.store.toLowerCase().includes(currentSearchTerm) ||
      ord.statusLabel.toLowerCase().includes(currentSearchTerm) ||
      ord.date.toLowerCase().includes(currentSearchTerm) ||
      ord.price.toLowerCase().includes(currentSearchTerm)
    );
  });

  renderOrdersCards(filtered);
}

function reorderItem(orderId, prodTitle) {
  openToast(`✓ បានបន្ថែម "${prodTitle}" ទៅកន្ត្រកកុម្ម៉ង់ឡើងវិញ!`);
  setTimeout(() => {
    window.location.href = 'product-detail.html';
  }, 1000);
}

function trackOrder(orderId) {
  window.location.href = `order-tracking.html?id=${encodeURIComponent(orderId)}`;
}

// Toast Popup Controller
let toastTimeout = null;
function openToast(message) {
  const toast = document.getElementById('toastPopup');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

document.addEventListener('DOMContentLoaded', () => {
  renderOrdersCards(ordersList);
});
