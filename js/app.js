// --- CROPWISE PROTOTYPE APPLICATION LOGIC ---

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const track = document.getElementById('carouselTrack');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.getElementById('prevAdBtn');
  const nextBtn = document.getElementById('nextAdBtn');
  const dotsContainer = document.getElementById('carouselDots');
  const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
  
  const searchBtn = document.getElementById('searchBtn');
  const searchDrawer = document.getElementById('searchDrawer');
  const searchInput = document.getElementById('searchInput');
  const clearSearch = document.getElementById('clearSearch');

  const runTestingCard = document.getElementById('runTestingCard');
  const productsCard = document.getElementById('productsCard');
  const sellerCard = document.getElementById('sellerCard');
  const historyCard = document.getElementById('historyCard');
  const moreServicesCard = document.getElementById('moreServicesCard');

  const testingModal = document.getElementById('testingModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelFormBtn = document.getElementById('cancelFormBtn');

  const navTabs = document.querySelectorAll('.nav-tab');
  const tabHome = document.getElementById('tabHome');
  const tabRun = document.getElementById('tabRun');
  const tabProfile = document.getElementById('tabProfile');

  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoSlideTimer = null;

  // --- 1. AD CAROUSEL FUNCTIONALITY ---
  function updateCarousel(index) {
    if (!track) return;
    if (index < 0) {
      currentSlide = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }

    // Move track using percentage
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    dots.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function startAutoSlide() {
    if (!track) return;
    stopAutoSlide();
    autoSlideTimer = setInterval(() => {
      updateCarousel(currentSlide + 1);
    }, 4000);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  // Next & Prev Buttons (< >)
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      stopAutoSlide();
      updateCarousel(currentSlide + 1);
      startAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      stopAutoSlide();
      updateCarousel(currentSlide - 1);
      startAutoSlide();
    });
  }

  // Dots navigation
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const idx = parseInt(e.target.getAttribute('data-index'), 10);
      stopAutoSlide();
      updateCarousel(idx);
      startAutoSlide();
    });
  });

  // Pause on hover
  const carouselContainer = document.getElementById('adCarouselContainer');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer.addEventListener('mouseleave', startAutoSlide);
    carouselContainer.addEventListener('touchstart', stopAutoSlide, { passive: true });
    carouselContainer.addEventListener('touchend', startAutoSlide, { passive: true });
  }

  // Initialize auto slide
  startAutoSlide();

  // --- 2. SEARCH DRAWER TOGGLE ---
  if (searchBtn && searchDrawer) {
    searchBtn.addEventListener('click', () => {
      searchDrawer.classList.toggle('open');
      if (searchDrawer.classList.contains('open')) {
        searchInput.focus();
      }
    });
  }

  if (clearSearch && searchInput) {
    clearSearch.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.focus();
    });
  }

  // --- 3. QUICK ACTION CARDS CLICKS ---
  // The Longest Box: Farmer Run Testing Form -> Navigates to run-test.html
  if (runTestingCard) {
    runTestingCard.addEventListener('click', () => {
      window.location.href = 'run-test.html';
    });
  }

  // Check if a test was saved in localStorage
  try {
    const savedTest = localStorage.getItem('cropwise_last_test');
    if (savedTest) {
      const data = JSON.parse(savedTest);
      const statusId = document.querySelector('.status-id');
      const statusBadge = document.querySelector('.status-badge-chip');
      const progressFill = document.querySelector('.progress-fill');
      const infoText = document.querySelector('.info-text');

      if (statusId) statusId.textContent = `សំណើ ${data.id || '#0002'}`;
      if (statusBadge) statusBadge.textContent = 'រួចរាល់';
      if (progressFill) progressFill.style.width = '100%';
      if (infoText) {
        infoText.innerHTML = `ដំណាំ: <strong>${data.crop || 'ស្រូវ'} (${data.size || 1.0} Ha)</strong> &bull; ខេត្ត${data.province || 'កណ្តាល'}`;
      }
    }
  } catch (err) {
    console.error('Error loading saved test:', err);
  }

  // Products Card
  if (productsCard) {
    productsCard.addEventListener('click', () => {
      openToast('បើកកាតាឡុកផលិតផលណែនាំ');
    });
  }

  // ផលិតផល Card -> Opens Products (store list) page
  const marketPriceCard = document.getElementById('marketPriceCard');
  if (marketPriceCard) {
    marketPriceCard.addEventListener('click', () => {
      window.location.href = 'products.html';
    });
  }

  // Seller Card -> Opens Suppliers List Modal (no dashboard redirection)
  const suppliersModal = document.getElementById('suppliersModal');
  const closeSuppliersModalBtn = document.getElementById('closeSuppliersModalBtn');

  const suppliersList = [
    {
      id: 's1',
      name: 'ដេប៉ូ ជីកសិកម្ម អង្គរ',
      province: 'ខេត្តកណ្តាល',
      type: 'ដេប៉ូចែកចាយជី និងថ្នាំកសិកម្ម',
      rating: '4.9',
      verified: true
    },
    {
      id: 's2',
      name: 'ហាង ខ្មែរ អាហ្គ្រោ បៃតង',
      province: 'ខេត្តកំពង់ចាម',
      type: 'ហាងធាតុចូលកសិកម្មស្តង់ដារ',
      rating: '4.8',
      verified: true
    },
    {
      id: 's3',
      name: 'មជ្ឈមណ្ឌល ធាតុចូលកសិកម្ម សៀមរាប',
      province: 'ខេត្តសៀមរាប',
      type: 'ដេប៉ូចែកចាយទូទាំងខេត្ត',
      rating: '4.9',
      verified: true
    },
    {
      id: 's4',
      name: 'ដេប៉ូ ជីថ្នាំកសិកម្ម ពោធិ៍សាត់',
      province: 'ខេត្តពោធិ៍សាត់',
      type: 'ហាងចែកចាយជី និងគ្រាប់ពូជ',
      rating: '4.7',
      verified: false
    },
    {
      id: 's5',
      name: 'ហាង កសិកម្ម រតនៈ',
      province: 'ខេត្តបាត់ដំបង',
      type: 'ហាងលក់រាយ និងបោះដុំធាតុចូល',
      rating: '4.8',
      verified: true
    },
    {
      id: 's6',
      name: 'ដេប៉ូ កសិកម្ម ស្វាយរៀង',
      province: 'ខេត្តស្វាយរៀង',
      type: 'ដេប៉ូចែកចាយជី ថ្នាំ និងសម្ភារៈ',
      rating: '4.6',
      verified: false
    }
  ];

  function openSuppliersModal() {
    renderSuppliersContent();
    if (suppliersModal) suppliersModal.classList.add('open');
  }

  function closeSuppliersModal() {
    if (suppliersModal) suppliersModal.classList.remove('open');
  }

  function renderSuppliersContent() {
    const container = document.getElementById('suppliersListContainer');
    if (!container) return;

    container.innerHTML = suppliersList.map(s => `
      <div class="supplier-card-item">
        <div class="supplier-avatar-box">
          <img src="assets/icons/home-color-icon.svg" alt="${s.name}" class="supplier-avatar-img" />
        </div>
        <div class="supplier-info-box">
          <div class="supplier-header-row">
            <h4 class="supplier-name">${s.name}</h4>
            <span class="supplier-province-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              ${s.province}
            </span>
          </div>
          <div class="supplier-meta-row">
            <span class="supplier-type-tag">${s.type}</span>
            <span class="supplier-rating-tag">⭐ ${s.rating}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  if (sellerCard) {
    sellerCard.addEventListener('click', openSuppliersModal);
  }

  if (closeSuppliersModalBtn) closeSuppliersModalBtn.addEventListener('click', closeSuppliersModal);
  if (suppliersModal) {
    suppliersModal.addEventListener('click', (e) => {
      if (e.target === suppliersModal) closeSuppliersModal();
    });
  }

  // --- 3. QUICK ACTION CARDS & HISTORY MODAL ---
  const historyModal = document.getElementById('historyModal');
  const closeHistoryModalBtn = document.getElementById('closeHistoryModalBtn');

  function openHistoryModal() {
    renderHistoryContent();
    if (historyModal) historyModal.classList.add('open');
  }

  function closeHistoryModal() {
    if (historyModal) historyModal.classList.remove('open');
  }

  if (closeHistoryModalBtn) closeHistoryModalBtn.addEventListener('click', closeHistoryModal);
  if (historyModal) {
    historyModal.addEventListener('click', (e) => {
      if (e.target === historyModal) closeHistoryModal();
    });
  }

  // My Orders Card (ការបញ្ជាទិញរបស់ខ្ញុំ) -> Navigates to my-orders.html
  if (historyCard) {
    historyCard.addEventListener('click', () => {
      window.location.href = 'my-orders.html';
    });
  }
  
  // Test History Card & Top History Button
  if (productsCard) productsCard.addEventListener('click', openHistoryModal);
  document.getElementById('historyBtn')?.addEventListener('click', openHistoryModal);

  // Render History Content with 2 Case Records
  function renderHistoryContent() {
    const container = document.getElementById('historyListContainer');
    if (!container) return;

    let historyList = [];
    try {
      const stored = localStorage.getItem('cropwise_history_list');
      historyList = stored ? JSON.parse(stored) : [];
    } catch (e) {
      historyList = [];
    }

    // Default 2 mock cases if none saved yet
    if (historyList.length === 0) {
      historyList = [
        {
          id: '#0002',
          caseCode: '0002',
          crop: 'ស្រូវ',
          size: '1.0',
          province: 'កណ្តាល',
          soil: 'ដីល្បាប់',
          season: 'រដូវវស្សា',
          priority: 'ទិន្នផលអតិបរមា',
          date: '14/09/2026',
          status: 'រួចរាល់',
          matchScore: '98%',
          productCount: 3,
          productNames: ['Bio-NPK 16-16-8', 'Neem Bio-Defense', 'អ័រម៉ូនរំញោចឫស & ផ្កា'],
          productImages: [
            'assets/images/fertilize (1) .jpg',
            'assets/images/fertilizer (2) .jpg',
            'assets/images/fertilize (3) .jpg'
          ]
        },
        {
          id: '#0001',
          caseCode: '0001',
          crop: 'ប៉េងប៉ោះ',
          size: '1.5',
          province: 'បាត់ដំបង',
          soil: 'ដីល្បាប់',
          season: 'ដើមរដូវវស្សា',
          priority: 'សរីរាង្គ ១០០%',
          date: '12/09/2026',
          status: 'រួចរាល់',
          matchScore: '96%',
          productCount: 3,
          productNames: ['ជីកំប៉ុស Bio-Compost', 'Copper Bio-Fungicide', 'អ័រម៉ូនរំញោចឫស & ផ្កា'],
          productImages: [
            'assets/images/fertilize (1) .jpg',
            'assets/images/fertilizer (2) .jpg',
            'assets/images/fertilize (3) .jpg'
          ]
        }
      ];
    }

    container.innerHTML = historyList.map(rec => `
      <div class="history-case-card" onclick="openHistoryCase('${rec.caseCode || '0002'}')">
        <div class="history-case-header">
          <div class="history-case-id-group">
            <span class="history-case-badge">លទ្ធផលវិភាគ ${rec.id}</span>
            <span class="history-case-date">${rec.date}</span>
          </div>
          <span class="history-case-status-chip">✓ ${rec.status}</span>
        </div>

        <div class="history-case-title-row">
          <h4 class="history-case-title">ផែនការណែនាំសម្រាប់ដំណាំ ${rec.crop} (${rec.size} ហិកតា)</h4>
          <span class="history-match-badge">${rec.matchScore || '98%'}</span>
        </div>

        <div class="history-case-tags">
          <span class="history-mini-tag">🌱 ${rec.soil || 'ដីល្បាប់'}</span>
          <span class="history-mini-tag">🌦️ ${rec.season || 'រដូវវស្សា'}</span>
          <span class="history-mini-tag">📍 ខេត្ត${rec.province || 'កណ្តាល'}</span>
          <span class="history-mini-tag gold">🎯 ${rec.priority || 'ទិន្នផលអតិបរមា'}</span>
        </div>

        <div class="history-case-products-preview">
          <div class="history-thumbs-stack">
            ${(rec.productImages || ['assets/images/fertilize (1) .jpg', 'assets/images/fertilizer (2) .jpg', 'assets/images/fertilize (3) .jpg']).map(img => `<img src="${img}" class="history-mini-thumb" alt="Product" />`).join('')}
          </div>
          <span class="history-products-label">ផលិតផលណែនាំ ${rec.productCount || 3} មុខ</span>
        </div>

        <button class="history-view-result-btn" onclick="event.stopPropagation(); openHistoryCase('${rec.caseCode || '0002'}')">
          <span>មើលលទ្ធផលណែនាំពេញលេញ</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    `).join('');
  }

  window.openHistoryCase = function(caseCode) {
    closeHistoryModal();
    window.location.href = `run-test.html?case=${caseCode}&view=result`;
  };

  // More Services Card
  if (moreServicesCard) {
    moreServicesCard.addEventListener('click', () => {
      openToast('សេវាប្រឹក្សាយោបល់បន្ថែម');
    });
  }

  // Header Utility Icons
  document.getElementById('historyBtn')?.addEventListener('click', () => {
    openToast('បើកប្រវត្តិការងារ');
  });

  document.getElementById('notifBtn')?.addEventListener('click', () => {
    openToast('អ្នកមានការជូនដំណឹងថ្មី ២');
  });

  const profileModal = document.getElementById('profileModal');
  const closeProfileModalBtn = document.getElementById('closeProfileModalBtn');

  function openProfileModal() {
    const nameElem = document.getElementById('profileFarmerName');
    const storedName = localStorage.getItem('cropwise_user_name');
    if (nameElem && storedName) nameElem.textContent = storedName;
    if (profileModal) profileModal.classList.add('open');
  }

  function closeProfileModal() {
    if (profileModal) profileModal.classList.remove('open');
  }

  if (closeProfileModalBtn) closeProfileModalBtn.addEventListener('click', closeProfileModal);
  if (profileModal) {
    profileModal.addEventListener('click', (e) => {
      if (e.target === profileModal) closeProfileModal();
    });
  }

  document.getElementById('headerProfileBtn')?.addEventListener('click', openProfileModal);

  window.logout = function() {
    localStorage.removeItem('cropwise_logged_in');
    localStorage.removeItem('cropwise_user_role');
    localStorage.removeItem('cropwise_user_name');
    window.location.replace('login.html');
  };

  // --- 4. MODAL CONTROLS FOR TESTING FORM ---
  window.openRunModal = function() {
    window.location.href = 'run-test.html';
  };

  function closeRunModal() {
    if (testingModal) {
      testingModal.classList.remove('open');
    }
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeRunModal);
  }

  if (cancelFormBtn) {
    cancelFormBtn.addEventListener('click', closeRunModal);
  }

  if (testingModal) {
    testingModal.addEventListener('click', (e) => {
      if (e.target === testingModal) {
        closeRunModal();
      }
    });
  }

  // --- 5. BOTTOM NAVIGATION BAR (Home, Run, Profile) ---
  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab');

      if (tabId === 'run') {
        // Run opens the dedicated Expert Testing Wizard Page
        window.location.href = 'run-test.html';
        return;
      }

      if (tabId === 'profile') {
        openProfileModal();
        return;
      }

      navTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      if (tabId === 'home') {
        openToast('ទំព័រដើម');
      }
    });
  });

  // Contact dealer helper (Navigates to Product Detail Page)
  window.contactDealer = function (dealer, product, id, price, unit, image, desc) {
    const params = new URLSearchParams({
      id: id || 'prod_fert',
      name: product || '',
      dealer: dealer || '',
      price: price || '',
      unit: unit || '',
      img: image ? decodeURIComponent(image) : '',
      desc: desc || ''
    });
    window.location.href = `product-detail.html?${params.toString()}`;
  };

  // Form submission handler
  window.handleFormSubmit = function(e) {
    e.preventDefault();
    const crop = document.getElementById('cropType').value;
    const soil = document.getElementById('soilType').value;
    const size = document.getElementById('farmSize').value;

    closeRunModal();
    openToast(`កំពុងដំណើរការវិភាគសម្រាប់ដំណាំ ${crop.toUpperCase()} (${size} Ha)...`);
  };
});

// Toast notification helper
let toastTimeout = null;
window.openToast = function(message) {
  const toast = document.getElementById('toastPopup');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
};

// Home persistent search bar handler
document.addEventListener('DOMContentLoaded', () => {
  const homeSearchBtn = document.getElementById('homeSearchBtn');
  const homeSearchInput = document.getElementById('homeSearchInput');
  if (!homeSearchBtn || !homeSearchInput) return;

  const runSearch = () => {
    const q = homeSearchInput.value.trim();
    if (q) {
      openToast(`កំពុងស្វែងរក "${q}"...`);
    } else {
      openToast('សូមបញ្ចូលពាក្យស្វែងរក');
    }
  };

  homeSearchBtn.addEventListener('click', runSearch);
  homeSearchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') runSearch();
  });
});
