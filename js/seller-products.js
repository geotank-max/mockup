// --- SELLER PRODUCT MANAGEMENT (seller-products.js) ---

const INITIAL_FERTILIZERS = [
  {
    id: 'prod_1',
    name: 'ជីកសិកម្ម ១: Bio-NPK 16-16-8 + Humic Acid',
    category: 'fertilizer',
    categoryName: 'ជីកសិកម្ម',
    sku: 'FERT-NPK16',
    stock: 210,
    unit: 'បាវ',
    price: 32.00,
    currency: 'USD',
    status: 'available', // available | out | hidden
    image: 'assets/images/fertilize (1) .jpg',
    description: 'ជីសរីរាង្គកំហាប់ខ្ពស់ ជួយពង្រឹងដី និងជំរុញទិន្នផលដំណាំស្រូវ និងដំណាំបន្លែគ្រប់ប្រភេទ',
    lastUpdated: '2026-09-15'
  },
  {
    id: 'prod_2',
    name: 'ជីកសិកម្ម ២: ជីអ៊ុយរ៉េ Urea 46-0-0',
    category: 'fertilizer',
    categoryName: 'ជីកសិកម្ម',
    sku: 'FERT-UR46',
    stock: 450,
    unit: 'បាវ',
    price: 26.50,
    currency: 'USD',
    status: 'available',
    image: 'assets/images/fertilizer (2) .jpg',
    description: 'ជីអាសូតសុទ្ធ ជួយឱ្យស្លឹកខៀវបៃតងលឿន និងលូតលាស់ខ្លាំងក្នុងដំណាក់កាលដំបូង',
    lastUpdated: '2026-09-14'
  },
  {
    id: 'prod_3',
    name: 'ជីកសិកម្ម ៣: ជីសរីរាង្គកំប៉ុស្ត៍ជន្លេន 100%',
    category: 'fertilizer',
    categoryName: 'ជីកសិកម្ម',
    sku: 'FERT-VERM',
    stock: 190,
    unit: 'បាវ',
    price: 14.00,
    currency: 'USD',
    status: 'available',
    image: 'assets/images/fertilize (3) .jpg',
    description: 'កំប៉ុស្ត៍ជន្លេនសម្បូរដោយមីក្រុបមានប្រយោជន៍ និងបង្កើនសំណើមដីយូរអង្វែង',
    lastUpdated: '2026-09-12'
  },
  {
    id: 'prod_4',
    name: 'ថ្នាំការពារដំណាំ Neem Bio-Defense Spray',
    category: 'pesticide',
    categoryName: 'ថ្នាំការពារដំណាំ & កម្ចាត់សត្វល្អិត',
    sku: 'PEST-NEEM1L',
    stock: 95,
    unit: 'ដប',
    price: 12.50,
    currency: 'USD',
    status: 'available',
    image: 'assets/images/ad_seeds.jpg',
    description: 'ថ្នាំសរីរាង្គកម្ចាត់ចៃ មមាច និងដង្កូវស៊ីស្លឹក គ្មានជាតិពុល',
    lastUpdated: '2026-09-11'
  },
  {
    id: 'prod_5',
    name: 'គ្រាប់ពូជស្រូវផ្ការំដួលសុទ្ធ Phka Rumduol Grade A',
    category: 'seeds',
    categoryName: 'គ្រាប់ពូជដំណាំកសិកម្ម',
    sku: 'SEED-RMD50',
    stock: 110,
    unit: 'បាវ',
    price: 22.00,
    currency: 'USD',
    status: 'available',
    image: 'assets/images/ad_fertilizer.jpg',
    description: 'គ្រាប់ពូជស្រូវក្រអូបគុណភាពខ្ពស់ ដំណុះ ៩៨% ធន់ជំងឺ',
    lastUpdated: '2026-09-10'
  }
];

let pmProducts = [];
let toastTimeout = null;

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  loadProductsData();
  initSidebar();
  initSearch();
  initAddDropdown();
  renderProductCatalog();
});

// Load products from storage
function loadProductsData() {
  try {
    const saved = localStorage.getItem('cropwise_seller_inventory');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        pmProducts = parsed.map(p => ({
          ...p,
          status: p.status || (p.stock > 0 ? 'available' : 'out'),
          currency: p.currency || 'USD'
        }));
        // Ensure fertilizer 1-3 have proper clean Khmer names
        pmProducts.forEach(p => {
          if (p.id === 'prod_1') {
            p.name = 'ជីកសិកម្ម ១: Bio-NPK 16-16-8 + Humic Acid';
            p.categoryName = 'ជីកសិកម្ម';
            if (p.image && p.image.includes('ad_fertilizer')) p.image = 'assets/images/fertilize (1) .jpg';
          }
          if (p.id === 'prod_2') {
            p.name = 'ជីកសិកម្ម ២: ជីអ៊ុយរ៉េ Urea 46-0-0';
            p.categoryName = 'ជីកសិកម្ម';
          }
          if (p.id === 'prod_3') {
            p.name = 'ជីកសិកម្ម ៣: ជីសរីរាង្គកំប៉ុស្ត៍ជន្លេន 100%';
            p.categoryName = 'ជីកសិកម្ម';
            if (p.image && p.image.includes('fertilizer (2)')) p.image = 'assets/images/fertilize (3) .jpg';
          }
        });
      } else {
        pmProducts = [...INITIAL_FERTILIZERS];
        saveProductsData();
      }
    } else {
      pmProducts = [...INITIAL_FERTILIZERS];
      saveProductsData();
    }
  } catch (e) {
    console.error('Error reading products:', e);
    pmProducts = [...INITIAL_FERTILIZERS];
  }
}

function saveProductsData() {
  try {
    localStorage.setItem('cropwise_seller_inventory', JSON.stringify(pmProducts));
  } catch (e) {
    console.error('Error saving products:', e);
  }
}

// Render the Catalog Grouped by Categories
function renderProductCatalog(filterQuery = '') {
  const catalogContainer = document.getElementById('pmCatalogContainer');
  if (!catalogContainer) return;

  const query = filterQuery.toLowerCase().trim();
  const filtered = pmProducts.filter(p => {
    if (!query) return true;
    return (
      (p.name && p.name.toLowerCase().includes(query)) ||
      (p.sku && p.sku.toLowerCase().includes(query)) ||
      (p.categoryName && p.categoryName.toLowerCase().includes(query))
    );
  });

  if (filtered.length === 0) {
    catalogContainer.innerHTML = `
      <div class="pm-empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8fa996" stroke-width="1.5" style="margin-bottom: 12px;">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <h4>រកមិនឃើញមុខទំនិញឡើយ</h4>
        <p>មិនមានផលិតផលណាដែលត្រូវនឹងពាក្យ "${query}" ឡើយ។ សូមសាកល្បងពាក្យស្វែងរកផ្សេង។</p>
      </div>
    `;
    return;
  }

  // Clean category names in Khmer without English
  const categories = [
    { key: 'fertilizer', title: 'ជីកសិកម្ម' },
    { key: 'pesticide', title: 'ថ្នាំការពារដំណាំ & កម្ចាត់សត្វល្អិត' },
    { key: 'seeds', title: 'គ្រាប់ពូជដំណាំកសិកម្ម' },
    { key: 'booster', title: 'អ័រម៉ូន & ជំនួយការលូតលាស់' },
    { key: 'other', title: 'សម្ភារៈកសិកម្មផ្សេងៗ' }
  ];

  let html = '';

  categories.forEach(cat => {
    const itemsInCat = filtered.filter(p => (p.category || 'other') === cat.key);
    if (itemsInCat.length === 0) return;

    html += `
      <section class="pm-category-section" id="catSection_${cat.key}">
        <div class="pm-category-header" onclick="toggleCategoryAccordion('${cat.key}')">
          <div class="pm-cat-header-left">
            <span class="pm-cat-title">${cat.title} (${itemsInCat.length} មុខ)</span>
            <a href="javascript:void(0)" class="pm-cat-edit-link" onclick="event.stopPropagation(); editCategoryName('${cat.key}')">កែប្រែប្រភេទ</a>
          </div>
          <svg class="pm-cat-toggle-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </div>

        <div class="pm-product-rows-container" id="rows_${cat.key}">
          ${itemsInCat.map(prod => renderProductRow(prod)).join('')}
        </div>
      </section>
    `;
  });

  catalogContainer.innerHTML = html;
}

function renderProductRow(prod) {
  const statusConfig = {
    available: { label: 'មានក្នុងស្តុក', dotClass: '', pillClass: '' },
    out: { label: 'អស់ពីស្តុក', dotClass: 'status-out', pillClass: 'status-out' },
    hidden: { label: 'លាក់ទុក', dotClass: 'status-hidden', pillClass: 'status-hidden' }
  };

  const currStatus = statusConfig[prod.status] || statusConfig.available;
  const priceFormatted = Number(prod.price || 0).toFixed(2);
  const currencyStr = prod.currency === 'SGD' ? 'SGD' : '$';

  return `
    <div class="pm-product-row" id="prodRow_${prod.id}">
      <div class="pm-row-left">
        <div class="pm-drag-handle" title="អូសដើម្បីតម្រៀបលំដាប់">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/>
            <circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/>
            <circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/>
          </svg>
        </div>

        <img src="${prod.image || 'assets/images/fertilize (1) .jpg'}" alt="${prod.name}" class="pm-prod-thumb" onerror="this.src='assets/images/ad_fertilizer.jpg'" />

        <div class="pm-prod-meta">
          <strong class="pm-prod-name">${prod.name}</strong>
          <span class="pm-prod-sku">កូដ SKU: ${prod.sku || 'N/A'} • ស្តុកនៅសល់: ${prod.stock || 0} ${prod.unit || 'បាវ'}</span>
        </div>
      </div>

      <div class="pm-row-right">
        <div class="pm-prod-price">
          ${currencyStr === '$' ? '$' + priceFormatted : priceFormatted + ' ' + currencyStr}
        </div>

        <div class="pm-status-select-wrap">
          <button class="pm-status-pill-btn ${currStatus.pillClass}" onclick="cycleProductStatus('${prod.id}')" title="ចុចដើម្បីប្តូរស្ថានភាពទំនិញ">
            <span class="pm-status-dot"></span>
            <span>${currStatus.label}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>

        <div class="pm-row-actions">
          <button class="btn-pm-action" onclick="openEditProductModal('${prod.id}')" title="កែប្រែព័ត៌មាន">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
            </svg>
          </button>
          <button class="btn-pm-action delete" onclick="deleteProduct('${prod.id}')" title="លុបទំនិញនេះ">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

// Toggle Accordion Collapse
window.toggleCategoryAccordion = function(catKey) {
  const section = document.getElementById(`catSection_${catKey}`);
  if (section) {
    section.classList.toggle('collapsed');
  }
};

// Cycle Status (Available -> Out of Stock -> Hidden -> Available)
window.cycleProductStatus = function(prodId) {
  const prod = pmProducts.find(p => p.id === prodId);
  if (!prod) return;

  const nextStatusMap = {
    available: 'out',
    out: 'hidden',
    hidden: 'available'
  };

  const statusLabelKh = {
    available: 'មានក្នុងស្តុក',
    out: 'អស់ពីស្តុក',
    hidden: 'លាក់ទុក'
  };

  prod.status = nextStatusMap[prod.status] || 'available';
  saveProductsData();

  const searchInput = document.getElementById('pmSearchInput');
  renderProductCatalog(searchInput ? searchInput.value : '');
  openToast(`បានប្តូរស្ថានភាព "${prod.name}" ទៅជា ${statusLabelKh[prod.status]}`);
};

// Search Filter
function initSearch() {
  const searchInput = document.getElementById('pmSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderProductCatalog(e.target.value);
    });
  }
}

// Add Dropdown Toggle
function initAddDropdown() {
  const btn = document.getElementById('btnAddDropdown');
  const menu = document.getElementById('pmAddDropdownMenu');

  if (btn && menu) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      menu.classList.remove('show');
    });
  }
}

// Modal: Open Add Product Modal
window.openAddProductModal = function() {
  const modal = document.getElementById('pmAddProductModal');
  const form = document.getElementById('pmProductForm');
  const modalTitle = document.getElementById('pmModalTitle');
  const editIdInput = document.getElementById('pmEditProductId');

  if (!modal) return;

  // Reset form
  if (form) form.reset();
  if (editIdInput) editIdInput.value = '';
  if (modalTitle) modalTitle.textContent = 'បញ្ចូលមុខទំនិញថ្មី';
  
  setDropzonePreview('assets/images/fertilize (1) .jpg');

  modal.classList.add('show');
};

// Modal: Open Edit Product Modal
window.openEditProductModal = function(prodId) {
  const prod = pmProducts.find(p => p.id === prodId);
  if (!prod) return;

  const modal = document.getElementById('pmAddProductModal');
  const modalTitle = document.getElementById('pmModalTitle');
  const editIdInput = document.getElementById('pmEditProductId');

  const nameInput = document.getElementById('pmNameInput');
  const catSelect = document.getElementById('pmCategorySelect');
  const skuInput = document.getElementById('pmSkuInput');
  const priceInput = document.getElementById('pmPriceInput');
  const currencySelect = document.getElementById('pmCurrencySelect');
  const stockInput = document.getElementById('pmStockInput');
  const unitSelect = document.getElementById('pmUnitSelect');
  const descInput = document.getElementById('pmDescInput');

  if (!modal) return;

  if (modalTitle) modalTitle.textContent = 'កែប្រែព័ត៌មានមុខទំនិញ';
  if (editIdInput) editIdInput.value = prod.id;

  if (nameInput) nameInput.value = prod.name;
  if (catSelect) catSelect.value = prod.category || 'fertilizer';
  if (skuInput) skuInput.value = prod.sku || '';
  if (priceInput) priceInput.value = prod.price || '';
  if (currencySelect) currencySelect.value = prod.currency || 'USD';
  if (stockInput) stockInput.value = prod.stock || 0;
  if (unitSelect) unitSelect.value = prod.unit || 'បាវ';
  if (descInput) descInput.value = prod.description || '';

  setDropzonePreview(prod.image || 'assets/images/fertilize (1) .jpg');

  modal.classList.add('show');
};

window.closePmModal = function() {
  const modal = document.getElementById('pmAddProductModal');
  modal?.classList.remove('show');
};

// Save Product Form
window.handlePmFormSubmit = function(event) {
  event.preventDefault();

  const editId = document.getElementById('pmEditProductId').value;
  const name = document.getElementById('pmNameInput').value.trim();
  const category = document.getElementById('pmCategorySelect').value;
  const sku = document.getElementById('pmSkuInput').value.trim() || `FERT-${Date.now().toString().slice(-4)}`;
  const price = Number(document.getElementById('pmPriceInput').value) || 0;
  const currency = document.getElementById('pmCurrencySelect').value || 'USD';
  const stock = Number(document.getElementById('pmStockInput').value) || 0;
  const unit = document.getElementById('pmUnitSelect').value;
  const image = document.getElementById('pmSelectedImg').value || 'assets/images/fertilize (1) .jpg';
  const description = document.getElementById('pmDescInput').value.trim();

  const catNameMap = {
    fertilizer: 'ជីកសិកម្ម',
    pesticide: 'ថ្នាំការពារដំណាំ & កម្ចាត់សត្វល្អិត',
    seeds: 'គ្រាប់ពូជដំណាំកសិកម្ម',
    booster: 'អ័រម៉ូន & ជំនួយការលូតលាស់',
    other: 'សម្ភារៈកសិកម្មផ្សេងៗ'
  };

  const today = new Date().toISOString().split('T')[0];

  if (editId) {
    // Update existing
    const idx = pmProducts.findIndex(p => p.id === editId);
    if (idx !== -1) {
      pmProducts[idx] = {
        ...pmProducts[idx],
        name,
        category,
        categoryName: catNameMap[category] || 'ទំនិញ',
        sku,
        price,
        currency,
        stock,
        unit,
        image,
        description,
        lastUpdated: today
      };
      openToast('បានកែប្រែព័ត៌មានមុខទំនិញដោយជោគជ័យ!');
    }
  } else {
    // Add new product
    const newProd = {
      id: `prod_${Date.now()}`,
      name,
      category,
      categoryName: catNameMap[category] || 'ទំនិញ',
      sku,
      price,
      currency,
      stock,
      unit,
      status: 'available',
      image,
      description,
      lastUpdated: today
    };
    pmProducts.unshift(newProd);
    openToast('បានបញ្ចូលមុខទំនិញថ្មីជោគជ័យ!');
  }

  saveProductsData();
  closePmModal();

  const searchInput = document.getElementById('pmSearchInput');
  renderProductCatalog(searchInput ? searchInput.value : '');
};

// Delete Product
window.deleteProduct = function(prodId) {
  const prod = pmProducts.find(p => p.id === prodId);
  if (!prod) return;

  if (confirm(`តើអ្នកពិតជាចង់លុបមុខទំនិញ "${prod.name}" នេះមែនទេ?`)) {
    pmProducts = pmProducts.filter(p => p.id !== prodId);
    saveProductsData();
    const searchInput = document.getElementById('pmSearchInput');
    renderProductCatalog(searchInput ? searchInput.value : '');
    openToast('បានលុបមុខទំនិញរួចរាល់');
  }
};

// Image selection helpers
window.selectPresetImg = function(src, elem) {
  document.querySelectorAll('.pm-preset-thumb').forEach(t => t.classList.remove('active'));
  elem.classList.add('active');
  setDropzonePreview(src);
};

window.setDropzonePreview = function(src) {
  const hiddenInput = document.getElementById('pmSelectedImg');
  const previewImg = document.getElementById('pmImgPreview');
  const emptyBox = document.getElementById('pmDropzoneEmpty');
  const previewBox = document.getElementById('pmDropzonePreview');

  if (hiddenInput) hiddenInput.value = src;
  if (previewImg) previewImg.src = src;

  if (src) {
    if (previewBox) previewBox.style.display = 'block';
    if (emptyBox) emptyBox.style.display = 'none';
  } else {
    if (previewBox) previewBox.style.display = 'none';
    if (emptyBox) emptyBox.style.display = 'flex';
  }
};

window.handlePmFileSelect = function(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    openToast('សូមជ្រើសរើសឯកសាររូបភាពត្រឹមត្រូវ');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(evt) {
    setDropzonePreview(evt.target.result);
    openToast('បានផ្ទុករូបភាពផលិតផលជោគជ័យ');
  };
  reader.readAsDataURL(file);
};

// Category edit prompt
window.editCategoryName = function(catKey) {
  const newName = prompt('បញ្ចូលឈ្មោះប្រភេទផលិតផលថ្មី:');
  if (newName && newName.trim()) {
    openToast(`បានកែប្រែឈ្មោះប្រភេទ: ${newName.trim()}`);
  }
};

// Sidebar collapse & responsive toggle
function initSidebar() {
  const sidebar = document.getElementById('sellerSidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.toggle('open');
      } else {
        sidebar.classList.toggle('collapsed');
      }
    });
  }
}

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

// Logout
window.logoutSeller = function() {
  localStorage.removeItem('cropwise_logged_in');
  localStorage.removeItem('cropwise_user_role');
  localStorage.removeItem('cropwise_user_email');
  window.location.replace('login.html');
};
