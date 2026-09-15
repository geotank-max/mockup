/**
 * my-orders.js - Logic for Farmer Order History & Pending Purchases
 */

const mockOrdersData = [
  {
    id: '#ORD-9821',
    status: 'pending',
    statusLabel: 'កំពុងរង់ចាំការបញ្ជាក់',
    statusClass: 'status-pending',
    date: 'ថ្ងៃនេះ, 09:15 ព្រឹក',
    seller: {
      name: 'ដេប៉ូ ជីកសិកម្ម អង្គរ',
      province: 'ខេត្តកណ្តាល',
      phone: '012 345 678'
    },
    items: [
      {
        name: 'ជីអ៊ុយរ៉េ N-P-K 46-0-0 (50kg)',
        qty: '2 បាវ',
        price: '$48.00',
        img: 'assets/images/fertilize (1) .jpg'
      },
      {
        name: 'ជីប៉ូតាស្យូម K₂O 0-0-60 (50kg)',
        qty: '1 បាវ',
        price: '$28.00',
        img: 'assets/images/fertilizer (2) .jpg'
      }
    ],
    totalCount: 'ទំនិញសរុប ៣ បាវ',
    totalPrice: '$76.00',
    hint: '⏳ អ្នកលក់កំពុងពិនិត្យស្តុក និងរៀបចំឥវ៉ាន់'
  },
  {
    id: '#ORD-9804',
    status: 'pending',
    statusLabel: 'កំពុងរៀបចំឥវ៉ាន់',
    statusClass: 'status-pending',
    date: 'ម្សិលមិញ, 03:40 រសៀល',
    seller: {
      name: 'ហាង ខ្មែរ អាហ្គ្រោ បៃតង',
      province: 'ខេត្តកំពង់ចាម',
      phone: '098 765 432'
    },
    items: [
      {
        name: 'ថ្នាំការពារជំងឺផ្សិត និងស្លឹកត្នោត (1L)',
        qty: '3 ដប',
        price: '$24.00',
        img: 'assets/images/fertilize (3) .jpg'
      }
    ],
    totalCount: 'ទំនិញសរុប ៣ ដប',
    totalPrice: '$24.00',
    hint: '📦 ហាងកំពុងវេចខ្ចប់ និងរៀបចំប្រគល់ឱ្យដឹកជញ្ជូន'
  },
  {
    id: '#ORD-9750',
    status: 'shipping',
    statusLabel: 'កំពុងដឹកជញ្ជូន',
    statusClass: 'status-shipping',
    date: '12 កញ្ញា 2026',
    orderDate: '2 May',
    dispatchDate: '2 May',
    trackingProgress: 68,
    seller: {
      name: 'មជ្ឈមណ្ឌល ធាតុចូលកសិកម្ម សៀមរាប',
      province: 'ខេត្តសៀមរាប',
      phone: '077 889 900'
    },
    items: [
      {
        name: 'ជីកំប៉ុសធម្មជាតិ និងសារធាតុសរីរាង្គ (25kg)',
        qty: '4 បាវ',
        price: '$40.00',
        img: 'assets/images/fertilize (1) .jpg'
      }
    ],
    totalCount: 'ទំនិញសរុប ៤ បាវ',
    totalPrice: '$40.00',
    hint: '🚚 ទំនិញកំពុងស្ថិតនៅលើផ្លូវមកកាន់ទីតាំងរបស់អ្នក'
  },
  {
    id: '#ORD-9610',
    status: 'completed',
    statusLabel: 'បានទទួលជោគជ័យ',
    statusClass: 'status-completed',
    date: '08 កញ្ញា 2026',
    seller: {
      name: 'ហាង កសិកម្ម រតនៈ',
      province: 'ខេត្តបាត់ដំបង',
      phone: '010 112 233'
    },
    items: [
      {
        name: 'ជីបំប៉នស្លឹក និងជំនួយឫស 500ml',
        qty: '2 ដប',
        price: '$18.00',
        img: 'assets/images/fertilizer (2) .jpg'
      }
    ],
    totalCount: 'ទំនិញសរុប ២ ដប',
    totalPrice: '$18.00',
    hint: '✅ បានប្រគល់ទំនិញ និងទូទាត់រួចរាល់'
  }
];

let currentFilter = 'pending';
let activeTargetOrderId = '#ORD-9750';

function renderOrders() {
  const container = document.getElementById('ordersCardsContainer');
  if (!container) return;

  const filtered = mockOrdersData.filter(ord => {
    if (currentFilter === 'all') return true;
    return ord.status === currentFilter;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: #6a8071;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9bb1a1" stroke-width="1.8" style="margin-bottom: 12px;">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
        <p style="font-family: 'Siemreap', sans-serif; font-size: 13.5px; font-weight: 600; margin: 0;">មិនមានការបញ្ជាទិញក្នុងប្រអប់នេះទេ</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(ord => `
    <div class="order-card-box">
      <div class="order-card-header">
        <div class="order-seller-info">
          <div class="order-seller-avatar">
            <img src="assets/icons/home-color-icon.svg" alt="Shop" />
          </div>
          <div class="order-seller-names">
            <h3 class="order-seller-title">${ord.seller.name}</h3>
            <span class="order-seller-location">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              ${ord.seller.province}
            </span>
          </div>
        </div>
        <span class="order-status-badge ${ord.statusClass}">${ord.statusLabel}</span>
      </div>

      <div class="order-meta-row">
        <span>កូដបញ្ជាទិញ: <strong class="order-id-tag">${ord.id}</strong></span>
        <span>${ord.date}</span>
      </div>

      ${ord.status === 'shipping' ? `
        <!-- Delivery Tracking Widget (Matching Reference Design) -->
        <div class="delivery-tracking-card">
          <div class="dt-header-row">
            <div class="dt-title-group" onclick="location.href='order-tracking.html?id=${encodeURIComponent(ord.id)}'" style="cursor: pointer;">
              <h3 class="dt-title">Delivery Tracking</h3>
            </div>
            <div class="dt-status-group">
              <div class="dt-arriving-badge" onclick="location.href='order-tracking.html?id=${encodeURIComponent(ord.id)}'" style="cursor: pointer;">Arriving today</div>
              <div class="dt-action-links">
                <button type="button" class="dt-link-btn" onclick="openCancellationModal('${ord.id}')">Request cancellation</button>
                <span class="dt-pipe">|</span>
                <button type="button" class="dt-link-btn" onclick="openInstructionsModal('${ord.id}')">Provide delivery instructions</button>
              </div>
              <div class="dt-out-delivery">It's out for delivery</div>
            </div>
          </div>

          <!-- Progress Tracker Bar (Clickable to view detail) -->
          <div class="dt-progress-wrapper" onclick="location.href='order-tracking.html?id=${encodeURIComponent(ord.id)}'" style="cursor: pointer;" title="ចុចដើម្បីមើលព័ត៌មានលម្អិត">
            <div class="dt-track">
              <div class="dt-track-fill" style="width: ${ord.trackingProgress || 68}%;"></div>
              <div class="dt-track-dot" style="left: ${ord.trackingProgress || 68}%;"></div>
              <div class="dt-track-target"></div>
            </div>

            <!-- Milestones Below Progress Bar -->
            <div class="dt-milestones-row">
              <div class="dt-milestone dt-start">
                <span class="dt-step-name">Ordered</span>
                <span class="dt-step-date">${ord.orderDate || '2 May'}</span>
              </div>
              <div class="dt-milestone dt-mid">
                <span class="dt-step-name">Dispatched</span>
                <span class="dt-step-date">${ord.dispatchDate || '2 May'}</span>
              </div>
              <div class="dt-milestone dt-end">
                <span class="dt-step-name dt-green">Arriving today</span>
              </div>
            </div>
          </div>

          <!-- Live Route Details CTA Banner -->
          <a href="order-tracking.html?id=${encodeURIComponent(ord.id)}" class="dt-view-live-btn" title="មើលផ្លូវដឹកជញ្ជូនបន្តផ្ទាល់">
            <div class="dt-live-tag">
              <span class="pulse-dot-green"></span>
              <span>Live Route: Battambang Farmland</span>
            </div>
            <span class="dt-view-text">មើលលម្អិត & ផែនទី →</span>
          </a>
        </div>
      ` : ''}

      <div class="order-items-list">
        ${ord.items.map(it => `
          <div class="order-item-row">
            <img src="${it.img}" alt="${it.name}" class="order-item-thumb" />
            <div class="order-item-details">
              <span class="order-item-name">${it.name}</span>
              <span class="order-item-qty">ចំនួន៖ ${it.qty}</span>
            </div>
            <span class="order-item-price">${it.price}</span>
          </div>
        `).join('')}
      </div>

      <div class="order-card-footer">
        <div class="order-total-group">
          <span class="order-total-count">${ord.totalCount}</span>
          <span class="order-total-price">${ord.totalPrice}</span>
        </div>
        <div class="order-status-hint">
          <span>${ord.hint}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function switchOrderTab(status) {
  currentFilter = status;
  document.querySelectorAll('.order-tab-chip').forEach(tab => {
    if (tab.getAttribute('data-status') === status) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
  renderOrders();
}

// Modal Handlers
function openInstructionsModal(orderId) {
  activeTargetOrderId = orderId;
  const modal = document.getElementById('deliveryInstructionsModal');
  if (modal) {
    modal.style.display = 'flex';
    const input = document.getElementById('deliveryNotesInput');
    if (input) input.value = '';
  }
}

function closeInstructionsModal() {
  const modal = document.getElementById('deliveryInstructionsModal');
  if (modal) modal.style.display = 'none';
}

function setInstructionText(text) {
  const input = document.getElementById('deliveryNotesInput');
  if (input) {
    input.value = text;
  }
}

function saveDeliveryInstructions() {
  const input = document.getElementById('deliveryNotesInput');
  closeInstructionsModal();
  openToast('✓ បានរក្សាទុកការណែនាំដឹកជញ្ជូនដោយជោគជ័យ!');
}

function openCancellationModal(orderId) {
  activeTargetOrderId = orderId;
  const modal = document.getElementById('requestCancellationModal');
  const text = document.getElementById('cancelOrderIdText');
  if (text) text.textContent = orderId;
  if (modal) modal.style.display = 'flex';
}

function closeCancellationModal() {
  const modal = document.getElementById('requestCancellationModal');
  if (modal) modal.style.display = 'none';
}

function confirmCancellationRequest() {
  closeCancellationModal();
  openToast('✓ បានផ្ញើសំណើសុំបោះបង់ទៅកាន់អ្នកផ្គត់ផ្គង់រួចរាល់!');
}

// Toast Alert Helper
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

function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = 'index.html';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get('tab') || urlParams.get('status');
  if (tabParam && ['pending', 'shipping', 'completed', 'all'].includes(tabParam)) {
    switchOrderTab(tabParam);
  } else {
    renderOrders();
  }
});
