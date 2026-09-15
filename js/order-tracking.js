/**
 * order-tracking.js - Interactive Controller for Detailed Delivery Tracking Page
 */

document.addEventListener('DOMContentLoaded', () => {
  // Parse order details from URL
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get('id') || '#ORD-9750';
  const orderIdEl = document.getElementById('trackingOrderId');
  if (orderIdEl) {
    orderIdEl.textContent = `Order ${orderId}`;
  }

  // Update live relative time every 60s
  let minutesAgo = 1;
  const updateEl = document.getElementById('updatedTimeText');
  setInterval(() => {
    minutesAgo++;
    if (updateEl) {
      updateEl.textContent = `Updated ${minutesAgo} mins ago`;
    }
  }, 60000);
});

// Navigation
function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = 'my-orders.html?tab=shipping';
  }
}

// Expand Map Modal
function openExpandMap() {
  const modal = document.getElementById('expandMapModal');
  if (modal) modal.style.display = 'flex';
}

function closeExpandMap() {
  const modal = document.getElementById('expandMapModal');
  if (modal) modal.style.display = 'none';
}

// Info Modal
function openInfoModal() {
  const modal = document.getElementById('trackingInfoModal');
  if (modal) modal.style.display = 'flex';
}

function closeInfoModal() {
  const modal = document.getElementById('trackingInfoModal');
  if (modal) modal.style.display = 'none';
}

// Call Driver
function callDriver() {
  const phone = '077 889 900';
  if (confirm(`តើអ្នកចង់ទូរស័ព្ទទៅកាន់អ្នកដឹកជញ្ជូន Sovan Rath (${phone}) ឥឡូវនេះមែនទេ?`)) {
    window.location.href = `tel:${phone.replace(/\s+/g, '')}`;
  }
}

// Driver Quick Chat Modal
function openDriverChat() {
  const modal = document.getElementById('driverChatModal');
  if (modal) modal.style.display = 'flex';
}

function closeDriverChat() {
  const modal = document.getElementById('driverChatModal');
  if (modal) modal.style.display = 'none';
}

function sendPresetMessage(text) {
  const chatMessagesList = document.getElementById('chatMessagesList');
  if (!chatMessagesList) return;

  // Append Farmer Message
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const msgHtml = `
    <div class="chat-bubble farmer-bubble">
      <p class="chat-bubble-text">${text}</p>
      <span class="chat-bubble-time">${timeStr}</span>
    </div>
  `;
  chatMessagesList.insertAdjacentHTML('beforeend', msgHtml);
  chatMessagesList.scrollTop = chatMessagesList.scrollHeight;

  // Automated Driver Reply after 1.2s
  setTimeout(() => {
    const replyHtml = `
      <div class="chat-bubble driver-bubble">
        <p class="chat-bubble-text">បាទបង! ខ្ញុំកំពុងឆ្លងកាត់ស្ពានសង្កែ ប្រហែល ១៥-២០ នាទីទៀតមកដល់ហើយបង។</p>
        <span class="chat-bubble-time">${timeStr}</span>
      </div>
    `;
    chatMessagesList.insertAdjacentHTML('beforeend', replyHtml);
    chatMessagesList.scrollTop = chatMessagesList.scrollHeight;
  }, 1200);
}

function sendCustomChatMessage() {
  const input = document.getElementById('customChatInput');
  if (!input) return;
  const val = input.value.trim();
  if (!val) return;
  input.value = '';
  sendPresetMessage(val);
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
