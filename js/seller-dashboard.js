// --- DAM EY SELLER DASHBOARD LOGIC (seller-dashboard.js) ---

// Initial Default Inventory Dataset
const DEFAULT_INVENTORY = [
  {
    id: 'prod_1',
    name: 'Bio-NPK 16-16-8 + Humic Acid',
    category: 'fertilizer',
    categoryName: 'ជីកសិកម្ម',
    sku: 'FERT-NPK16',
    stock: 210,
    maxCapacity: 300,
    unit: 'បាវ',
    price: 32.00,
    minAlert: 30,
    image: 'assets/images/ad_fertilizer.jpg',
    description: 'ជីសរីរាង្គកំហាប់ខ្ពស់ ជួយពង្រឹងដី និងជំរុញទិន្នផលដំណាំស្រូវ និងដំណាំបន្លែ',
    daysDemand: 28,
    lastUpdated: '2026-09-12'
  },
  {
    id: 'prod_2',
    name: 'ជីអ៊ុយរ៉េ កំហាប់ខ្ពស់ Urea 46-0-0',
    category: 'fertilizer',
    categoryName: 'ជីកសិកម្ម',
    sku: 'FERT-UR46',
    stock: 450,
    maxCapacity: 500,
    unit: 'បាវ',
    price: 26.50,
    minAlert: 50,
    image: 'assets/images/fertilize (1) .jpg',
    description: 'ជីអាសូតសុទ្ធ ជួយឱ្យស្លឹកខៀវបៃតងលឿន និងលូតលាស់ខ្លាំងក្នុងដំណាក់កាលដំបូង',
    daysDemand: 15,
    lastUpdated: '2026-09-10'
  },
  {
    id: 'prod_3',
    name: 'ជីសរីរាង្គកំប៉ុស្ត៍ជន្លេន ធម្មជាតិ 100%',
    category: 'fertilizer',
    categoryName: 'ជីកសិកម្ម',
    sku: 'FERT-VERM',
    stock: 190,
    maxCapacity: 250,
    unit: 'បាវ',
    price: 14.00,
    minAlert: 25,
    image: 'assets/images/fertilizer (2) .jpg',
    description: 'កំប៉ុស្ត៍ជន្លេនសម្បូរដោយមីក្រុបមានប្រយោជន៍ និងបង្កើនសំណើមដី',
    daysDemand: 35,
    lastUpdated: '2026-09-08'
  },
  {
    id: 'prod_4',
    name: 'Neem Bio-Defense Spray (ចំរាញ់ចេញពីប្រេងស្តៅ)',
    category: 'pesticide',
    categoryName: 'ថ្នាំការពារដំណាំ',
    sku: 'PEST-NEEM1L',
    stock: 95,
    maxCapacity: 150,
    unit: 'ដប',
    price: 12.50,
    minAlert: 20,
    image: 'assets/images/ad_seeds.jpg',
    description: 'ថ្នាំសរីរាង្គកម្ចាត់ចៃ មមាច និងដង្កូវស៊ីស្លឹក គ្មានជាតិពុលដល់អ្នកប្រើប្រាស់',
    daysDemand: 45,
    lastUpdated: '2026-09-11'
  },
  {
    id: 'prod_5',
    name: 'ថ្នាំកម្ចាត់ដង្កូវហ្វូងជីវសាស្ត្រ Bio-Bt Defense',
    category: 'pesticide',
    categoryName: 'ថ្នាំការពារដំណាំ',
    sku: 'PEST-BT500',
    stock: 165,
    maxCapacity: 200,
    unit: 'ដប',
    price: 16.00,
    minAlert: 30,
    image: 'assets/images/fertilize (3) .jpg',
    description: 'ថ្នាំជីវសាស្ត្របាក់តេរី Bacillus Thuringiensis កម្ចាត់ដង្កូវហ្វូង និងដង្កូវរូងដើម',
    daysDemand: 22,
    lastUpdated: '2026-09-09'
  },
  {
    id: 'prod_6',
    name: 'ថ្នាំកម្ចាត់ផ្សិតស្លឹកទង់ដែង Copper Fungicide',
    category: 'pesticide',
    categoryName: 'ថ្នាំការពារដំណាំ',
    sku: 'PEST-COP1K',
    stock: 80,
    maxCapacity: 120,
    unit: 'កញ្ចប់',
    price: 18.50,
    minAlert: 15,
    image: 'assets/images/ad_soil_test.jpg',
    description: 'ការពារ និងកម្ចាត់ជំងឺស្លឹកឆេះ អុចស្លឹក និងរលួយឫសលើដំណាំបន្លែ',
    daysDemand: 30,
    lastUpdated: '2026-09-05'
  },
  {
    id: 'prod_7',
    name: 'គ្រាប់ពូជស្រូវផ្ការំដួលសុទ្ធ Phka Rumduol Grade A',
    category: 'seeds',
    categoryName: 'គ្រាប់ពូជដំណាំ',
    sku: 'SEED-RMD50',
    stock: 110,
    maxCapacity: 150,
    unit: 'បាវ',
    price: 22.00,
    minAlert: 20,
    image: 'assets/images/ad_fertilizer.jpg',
    description: 'គ្រាប់ពូជស្រូវក្រអូបគុណភាពខ្ពស់ ដំណុះ ៩៨% ធន់នឹងជំងឺ និងទិន្នផលខ្ពស់',
    daysDemand: 18,
    lastUpdated: '2026-09-13'
  },
  {
    id: 'prod_8',
    name: 'គ្រាប់ពូជប៉េងប៉ោះ F1 King Hybrid',
    category: 'seeds',
    categoryName: 'គ្រាប់ពូជដំណាំ',
    sku: 'SEED-TOM-F1',
    stock: 45,
    maxCapacity: 80,
    unit: 'កញ្ចប់',
    price: 6.50,
    minAlert: 15,
    image: 'assets/images/ad_seeds.jpg',
    description: 'ពូជប៉េងប៉ោះផ្លែធំ សាច់ក្រាស់ ធន់នឹងអាកាសធាតុក្តៅ និងដឹកជញ្ជូនឆ្ងាយ',
    daysDemand: 25,
    lastUpdated: '2026-09-07'
  },
  {
    id: 'prod_9',
    name: 'គ្រាប់ពូជម្ទេសដៃនាងខ្មែរ Birds Eye Chilli',
    category: 'seeds',
    categoryName: 'គ្រាប់ពូជដំណាំ',
    sku: 'SEED-CHL100',
    stock: 25,
    maxCapacity: 60,
    unit: 'កញ្ចប់',
    price: 5.00,
    minAlert: 10,
    image: 'assets/images/ad_fertilizer.jpg',
    description: 'ពូជម្ទេសហឹរខ្លាំង ក្តាប់ផ្លែច្រើន ធន់នឹងការរុះផ្កា',
    daysDemand: 40,
    lastUpdated: '2026-09-04'
  },
  {
    id: 'prod_10',
    name: 'Root & Flower Booster Hormones (អ័រម៉ូនជំនួយឫស & ផ្កា)',
    category: 'booster',
    categoryName: 'ជំនួយលូតលាស់',
    sku: 'BOOST-RT500',
    stock: 18,
    maxCapacity: 100,
    unit: 'ដប',
    price: 9.50,
    minAlert: 20,
    image: 'assets/images/ad_soil_test.jpg',
    description: 'អ័រម៉ូនរំញោចការបែកឫសថ្មី បង្កើនការចេញផ្កា និងទប់ស្កាត់ការជ្រុះផ្លែក្តឹប',
    daysDemand: 12,
    lastUpdated: '2026-09-12'
  },
  {
    id: 'prod_11',
    name: 'សារធាតុចិញ្ចឹមបាញ់ស្លឹក Foliar Seaweed Extract',
    category: 'booster',
    categoryName: 'ជំនួយលូតលាស់',
    sku: 'BOOST-SW1L',
    stock: 102,
    maxCapacity: 120,
    unit: 'ដប',
    price: 15.00,
    minAlert: 20,
    image: 'assets/images/fertilize (1) .jpg',
    description: 'ចំរាញ់ពីសារ៉ាយសមុទ្រធម្មជាតិ ជួយឱ្យរុក្ខជាតិស្រូបយកជីបានលឿន និងធន់នឹងគ្រោះរាំងស្ងួត',
    daysDemand: 30,
    lastUpdated: '2026-09-10'
  }
];

// Current State
let sellerInventory = [];
let currentCategoryFilter = 'all';

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initInventoryData();
  initSidebar();
  initCharts();
  renderInventoryView();
  renderDashboardQuickStock();

  // Check URL hash for initial tab route (e.g. #inventory)
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    switchSellerView(hash);
  }
});

// Load Inventory from LocalStorage or Default
function initInventoryData() {
  try {
    const saved = localStorage.getItem('cropwise_seller_inventory');
    if (saved) {
      sellerInventory = JSON.parse(saved);
    } else {
      sellerInventory = [...DEFAULT_INVENTORY];
      saveInventoryToStorage();
    }
  } catch (err) {
    console.error('Error loading inventory:', err);
    sellerInventory = [...DEFAULT_INVENTORY];
  }
}

function saveInventoryToStorage() {
  try {
    localStorage.setItem('cropwise_seller_inventory', JSON.stringify(sellerInventory));
  } catch (err) {
    console.error('Error saving inventory:', err);
  }
}

// Sidebar Collapse / Toggle
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

// View Routing Engine
window.switchSellerView = function (viewName, event) {
  if (event) event.preventDefault();

  const viewIdMap = {
    dashboard: 'viewDashboard',
    inventory: 'viewInventory',
    sales: 'viewSales',
    demand: 'viewDemand',
    farmers: 'viewFarmers',
    settings: 'viewSettings'
  };

  const titlesMap = {
    dashboard: { title: 'ផ្ទាំងវិភាគអ្នកផ្គត់ផ្គង់', sub: 'ស្វាគមន៍មកកាន់ Kandal Agri-Center' },
    inventory: { title: 'គ្រប់គ្រងស្តុកផលិតផល (Inventory)', sub: 'តាមដានបរិមាណជី ថ្នាំ ពូជ និងការបំពេញបន្ថែមស្តុកទំនិញ' },
    sales: { title: 'ការលក់ & សំណួរពីកសិករ', sub: 'របាយការណ៍បញ្ជាទិញ និងការផ្គូផ្គងសំណូមពរ' },
    demand: { title: 'តម្រូវការដំណាំក្នុងតំបន់', sub: 'ស្ថិតិតម្រូវការជី និងថ្នាំតាមរដូវកាល' },
    farmers: { title: 'បណ្តាញអតិថិជនកសិករ', sub: 'ទិន្នន័យកសិករក្នុងតំបន់សកម្ម' },
    settings: { title: 'ការកំណត់ហាង & ប្រព័ន្ធ', sub: 'គ្រប់គ្រងព័ត៌មានទូទៅ និងទំនាក់ទំនង' }
  };

  const targetViewId = viewIdMap[viewName] || 'viewDashboard';

  // Update Navigation Active State
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-view') === viewName) {
      link.classList.add('active');
    }
  });

  // Toggle View Sections
  document.querySelectorAll('.seller-view-section').forEach(section => {
    if (section.id === targetViewId) {
      section.classList.remove('hidden-view');
    } else {
      section.classList.add('hidden-view');
    }
  });

  // Update Page Title
  const pageTitle = document.getElementById('pageMainTitle');
  const pageSub = document.getElementById('pageSubTitle');
  if (pageTitle && titlesMap[viewName]) {
    pageTitle.textContent = titlesMap[viewName].title;
    pageSub.textContent = titlesMap[viewName].sub;
  }

  // Update URL Hash without reload
  if (window.history && window.history.replaceState) {
    window.history.replaceState(null, null, `#${viewName}`);
  }

  // If switched to inventory or dashboard, refresh data
  if (viewName === 'inventory') {
    renderInventoryView();
  } else if (viewName === 'dashboard') {
    renderDashboardQuickStock();
  }

  // Close sidebar on mobile
  if (window.innerWidth <= 768) {
    const sidebar = document.getElementById('sellerSidebar');
    sidebar?.classList.remove('open');
  }
};

// --- INVENTORY MANAGEMENT ENGINE ---

// Render the Entire Inventory View (Cards, Counters & Table)
function renderInventoryView() {
  updateInventorySummaries();
  applyInventoryFilters();
}

// Calculate Summary Cards & Counters
function updateInventorySummaries() {
  let totalUnits = 0;
  let totalFertilizerUnits = 0, fertCount = 0;
  let totalPesticideUnits = 0, pestCount = 0;
  let totalSeedsUnits = 0, seedCount = 0;
  let totalBoosterUnits = 0, boostCount = 0;
  let totalValuation = 0;

  sellerInventory.forEach(item => {
    const qty = Number(item.stock) || 0;
    const price = Number(item.price) || 0;
    totalUnits += qty;
    totalValuation += qty * price;

    if (item.category === 'fertilizer') {
      totalFertilizerUnits += qty;
      fertCount++;
    } else if (item.category === 'pesticide') {
      totalPesticideUnits += qty;
      pestCount++;
    } else if (item.category === 'seeds') {
      totalSeedsUnits += qty;
      seedCount++;
    } else if (item.category === 'booster') {
      totalBoosterUnits += qty;
      boostCount++;
    }
  });

  // Update Summary Cards
  setText('summaryTotalUnits', `${totalUnits.toLocaleString()} ឯកតា`);
  setText('summaryTotalSkus', `${sellerInventory.length} មុខទំនិញ`);

  setText('summaryFertilizerUnits', `${totalFertilizerUnits.toLocaleString()} បាវ`);
  setText('summaryFertilizerSkus', `${fertCount} មុខទំនិញ`);

  setText('summaryPesticideUnits', `${totalPesticideUnits.toLocaleString()} ដប`);
  setText('summaryPesticideSkus', `${pestCount} មុខទំនិញ`);

  setText('summarySeedsUnits', `${totalSeedsUnits.toLocaleString()} ឯកតា`);
  setText('summarySeedsSkus', `${seedCount} មុខទំនិញ`);

  setText('summaryBoosterUnits', `${totalBoosterUnits.toLocaleString()} ដប`);
  setText('summaryBoosterSkus', `${boostCount} មុខទំនិញ`);

  // Update Tab Pills Count
  setText('tabCountAll', sellerInventory.length);
  setText('tabCountFertilizer', fertCount);
  setText('tabCountPesticide', pestCount);
  setText('tabCountSeeds', seedCount);
  setText('tabCountBooster', boostCount);

  // Total valuation
  setText('totalInventoryValue', `$${totalValuation.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// Category Filter Switcher
window.filterByCategory = function (category) {
  currentCategoryFilter = category;

  // Update Active Category Cards
  const cards = {
    all: 'catCardAll',
    fertilizer: 'catCardFertilizer',
    pesticide: 'catCardPesticide',
    seeds: 'catCardSeeds',
    booster: 'catCardBooster'
  };

  Object.keys(cards).forEach(key => {
    const card = document.getElementById(cards[key]);
    if (card) {
      if (key === category) card.classList.add('active-filter');
      else card.classList.remove('active-filter');
    }
  });

  // Update Pill Tabs
  document.querySelectorAll('.inv-pill-tab').forEach(tab => {
    if (tab.getAttribute('data-cat') === category) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  applyInventoryFilters();
};

// Filter & Search Logic
window.applyInventoryFilters = function () {
  const searchInput = document.getElementById('invSearchInput');
  const statusFilter = document.getElementById('invStatusFilter');
  const sortFilter = document.getElementById('invSortFilter');

  const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
  const statusVal = statusFilter ? statusFilter.value : 'all';
  const sortVal = sortFilter ? sortFilter.value : 'stock-desc';

  let filtered = sellerInventory.filter(item => {
    // 1. Category filter
    if (currentCategoryFilter !== 'all' && item.category !== currentCategoryFilter) {
      return false;
    }

    // 2. Search query filter
    if (searchTerm) {
      const matchName = item.name.toLowerCase().includes(searchTerm);
      const matchSku = (item.sku || '').toLowerCase().includes(searchTerm);
      const matchCat = (item.categoryName || '').toLowerCase().includes(searchTerm);
      if (!matchName && !matchSku && !matchCat) return false;
    }

    // 3. Status level filter
    const status = getStockStatusInfo(item.stock, item.minAlert, item.maxCapacity).statusKey;
    if (statusVal !== 'all' && status !== statusVal) {
      return false;
    }

    return true;
  });

  // 4. Sort Items
  filtered.sort((a, b) => {
    if (sortVal === 'stock-desc') return b.stock - a.stock;
    if (sortVal === 'stock-asc') return a.stock - b.stock;
    if (sortVal === 'price-desc') return b.price - a.price;
    if (sortVal === 'price-asc') return a.price - b.price;
    if (sortVal === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  renderInventoryTable(filtered);
};

// Determine Status Badge & Progress Percentage
function getStockStatusInfo(stock, minAlert = 20, maxCapacity = 200) {
  const current = Number(stock) || 0;
  const min = Number(minAlert) || 20;
  const max = Number(maxCapacity) || 200;
  const percentage = Math.min(100, Math.max(0, Math.round((current / max) * 100)));

  if (current <= 0) {
    return {
      statusKey: 'out',
      label: 'អស់ពីស្តុក',
      chipClass: 'chip-red',
      barClass: 'bar-red',
      percentage: 0
    };
  } else if (current <= min) {
    return {
      statusKey: 'low',
      label: 'ស្តុកជិតអស់',
      chipClass: 'chip-red',
      barClass: 'bar-red',
      percentage: Math.max(10, percentage)
    };
  } else if (percentage <= 45) {
    return {
      statusKey: 'medium',
      label: 'ស្តុកមធ្យម',
      chipClass: 'chip-amber',
      barClass: 'bar-amber',
      percentage: percentage
    };
  } else {
    return {
      statusKey: 'high',
      label: 'ស្តុកគ្រប់គ្រាន់',
      chipClass: 'chip-green',
      barClass: 'bar-green',
      percentage: percentage
    };
  }
}

// Render Table Rows
function renderInventoryTable(items) {
  const tbody = document.getElementById('inventoryTableBody');
  const emptyState = document.getElementById('invEmptyState');
  const countBadge = document.getElementById('displayedProductsCount');

  if (countBadge) countBadge.textContent = items.length;

  if (!tbody) return;

  if (items.length === 0) {
    tbody.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  const categoryBadgeClassMap = {
    fertilizer: 'cat-fertilizer',
    pesticide: 'cat-pesticide',
    seeds: 'cat-seeds',
    booster: 'cat-booster',
    other: 'cat-other'
  };

  tbody.innerHTML = items.map(item => {
    const statusInfo = getStockStatusInfo(item.stock, item.minAlert, item.maxCapacity);
    const totalRowVal = (Number(item.stock) * Number(item.price)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const catClass = categoryBadgeClassMap[item.category] || 'cat-other';

    return `
      <tr>
        <td>
          <div class="inv-prod-cell">
            <img src="${item.image || 'assets/images/ad_fertilizer.jpg'}" alt="${item.name}" class="inv-prod-img" onerror="this.src='assets/images/ad_fertilizer.jpg'" />
            <div class="inv-prod-details">
              <strong class="inv-prod-name">${item.name}</strong>
              <div class="inv-prod-meta">
                <span class="inv-sku-tag">${item.sku || 'SKU-GEN'}</span>
                <span>• បច្ចុប្បន្នភាព: ${item.lastUpdated || 'ថ្មីៗ'}</span>
              </div>
            </div>
          </div>
        </td>
        <td>
          <span class="inv-cat-badge ${catClass}">
            ${item.categoryName || 'ទំនិញ'}
          </span>
        </td>
        <td>
          <div class="inv-stock-cell">
            <div class="inv-stock-num">
              <span>${item.stock} ${item.unit || 'ឯកតា'}</span>
              <span style="font-size: 10.5px; color: #728c79;">(${statusInfo.percentage}%)</span>
            </div>
            <div class="inv-stock-bar-wrap">
              <div class="inv-stock-bar-fill ${statusInfo.barClass}" style="width: ${statusInfo.percentage}%;"></div>
            </div>
          </div>
        </td>
        <td>
          <strong style="color: #164223;">$${Number(item.price).toFixed(2)}</strong>
          <span style="font-size: 11px; color: #6a8572; display: block;">ក្នុង 1 ${item.unit}</span>
        </td>
        <td>
          <strong style="color: #14381d; font-size: 13.5px;">$${totalRowVal}</strong>
        </td>
        <td>
          <span class="status-chip ${statusInfo.chipClass}">${statusInfo.label}</span>
        </td>
        <td style="text-align: right;">
          <div class="inv-actions-cell" style="justify-content: flex-end;">
            <button class="btn-act-restock" onclick="openQuickRestock('${item.id}')" title="បន្ថែមចំនួនស្តុក">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              <span>ស្តុក</span>
            </button>
            <button class="btn-act-edit" onclick="openAddStockModal('${item.id}')" title="កែប្រែព័ត៌មាន">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
              </svg>
            </button>
            <button class="btn-act-delete" onclick="deleteStockProduct('${item.id}')" title="លុបទំនិញ">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// Render Dashboard Quick Stock Table (Top 3 items)
function renderDashboardQuickStock() {
  const tbody = document.getElementById('dashboardQuickStockBody');
  if (!tbody) return;

  const previewItems = sellerInventory.slice(0, 3);
  tbody.innerHTML = previewItems.map(item => {
    const statusInfo = getStockStatusInfo(item.stock, item.minAlert, item.maxCapacity);
    const isUrgent = statusInfo.statusKey === 'low' || statusInfo.statusKey === 'out';

    return `
      <tr>
        <td>
          <div class="table-prod-cell">
            <img src="${item.image || 'assets/images/ad_fertilizer.jpg'}" alt="${item.name}" class="table-thumb" />
            <div>
              <strong class="prod-table-title">${item.name}</strong>
              <span class="prod-table-sub">${item.categoryName} • ${item.unit}</span>
            </div>
          </div>
        </td>
        <td><strong>${item.stock} ${item.unit}</strong></td>
        <td>${item.daysDemand || 30} ថ្ងៃ</td>
        <td><span class="status-chip ${statusInfo.chipClass}">${statusInfo.label}</span></td>
        <td>
          <button class="btn-table-act ${isUrgent ? 'btn-urgent' : ''}" onclick="openQuickRestock('${item.id}')">
            ${isUrgent ? 'កម្ម៉ង់បន្ទាន់' : 'បន្ថែមស្តុក'}
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// --- ADD / EDIT STOCK MODAL LOGIC ---

window.openAddStockModal = function (productId = null) {
  const modal = document.getElementById('addStockModal');
  const formTitle = document.getElementById('modalFormTitle');
  const submitBtn = document.getElementById('modalSubmitBtn');
  const editIdInput = document.getElementById('editProductId');

  const nameInput = document.getElementById('prodNameInput');
  const catSelect = document.getElementById('prodCategorySelect');
  const skuInput = document.getElementById('prodSkuInput');
  const stockInput = document.getElementById('prodStockInput');
  const unitSelect = document.getElementById('prodUnitSelect');
  const priceInput = document.getElementById('prodPriceInput');
  const minAlertInput = document.getElementById('prodMinAlertInput');
  const descInput = document.getElementById('prodDescInput');
  const selectedImgInput = document.getElementById('selectedImgSrc');

  if (!modal) return;

  if (productId) {
    // Edit Mode
    const item = sellerInventory.find(p => p.id === productId);
    if (!item) return;

    formTitle.textContent = 'កែប្រែព័ត៌មានស្តុកផលិតផល';
    if (submitBtn) submitBtn.querySelector('span').textContent = 'រក្សាទុកការកែប្រែ';
    editIdInput.value = item.id;

    nameInput.value = item.name;
    catSelect.value = item.category;
    skuInput.value = item.sku || '';
    stockInput.value = item.stock;
    unitSelect.value = item.unit || 'បាវ';
    priceInput.value = item.price;
    minAlertInput.value = item.minAlert || 20;
    descInput.value = item.description || '';
    selectedImgInput.value = item.image || 'assets/images/ad_fertilizer.jpg';

    // Update dropzone preview
    setModalImagePreview(item.image || 'assets/images/ad_fertilizer.jpg');

  } else {
    // Create Mode
    formTitle.textContent = 'បញ្ចូលទំនិញក្នុងស្តុកថ្មី';
    if (submitBtn) submitBtn.querySelector('span').textContent = 'រក្សាទុកចូលស្តុក';
    editIdInput.value = '';

    document.getElementById('stockProductForm')?.reset();
    selectedImgInput.value = 'assets/images/ad_fertilizer.jpg';
    setModalImagePreview(null); // Shows the SVG icon dropzone box by default
  }

  modal.classList.add('show');
};

window.closeAddStockModal = function () {
  const modal = document.getElementById('addStockModal');
  modal?.classList.remove('show');
};

// Update Modal Image Preview
window.setModalImagePreview = function(src) {
  const previewTarget = document.getElementById('imgPreviewTarget');
  const previewBox = document.getElementById('dropzonePreview');
  const emptyBox = document.getElementById('dropzoneEmpty');
  const hiddenInput = document.getElementById('selectedImgSrc');

  if (src) {
    if (hiddenInput) hiddenInput.value = src;
    if (previewTarget) previewTarget.src = src;
    if (previewBox) previewBox.style.display = 'flex';
    if (emptyBox) emptyBox.style.display = 'none';
  } else {
    if (previewBox) previewBox.style.display = 'none';
    if (emptyBox) emptyBox.style.display = 'flex';
  }
};

window.selectPresetImage = function (imgElement) {
  document.querySelectorAll('.preset-img-option').forEach(img => img.classList.remove('selected'));
  imgElement.classList.add('selected');
  const src = imgElement.getAttribute('data-src');
  setModalImagePreview(src);
};

// Drag & Drop Image Handling
window.handleDragOver = function(event) {
  event.preventDefault();
  event.stopPropagation();
  const dropzone = document.getElementById('imgDropzone');
  dropzone?.classList.add('drag-active');
};

window.handleDragLeave = function(event) {
  event.preventDefault();
  event.stopPropagation();
  const dropzone = document.getElementById('imgDropzone');
  dropzone?.classList.remove('drag-active');
};

window.handleDropImage = function(event) {
  event.preventDefault();
  event.stopPropagation();
  const dropzone = document.getElementById('imgDropzone');
  dropzone?.classList.remove('drag-active');

  const files = event.dataTransfer?.files;
  if (files && files.length > 0) {
    processImageFile(files[0]);
  }
};

window.handleFileSelect = function(event) {
  const files = event.target.files;
  if (files && files.length > 0) {
    processImageFile(files[0]);
  }
};

function processImageFile(file) {
  if (!file.type.startsWith('image/')) {
    openToast('សូមជ្រើសរើសឯកសាររូបភាពត្រឹមត្រូវ (PNG, JPG, etc.)');
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    openToast('ទំហំរូបភាពមិនត្រូវលើសពី 5MB ឡើយ');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const base64Data = e.target.result;
    setModalImagePreview(base64Data);
    // Deselect preset options
    document.querySelectorAll('.preset-img-option').forEach(img => img.classList.remove('selected'));
    openToast('បានផ្ទុករូបភាពផលិតផលដោយជោគជ័យ!');
  };
  reader.readAsDataURL(file);
}

// Handle Save Stock Item (Create or Update)
window.handleSaveStockProduct = function (event) {
  event.preventDefault();

  const editId = document.getElementById('editProductId').value;
  const name = document.getElementById('prodNameInput').value.trim();
  const category = document.getElementById('prodCategorySelect').value;
  const sku = document.getElementById('prodSkuInput').value.trim() || `SKU-${Date.now().toString().slice(-4)}`;
  const stock = Number(document.getElementById('prodStockInput').value) || 0;
  const unit = document.getElementById('prodUnitSelect').value;
  const price = Number(document.getElementById('prodPriceInput').value) || 0;
  const minAlert = Number(document.getElementById('prodMinAlertInput').value) || 20;
  const image = document.getElementById('selectedImgSrc').value || 'assets/images/ad_fertilizer.jpg';
  const description = document.getElementById('prodDescInput').value.trim();

  const categoryNames = {
    fertilizer: 'ជីកសិកម្ម',
    pesticide: 'ថ្នាំការពារដំណាំ',
    seeds: 'គ្រាប់ពូជដំណាំ',
    booster: 'ជំនួយលូតលាស់',
    other: 'ផ្សេងៗ'
  };

  const today = new Date().toISOString().split('T')[0];

  if (editId) {
    // Update existing item
    const index = sellerInventory.findIndex(p => p.id === editId);
    if (index !== -1) {
      sellerInventory[index] = {
        ...sellerInventory[index],
        name,
        category,
        categoryName: categoryNames[category] || 'ទំនិញ',
        sku,
        stock,
        unit,
        price,
        minAlert,
        image,
        description,
        lastUpdated: today
      };
      openToast('បានកែប្រែទិន្នន័យស្តុកផលិតផលជោគជ័យ!');
    }
  } else {
    // Add new product
    const newProduct = {
      id: `prod_${Date.now()}`,
      name,
      category,
      categoryName: categoryNames[category] || 'ទំនិញ',
      sku,
      stock,
      maxCapacity: Math.max(stock * 1.5, 100),
      unit,
      price,
      minAlert,
      image,
      description,
      daysDemand: 30,
      lastUpdated: today
    };
    sellerInventory.unshift(newProduct);
    openToast('បានបញ្ចូលទំនិញថ្មីក្នុងស្តុកជោគជ័យ!');
  }

  saveInventoryToStorage();
  closeAddStockModal();
  renderInventoryView();
  renderDashboardQuickStock();
};

// --- QUICK RESTOCK MODAL LOGIC ---

window.openQuickRestock = function (productId) {
  const item = sellerInventory.find(p => p.id === productId);
  if (!item) return;

  const modal = document.getElementById('quickRestockModal');
  const idInput = document.getElementById('quickRestockProdId');
  const titleEl = document.getElementById('quickRestockTitle');
  const currentEl = document.getElementById('quickRestockCurrent');
  const unitLabel = document.getElementById('quickRestockUnitLabel');
  const imgEl = document.getElementById('quickRestockImg');
  const qtyInput = document.getElementById('quickRestockQty');

  if (!modal) return;

  idInput.value = item.id;
  titleEl.textContent = item.name;
  currentEl.textContent = `ស្តុកបច្ចុប្បន្ន: ${item.stock} ${item.unit}`;
  unitLabel.textContent = item.unit;
  imgEl.src = item.image || 'assets/images/ad_fertilizer.jpg';
  qtyInput.value = '';

  modal.classList.add('show');
  setTimeout(() => qtyInput.focus(), 100);
};

window.closeQuickRestockModal = function () {
  const modal = document.getElementById('quickRestockModal');
  modal?.classList.remove('show');
};

window.setQuickRestockAmount = function (amount) {
  const qtyInput = document.getElementById('quickRestockQty');
  if (qtyInput) qtyInput.value = amount;
};

window.handleQuickRestockSubmit = function (event) {
  event.preventDefault();

  const prodId = document.getElementById('quickRestockProdId').value;
  const addQty = Number(document.getElementById('quickRestockQty').value) || 0;

  if (addQty <= 0) {
    openToast('សូមបញ្ចូលចំនួនស្តុកដែលត្រូវបន្ថែម');
    return;
  }

  const index = sellerInventory.findIndex(p => p.id === prodId);
  if (index !== -1) {
    sellerInventory[index].stock += addQty;
    if (sellerInventory[index].stock > sellerInventory[index].maxCapacity) {
      sellerInventory[index].maxCapacity = sellerInventory[index].stock + 50;
    }
    sellerInventory[index].lastUpdated = new Date().toISOString().split('T')[0];

    saveInventoryToStorage();
    closeQuickRestockModal();
    renderInventoryView();
    renderDashboardQuickStock();
    openToast(`បានបន្ថែម ${addQty} ${sellerInventory[index].unit} ចូលស្តុក ${sellerInventory[index].name}!`);
  }
};

// Delete Product
window.deleteStockProduct = function (productId) {
  const item = sellerInventory.find(p => p.id === productId);
  if (!item) return;

  const confirmDelete = confirm(`តើអ្នកពិតជាចង់លុប "${item.name}" ចេញពីស្តុកមែនទេ?`);
  if (!confirmDelete) return;

  sellerInventory = sellerInventory.filter(p => p.id !== productId);
  saveInventoryToStorage();
  renderInventoryView();
  renderDashboardQuickStock();
  openToast(`បានលុប "${item.name}" ចេញពីស្តុក`);
};

// Export CSV Report
window.exportInventoryReport = function () {
  if (!sellerInventory || sellerInventory.length === 0) {
    openToast('មិនមានទិន្នន័យសម្រាប់នាំចេញទេ');
    return;
  }

  let csvContent = 'data:text/csv;charset=utf-8,';
  csvContent += 'ID,Product Name,Category,SKU,Stock Quantity,Unit,Price (USD),Total Value (USD),Status,Last Updated\n';

  sellerInventory.forEach(item => {
    const status = getStockStatusInfo(item.stock, item.minAlert, item.maxCapacity).label;
    const totalVal = (Number(item.stock) * Number(item.price)).toFixed(2);
    const row = [
      `"${item.id}"`,
      `"${item.name.replace(/"/g, '""')}"`,
      `"${item.categoryName}"`,
      `"${item.sku || ''}"`,
      item.stock,
      `"${item.unit}"`,
      item.price.toFixed(2),
      totalVal,
      `"${status}"`,
      `"${item.lastUpdated || ''}"`
    ].join(',');
    csvContent += row + '\n';
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Dam_Ey_Inventory_Report_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  openToast('បានទាញយករាយការណ៍ស្តុកជាទម្រង់ CSV!');
};

// --- ANALYTICS CHARTS INITIALIZATION ---
function initCharts() {
  // 1. REVENUE & INQUIRIES LINE CHART BY YEAR
  const YEAR_REVENUE_DATA = {
    '2026': {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      revenue: [3200, 4800, 7500, 6900, 10200, 12400, 13800, 14850],
      inquiries: [80, 110, 160, 145, 210, 260, 290, 312],
      sub: 'ប្រៀបធៀបប្រាក់ចំណូល និងចំនួនសំណើទិញពីកសិករ (ឆ្នាំ 2026)'
    },
    '2025': {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      revenue: [2100, 2800, 4200, 5100, 6800, 8400, 9200, 10500, 11200, 11800, 12600, 13400],
      inquiries: [45, 60, 95, 110, 140, 175, 190, 220, 240, 255, 270, 290],
      sub: 'ប្រៀបធៀបប្រាក់ចំណូល និងចំនួនសំណើទិញពីកសិករ (ឆ្នាំ 2025)'
    },
    '2024': {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      revenue: [1200, 1600, 2400, 3100, 3900, 4800, 5600, 6400, 7100, 7800, 8200, 8900],
      inquiries: [25, 35, 55, 70, 85, 105, 120, 140, 155, 170, 180, 195],
      sub: 'ប្រៀបធៀបប្រាក់ចំណូល និងចំនួនសំណើទិញពីកសិករ (ឆ្នាំ 2024)'
    }
  };

  const revenueCtx = document.getElementById('revenueChart');
  let revenueChartInstance = null;

  if (revenueCtx) {
    const ctx = revenueCtx.getContext('2d');
    const gradientGreen = ctx.createLinearGradient(0, 0, 0, 260);
    gradientGreen.addColorStop(0, 'rgba(27, 99, 46, 0.35)');
    gradientGreen.addColorStop(1, 'rgba(27, 99, 46, 0.01)');

    revenueChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: YEAR_REVENUE_DATA['2026'].labels,
        datasets: [
          {
            label: 'Revenue ($)',
            data: YEAR_REVENUE_DATA['2026'].revenue,
            borderColor: '#1b632e',
            borderWidth: 3,
            backgroundColor: gradientGreen,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#1b632e',
            pointRadius: 4,
            pointHoverRadius: 7
          },
          {
            label: 'Inquiries (Count)',
            data: YEAR_REVENUE_DATA['2026'].inquiries,
            borderColor: '#0284c7',
            borderWidth: 2,
            borderDash: [5, 5],
            fill: false,
            tension: 0.4,
            pointBackgroundColor: '#0284c7',
            pointRadius: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: '#15381e',
            titleFont: { family: 'Siemreap', size: 12 },
            bodyFont: { family: 'Plus Jakarta Sans', size: 12 },
            padding: 10,
            cornerRadius: 10
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#637a6b', font: { family: 'Plus Jakarta Sans', size: 11 } }
          },
          y: {
            grid: { color: '#eef4f0' },
            ticks: {
              color: '#637a6b',
              font: { family: 'Plus Jakarta Sans', size: 11 },
              callback: (val) => '$' + val.toLocaleString()
            }
          }
        }
      }
    });
  }

  // Revenue Year Switcher
  window.changeRevenueYear = function (yearKey) {
    const yearData = YEAR_REVENUE_DATA[yearKey] || YEAR_REVENUE_DATA['2026'];
    const subElem = document.getElementById('revenueChartSub');
    if (subElem) subElem.textContent = yearData.sub;

    if (revenueChartInstance) {
      revenueChartInstance.data.labels = yearData.labels;
      revenueChartInstance.data.datasets[0].data = yearData.revenue;
      revenueChartInstance.data.datasets[1].data = yearData.inquiries;
      revenueChartInstance.update();
      openToast(`បានផ្លាស់ប្តូរទិន្នន័យកំណើនចំណូលទៅកាន់៖ ឆ្នាំ ${yearKey}`);
    }
  };

  // 2. CROP DEMAND DONUT CHART BY PROVINCE
  const PROVINCE_CROP_DATA = {
    kandal: {
      sub: 'ភាគរយដំណាំដែលកសិករធ្វើតេស្តក្នុងខេត្តកណ្តាល',
      labels: ['ស្រូវ (35%)', 'ប៉េងប៉ោះ (28%)', 'ពោត (20%)', 'ម្ទេស (10%)', 'ដំឡូងមី (7%)'],
      data: [35, 28, 20, 10, 7]
    },
    battambang: {
      sub: 'ភាគរយដំណាំដែលកសិករធ្វើតេស្តក្នុងខេត្តបាត់ដំបង',
      labels: ['ស្រូវផ្ការំដួល (45%)', 'ពោតក្រហម (25%)', 'សណ្តែកសៀង (15%)', 'ក្រូចពោធិ៍សាត់ (10%)', 'ផ្សេងៗ (5%)'],
      data: [45, 25, 15, 10, 5]
    },
    takeo: {
      sub: 'ភាគរយដំណាំដែលកសិករធ្វើតេស្តក្នុងខេត្តតាកែវ',
      labels: ['ស្រូវប្រាំង (40%)', 'ត្រសក់ផ្អែម (22%)', 'ស្ពៃក្តោប (18%)', 'ឪឡឹក (12%)', 'ម្ទេស (8%)'],
      data: [40, 22, 18, 12, 8]
    },
    kampong_cham: {
      sub: 'ភាគរយដំណាំដែលកសិករធ្វើតេស្តក្នុងខេត្តកំពង់ចាម',
      labels: ['ដំឡូងមី (32%)', 'ចេកអំបូងលឿង (26%)', 'ស្វាយចន្ទី (20%)', 'សណ្តែកដី (14%)', 'ពោត (8%)'],
      data: [32, 26, 20, 14, 8]
    },
    siem_reap: {
      sub: 'ភាគរយដំណាំដែលកសិករធ្វើតេស្តក្នុងខេត្តសៀមរាប',
      labels: ['ស្រូវសរីរាង្គ (36%)', 'បន្លែផ្ទះសំណាញ់ (28%)', 'ផ្កាម្លិះ/ផ្កាឈូក (16%)', 'ត្រសក់ (12%)', 'ម្ទេស (8%)'],
      data: [36, 28, 16, 12, 8]
    },
    all: {
      sub: 'ភាគរយដំណាំដែលកសិករធ្វើតេស្តទូទាំងប្រទេសកម្ពុជា',
      labels: ['ស្រូវ (38%)', 'ដំឡូងមី (22%)', 'ពោត (18%)', 'បន្លែស្លឹក & ផ្លែ (14%)', 'ដំណាំឈើហូបផ្លែ (8%)'],
      data: [38, 22, 18, 14, 8]
    }
  };

  const cropDemandCtx = document.getElementById('cropDemandChart');
  let cropDemandChartInstance = null;

  if (cropDemandCtx) {
    cropDemandChartInstance = new Chart(cropDemandCtx.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: PROVINCE_CROP_DATA.kandal.labels,
        datasets: [{
          data: PROVINCE_CROP_DATA.kandal.data,
          backgroundColor: [
            '#1b632e',
            '#22c55e',
            '#84cc16',
            '#eab308',
            '#f97316'
          ],
          borderWidth: 3,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: { family: 'Siemreap', size: 11.5 },
              color: '#274530',
              padding: 12,
              usePointStyle: true
            }
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return ` ${context.label}: ${context.raw}% នៃតម្រូវការ`;
              }
            }
          }
        }
      }
    });
  }

  // Global province switcher
  window.changeProvinceCropDemand = function (provinceKey) {
    const provinceData = PROVINCE_CROP_DATA[provinceKey] || PROVINCE_CROP_DATA.kandal;
    const subElement = document.getElementById('cropDemandSub');
    if (subElement) {
      subElement.textContent = provinceData.sub;
    }

    if (cropDemandChartInstance) {
      cropDemandChartInstance.data.labels = provinceData.labels;
      cropDemandChartInstance.data.datasets[0].data = provinceData.data;
      cropDemandChartInstance.update();
      openToast(`បានផ្លាស់ប្តូរទិន្នន័យតម្រូវការដំណាំទៅកាន់៖ ${provinceData.sub.replace('ភាគរយដំណាំដែលកសិករធ្វើតេស្តក្នុង', '')}`);
    }
  };

  // 3. SEASONAL CATEGORY DEMAND BAR CHART BY YEAR
  const YEAR_SEASONAL_DATA = {
    '2026': {
      monsoon: [620, 480, 350],
      dry: [390, 240, 210],
      sub: 'ការប្រៀបធៀបជី ថ្នាំ និងពូជតាមរដូវ (ឆ្នាំ 2026)'
    },
    '2025': {
      monsoon: [510, 410, 290],
      dry: [320, 195, 170],
      sub: 'ការប្រៀបធៀបជី ថ្នាំ និងពូជតាមរដូវ (ឆ្នាំ 2025)'
    },
    '2024': {
      monsoon: [420, 330, 230],
      dry: [260, 150, 130],
      sub: 'ការប្រៀបធៀបជី ថ្នាំ និងពូជតាមរដូវ (ឆ្នាំ 2024)'
    }
  };

  const seasonalCtx = document.getElementById('seasonalChart');
  let seasonalChartInstance = null;

  if (seasonalCtx) {
    seasonalChartInstance = new Chart(seasonalCtx.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['ជី & ជីវជាតិដី', 'ការពារដំណាំ', 'ជំនួយការលូតលាស់'],
        datasets: [
          {
            label: 'រដូវវស្សា',
            data: YEAR_SEASONAL_DATA['2026'].monsoon,
            backgroundColor: '#1b632e',
            borderRadius: 8
          },
          {
            label: 'រដូវប្រាំង',
            data: YEAR_SEASONAL_DATA['2026'].dry,
            backgroundColor: '#86efac',
            borderRadius: 8
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { font: { family: 'Siemreap', size: 11.5 }, color: '#274530', usePointStyle: true }
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { family: 'Siemreap', size: 11.5 }, color: '#4b6351' } },
          y: { grid: { color: '#eef4f0' }, ticks: { font: { family: 'Plus Jakarta Sans', size: 11 }, color: '#637a6b' } }
        }
      }
    });
  }

  // Seasonal Year Switcher
  window.changeSeasonalYear = function (yearKey) {
    const yearData = YEAR_SEASONAL_DATA[yearKey] || YEAR_SEASONAL_DATA['2026'];
    const subElem = document.getElementById('seasonalChartSub');
    if (subElem) subElem.textContent = yearData.sub;

    if (seasonalChartInstance) {
      seasonalChartInstance.data.datasets[0].data = yearData.monsoon;
      seasonalChartInstance.data.datasets[1].data = yearData.dry;
      seasonalChartInstance.update();
      openToast(`បានផ្លាស់ប្តូរទិន្នន័យតម្រូវការតាមរដូវកាលទៅកាន់៖ ឆ្នាំ ${yearKey}`);
    }
  };
}

// Toast Notification Helper
let sellerToastTimeout = null;
window.openToast = function (msg) {
  const toast = document.getElementById('toastPopup');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = msg;
  toast.classList.add('show');

  if (sellerToastTimeout) clearTimeout(sellerToastTimeout);
  sellerToastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
};

// Seller Logout Helper
window.logoutSeller = function () {
  localStorage.removeItem('cropwise_logged_in');
  localStorage.removeItem('cropwise_user_role');
  localStorage.removeItem('cropwise_user_name');
  window.location.replace('login.html');
};

