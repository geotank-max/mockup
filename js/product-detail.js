// --- PRODUCT DETAIL LOGIC (product-detail.js) ---

document.addEventListener('DOMContentLoaded', () => {
  // Extract URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const prodId = urlParams.get('id');
  const prodName = urlParams.get('name');
  const prodDealer = urlParams.get('dealer');
  const prodPrice = urlParams.get('price');
  const prodUnit = urlParams.get('unit');
  const prodImg = urlParams.get('img');
  const prodDesc = urlParams.get('desc');
  const prodLoc = urlParams.get('loc');

  // Default product database
  const productCatalog = {
    'prod_fert': {
      title: 'Bio-NPK 16-16-8 + សារធាតុ Humic (ជីសរីរាង្គកំហាប់ខ្ពស់)',
      location: 'Kandal',
      views: 54,
      pricing: '1 បាវ (25kg) - $24.00 / 96,000៛',
      image: 'assets/images/fertilize (1) .jpg',
      seller: 'AgroMart Battambang',
      sellerAvatar: 'assets/images/ad_soil_test.jpg',
      hashtags: '#ជីកសិកម្ម #ជីNPK_16-16-8 #ជំនួយដីកសិកម្ម #ពង្រឹងឫស និងលូតលាស់លឿន៖',
      desc: 'ជីសរីរាង្គកំហាប់ខ្ពស់ ជួយបំប៉នដី និងពង្រឹងឫសដំណាំឱ្យលូតលាស់លឿន ធន់នឹងភាពរាំងស្ងួត។ ដំណើរការផ្សំសារធាតុ Humic ជួយសម្រួលដល់ការស្រូបជីវជាតិបានពេញលេញ ធ្វើឱ្យដីធូរ មានសំណើម និងកាត់បន្ថយជាតិអាស៊ីតក្នុងដីបានរហូតដល់ ៨០% ធានាទិន្នផលកើនឡើងខ្ពស់។',
      otherProducts: [
        { id: 'prod_protect', name: 'Neem Bio-Defense', price: '$12.00 / ដប', img: 'assets/images/fertilizer (2) .jpg' },
        { id: 'prod_booster', name: 'អ័រម៉ូនរំញោចឫស & ផ្កា', price: '$9.00 / ដប', img: 'assets/images/fertilize (3) .jpg' }
      ]
    },
    'prod_protect': {
      title: 'ថ្នាំជីវសាស្ត្រ Neem Bio-Defense (ការពារដង្កូវ & ផ្សិត)',
      location: 'Kandal',
      views: 78,
      pricing: '1 ដប (1L) - $12.00 / 48,000៛',
      image: 'assets/images/fertilizer (2) .jpg',
      seller: 'Kandal Agri-Center',
      sellerAvatar: 'assets/images/ad_fertilizer.jpg',
      hashtags: '#ថ្នាំការពារដំណាំ #ប្រេងស្តៅធម្មជាតិ #កម្ចាត់ចៃស #ទប់ស្កាត់ផ្សិតស្លឹក៖',
      desc: 'ចម្រាញ់ពីប្រេងស្តៅធម្មជាតិ ១០០% មានប្រសិទ្ធភាពខ្ពស់ក្នុងការកម្ចាត់ចៃស ដង្កូវស៊ីត្រួយ និងទប់ស្កាត់ផ្សិតស្លឹកដោយសុវត្ថិភាព។ មិនប៉ះពាល់ដល់សុខភាពកសិករ និងអ្នកបរិភោគ អាចបាញ់មុនពេលប្រមូលផលបាន។',
      otherProducts: [
        { id: 'prod_fert', name: 'Bio-NPK 16-16-8', price: '$24.00 / បាវ', img: 'assets/images/fertilize (1) .jpg' },
        { id: 'prod_booster', name: 'អ័រម៉ូនរំញោចឫស & ផ្កា', price: '$9.00 / ដប', img: 'assets/images/fertilize (3) .jpg' }
      ]
    },
    'prod_booster': {
      title: 'អ័រម៉ូនរំញោចឫស & ផ្កា (ជំនួយការលូតលាស់សរីរាង្គ)',
      location: 'Battambang',
      views: 112,
      pricing: '1 ដប (500ml) - $9.00 / 36,000៛',
      image: 'assets/images/fertilize (3) .jpg',
      seller: 'SmartAgri Express',
      sellerAvatar: 'assets/images/ad_seeds.jpg',
      hashtags: '#អ័រម៉ូនរំញោចឫស #ជំនួយការចេញផ្កា #ផ្លែធំពេញទម្ងន់ #ការពារការជ្រុះផ្កា៖',
      desc: 'សារធាតុបំប៉នសរីរាង្គជួយឫសស្រូបជីវជាតិបានលឿន ការពារការជ្រុះផ្កា និងជួយឱ្យផ្លែធំពេញទម្ងន់។ ប្រើប្រាស់រៀងរាល់ ៧ ទៅ ១០ ថ្ងៃម្តង ក្នុងដំណាក់កាលលូតលាស់សកម្ម និងមុនពេលចេញផ្កា។',
      otherProducts: [
        { id: 'prod_fert', name: 'Bio-NPK 16-16-8', price: '$24.00 / បាវ', img: 'assets/images/fertilize (1) .jpg' },
        { id: 'prod_protect', name: 'Neem Bio-Defense', price: '$12.00 / ដប', img: 'assets/images/fertilizer (2) .jpg' }
      ]
    }
  };

  // Find product or fallback to sample
  let product = productCatalog[prodId] || productCatalog['prod_fert'];

  // Override fields if query parameters were provided
  if (prodName) product.title = prodName;
  if (prodDealer) product.seller = prodDealer;
  if (prodImg) product.image = decodeURIComponent(prodImg);
  if (prodDesc) product.desc = prodDesc;
  if (prodLoc) product.location = prodLoc;
  if (prodPrice) {
    product.pricing = `${prodUnit || '1 Unit'} - ${prodPrice}`;
  }

  // Populate UI
  const titleEl = document.getElementById('productTitle');
  const locEl = document.getElementById('productLocation');
  const viewEl = document.getElementById('viewerCount');
  const priceEl = document.getElementById('pricingLine');
  const imgEl = document.getElementById('productMainImg');
  const sellerEl = document.getElementById('sellerName');
  const hashEl = document.getElementById('descHashtags');
  const descEl = document.getElementById('descBody');
  const avatarEl = document.getElementById('sellerAvatar');

  if (titleEl) titleEl.textContent = product.title;
  if (locEl) locEl.textContent = product.location || 'Kandal';
  if (viewEl) viewEl.textContent = product.views || 54;
  if (priceEl) priceEl.textContent = product.pricing;
  if (imgEl) imgEl.src = product.image;
  if (sellerEl) sellerEl.textContent = product.seller;
  if (hashEl) hashEl.textContent = product.hashtags;
  if (descEl) descEl.textContent = product.desc;
  if (avatarEl && product.sellerAvatar) avatarEl.src = product.sellerAvatar;

  // Render Other Products
  const otherGrid = document.getElementById('otherProductsGrid');
  if (otherGrid && product.otherProducts) {
    otherGrid.innerHTML = product.otherProducts.map(op => `
      <div class="other-p-card" onclick="openOtherProduct('${op.id}', '${op.name}', '${op.price}', '${encodeURIComponent(op.img)}')">
        <img src="${op.img}" alt="${op.name}" class="other-p-img" />
        <div class="other-p-info">
          <strong class="other-p-title">${op.name}</strong>
          <span class="other-p-price">${op.price}</span>
        </div>
      </div>
    `).join('');
  }
});

// Navigation & Actions
window.goBack = function() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = 'run-test.html';
  }
};

let isLiked = false;
window.toggleFavorite = function() {
  const favBtn = document.getElementById('favBtn');
  isLiked = !isLiked;
  if (isLiked) {
    favBtn?.classList.add('liked');
    openToast('បានរក្សាទុកក្នុងបញ្ជីពេញចិត្ត');
  } else {
    favBtn?.classList.remove('liked');
    openToast('បានដកចេញពីបញ្ជីពេញចិត្ត');
  }
};

 window.shareProduct = function() {
  if (navigator.share) {
    navigator.share({
      title: document.getElementById('productTitle')?.textContent || 'Dam Ey Product',
      url: window.location.href
    }).catch(() => {});
  } else {
    navigator.clipboard?.writeText(window.location.href);
    openToast('បានចម្លងតំណភ្ជាប់ចែករំលែក!');
  }
};

window.handleAddToCart = function() {
  const title = document.getElementById('productTitle')?.textContent || 'ផលិតផល';
  const seller = document.getElementById('sellerName')?.textContent || 'អ្នកផ្គត់ផ្គង់';
  openToast(`បានបញ្ចូល ${title} ទៅក្នុងកន្ត្រក! កំពុងភ្ជាប់ទៅកាន់ ${seller}...`);
  setTimeout(() => {
    openToast('បានភ្ជាប់ការបញ្ជាទិញជោគជ័យ!');
  }, 1500);
};

window.switchTab = function(tab) {
  const tabInfo = document.getElementById('tabInfoDetail');
  const tabOther = document.getElementById('tabOtherProducts');
  const paneInfo = document.getElementById('paneInfoDetail');
  const paneOther = document.getElementById('paneOtherProducts');

  if (tab === 'info') {
    tabInfo?.classList.add('active');
    tabOther?.classList.remove('active');
    if (paneInfo) paneInfo.style.display = 'flex';
    if (paneOther) paneOther.style.display = 'none';
  } else {
    tabOther?.classList.add('active');
    tabInfo?.classList.remove('active');
    if (paneInfo) paneInfo.style.display = 'none';
    if (paneOther) paneOther.style.display = 'grid';
  }
};

let isExpanded = false;
window.toggleReadMore = function() {
  const desc = document.getElementById('descBody');
  const trigger = document.getElementById('readMoreTrigger');
  isExpanded = !isExpanded;
  if (isExpanded) {
    desc?.classList.remove('collapsed');
    if (trigger) trigger.textContent = '...Show Less';
  } else {
    desc?.classList.add('collapsed');
    if (trigger) trigger.textContent = '...Read More';
  }
};

window.viewSellerProfile = function() {
  const seller = document.getElementById('sellerName')?.textContent || 'អ្នកផ្គត់ផ្គង់';
  openToast(`កំពុងចូលទៅកាន់ហាង៖ ${seller}`);
};

window.openOtherProduct = function(id, name, price, img) {
  window.location.href = `product-detail.html?id=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&img=${img}`;
};

// Toast notification helper
let toastTimeout = null;
window.openToast = function(message) {
  const toast = document.getElementById('toastPopup');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
};
