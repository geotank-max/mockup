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

function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = 'index.html';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderOrders();
});
