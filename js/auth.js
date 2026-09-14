/**
 * auth.js - Authentication & Role Redirection Logic
 * Handles Farmer vs Seller login, registration, and password recovery.
 */

// Pre-defined Demo Credentials
const DEMO_ACCOUNTS = {
  farmer: {
    username: 'farmer',
    phone: '012888999',
    password: 'farmer123',
    role: 'farmer',
    name: 'កសិករ សុខា',
    redirect: 'index.html'
  },
  seller: {
    username: 'seller',
    phone: '098777666',
    password: 'seller123',
    role: 'seller',
    name: 'ដេប៉ូ ជីកសិកម្ម អង្គរ',
    redirect: 'seller-dashboard.html'
  }
};

let currentSelectedRole = 'farmer';

function selectRole(role) {
  currentSelectedRole = role;
  document.querySelectorAll('.role-toggle-btn').forEach(btn => {
    if (btn.getAttribute('data-role') === role) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const usernameInput = document.getElementById('authUsername');
  if (usernameInput) {
    usernameInput.placeholder = role === 'farmer' 
      ? 'ឈ្មោះអ្នកប្រើ ឬ លេខទូរស័ព្ទកសិករ...' 
      : 'ឈ្មោះហាង ឬ លេខទូរស័ព្ទអ្នកផ្គត់ផ្គង់...';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const usernameInput = document.getElementById('authUsername');
  if (usernameInput) {
    usernameInput.addEventListener('input', (e) => {
      const val = e.target.value.toLowerCase().trim();
      if (val.startsWith('seller') || val === '098777666' || val.includes('seller') || val.includes('ដេប៉ូ') || val.includes('ហាង')) {
        selectRole('seller');
      } else if (val.startsWith('farmer') || val === '012888999' || val.includes('farmer') || val.includes('កសិករ')) {
        selectRole('farmer');
      }
    });
  }
});

function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;

  if (input.type === 'password') {
    input.type = 'text';
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
      </svg>
    `;
  } else {
    input.type = 'password';
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    `;
  }
}

function quickFillDemo(role) {
  selectRole(role);
  const account = DEMO_ACCOUNTS[role];
  const userInp = document.getElementById('authUsername');
  const passInp = document.getElementById('authPassword');

  if (userInp) userInp.value = account.username;
  if (passInp) passInp.value = account.password;

  if (role === 'seller') {
    saveSession('seller', DEMO_ACCOUNTS.seller.name);
    showAlert('ចូលប្រើប្រាស់ជោគជ័យជា អ្នកផ្គត់ផ្គង់ (Seller Hub)! កំពុងផ្ទេរទៅកាន់ផ្ទាំងព័ត៌មាន...', true);
    setTimeout(() => {
      window.location.replace('seller-dashboard.html');
    }, 400);
  } else {
    saveSession('farmer', DEMO_ACCOUNTS.farmer.name);
    showAlert('ចូលប្រើប្រាស់ជោគជ័យជា កសិករ! កំពុងផ្ទេរ...', true);
    setTimeout(() => {
      window.location.replace('index.html');
    }, 400);
  }
}

function handleLogin(e) {
  if (e) e.preventDefault();

  const userInp = document.getElementById('authUsername');
  const passInp = document.getElementById('authPassword');

  const username = userInp ? userInp.value.trim().toLowerCase() : '';
  const password = passInp ? passInp.value.trim() : '';

  if (!username || !password) {
    showAlert('សូមបញ្ចូលឈ្មោះអ្នកប្រើ និងពាក្យសម្ងាត់!', false);
    return;
  }

  // 1. Check Seller First (Explicit seller username, phone, or seller tab active)
  const isSellerIntent = 
    username === 'seller' || 
    username.includes('seller') || 
    username === DEMO_ACCOUNTS.seller.phone || 
    currentSelectedRole === 'seller';

  if (isSellerIntent) {
    saveSession('seller', DEMO_ACCOUNTS.seller.name);
    showAlert('ចូលប្រើប្រាស់ជោគជ័យជា អ្នកផ្គត់ផ្គង់ (Seller Hub)! កំពុងផ្ទេរ...', true);
    setTimeout(() => {
      window.location.replace('seller-dashboard.html');
    }, 350);
    return;
  }

  // 2. Otherwise Farmer
  saveSession('farmer', DEMO_ACCOUNTS.farmer.name);
  showAlert('ចូលប្រើប្រាស់ជោគជ័យជា កសិករ! កំពុងផ្ទេរ...', true);
  setTimeout(() => {
    window.location.replace('index.html');
  }, 350);
}

function handleFarmerRegister(e) {
  if (e) e.preventDefault();

  const name = document.getElementById('regName')?.value.trim();
  const phone = document.getElementById('regPhone')?.value.trim();
  const province = document.getElementById('regProvince')?.value;
  const crop = document.getElementById('regCrop')?.value;
  const pass = document.getElementById('regPassword')?.value;
  const confirmPass = document.getElementById('regConfirmPassword')?.value;

  if (!name || !phone || !pass) {
    showAlert('សូមបំពេញព័ត៌មានកសិករចាំបាច់ទាំងអស់!', false);
    return;
  }

  if (pass !== confirmPass) {
    showAlert('ពាក្យសម្ងាត់ផ្ទៀងផ្ទាត់មិនត្រូវគ្នាទេ!', false);
    return;
  }

  saveSession('farmer', name);
  showAlert('ចុះឈ្មោះគណនីកសិករបានជោគជ័យ! កំពុងផ្ទេរទៅកាន់កម្មវិធី...', true);
  setTimeout(() => {
    window.location.replace('index.html');
  }, 900);
}

function handleSellerRegister(e) {
  if (e) e.preventDefault();

  const shopName = document.getElementById('sellerShopName')?.value.trim();
  const ownerName = document.getElementById('sellerOwnerName')?.value.trim();
  const phone = document.getElementById('sellerPhone')?.value.trim();
  const type = document.getElementById('sellerType')?.value;
  const province = document.getElementById('sellerProvince')?.value;
  const pass = document.getElementById('sellerPassword')?.value;
  const confirmPass = document.getElementById('sellerConfirmPassword')?.value;

  if (!shopName || !phone || !pass) {
    showAlert('សូមបំពេញព័ត៌មានអាជីវកម្មចាំបាច់ទាំងអស់!', false);
    return;
  }

  if (pass !== confirmPass) {
    showAlert('ពាក្យសម្ងាត់ផ្ទៀងផ្ទាត់មិនត្រូវគ្នាទេ!', false);
    return;
  }

  saveSession('seller', shopName);
  showAlert('ចុះឈ្មោះដៃគូអ្នកផ្គត់ផ្គង់បានជោគជ័យ! កំពុងផ្ទេរទៅកាន់ Seller Hub Dashboard...', true);
  setTimeout(() => {
    window.location.replace('seller-dashboard.html');
  }, 900);
}

function handleRegister(e) {
  handleFarmerRegister(e);
}

function handleForgotPassword(e) {
  if (e) e.preventDefault();

  const phone = document.getElementById('fpPhone')?.value.trim();
  const newPass = document.getElementById('fpNewPassword')?.value;
  const confirmPass = document.getElementById('fpConfirmPassword')?.value;

  if (!phone) {
    showAlert('សូមបញ្ចូលលេខទូរស័ព្ទដែលបានចុះឈ្មោះ!', false);
    return;
  }

  if (!newPass || newPass !== confirmPass) {
    showAlert('សូមបញ្ចូល និងផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់ថ្មីឱ្យបានត្រឹមត្រូវ!', false);
    return;
  }

  showAlert('កំណត់ពាក្យសម្ងាត់ថ្មីជោគជ័យ! កំពុងផ្ទេរទៅកាន់ទំព័រចូល...', true);
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 1200);
}

function saveSession(role, name) {
  try {
    localStorage.setItem('cropwise_user_role', role);
    localStorage.setItem('cropwise_user_name', name);
    localStorage.setItem('cropwise_logged_in', 'true');
  } catch (err) {
    console.error(err);
  }
}

function showAlert(msg, isSuccess) {
  const alertBox = document.getElementById('authAlert');
  if (!alertBox) return;

  alertBox.textContent = msg;
  alertBox.style.display = 'block';
  if (isSuccess) {
    alertBox.className = 'auth-alert-msg success';
  } else {
    alertBox.className = 'auth-alert-msg';
  }
}

function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = 'login.html';
  }
}
