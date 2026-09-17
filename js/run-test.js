// --- CROPWISE EXPERT TESTING ENGINE (run-test.js) ---

document.addEventListener('DOMContentLoaded', () => {
  // Wizard state
  let currentStep = 1;
  const totalSteps = 4;

  const testState = {
    crop: 'rice',
    cropKh: 'ស្រូវ',
    cropEn: 'Paddy Rice',
    farmSize: 1.0,
    province: 'Kandal',
    terrain: 'lowland',
    soil: 'loam',
    drainage: 'well',
    ph: 'neutral',
    season: 'wet',
    stage: 'vegetative',
    priority: 'yield',
    symptoms: ['leaf_yellow']
  };

  // DOM Elements
  const wizardSteps = {
    1: document.getElementById('step1'),
    2: document.getElementById('step2'),
    3: document.getElementById('step3'),
    4: document.getElementById('step4'),
    output: document.getElementById('stepOutput')
  };

  const prevStepBtn = document.getElementById('prevStepBtn');
  const nextStepBtn = document.getElementById('nextStepBtn');
  const nextBtnText = document.getElementById('nextBtnText');
  const currentStepNum = document.getElementById('currentStepNum');
  const stepCounterChip = document.getElementById('stepCounterChip');
  const stepSegments = document.querySelectorAll('.step-segment');
  const wizardFooterBar = document.getElementById('wizardFooterBar');

  // --- 1. SELECTION EVENT HANDLERS ---

  // Crop Selector (Step 1)
  const cropChips = document.querySelectorAll('#cropSelectorGrid .select-chip');
  cropChips.forEach(chip => {
    chip.addEventListener('click', () => {
      cropChips.forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      testState.crop = chip.getAttribute('data-crop');
      testState.cropKh = chip.getAttribute('data-crop-kh');
      testState.cropEn = chip.getAttribute('data-crop-en');
    });
  });

  // Farm size & Province (Step 1)
  const farmSizeInput = document.getElementById('farmSizeInput');
  if (farmSizeInput) {
    farmSizeInput.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      testState.farmSize = (!isNaN(val) && val > 0) ? val : 1.0;
    });
  }

  const provinceInput = document.getElementById('provinceInput');
  if (provinceInput) {
    provinceInput.addEventListener('change', (e) => {
      testState.province = e.target.value;
    });
  }

  // Terrain Selector (Step 1)
  const terrainBtns = document.querySelectorAll('#terrainSelector .pill-btn');
  terrainBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      terrainBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      testState.terrain = btn.getAttribute('data-terrain');
    });
  });

  // Drainage & pH (Step 2)
  const drainageBtns = document.querySelectorAll('#drainageSelector .pill-btn');
  drainageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      drainageBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      testState.drainage = btn.getAttribute('data-drainage');
    });
  });

  const phBtns = document.querySelectorAll('#phSelector .pill-btn');
  phBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      phBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      testState.ph = btn.getAttribute('data-ph');
    });
  });

  // ==============================================
  // AI Soil Camera Scanner
  // ==============================================
  const satScanCard = document.getElementById('satScanCard');
  const satScanBtn = document.getElementById('satScanBtn');
  const satScanBtnText = document.getElementById('satScanBtnText');
  const satProgressBox = document.getElementById('satProgressBox');
  const satProgressText = document.getElementById('satProgressText');
  const satResultPanel = document.getElementById('satResultPanel');
  const satDetectedSoil = document.getElementById('satDetectedSoil');
  const satConfidence = document.getElementById('satConfidence');
  const soilMetricPh = document.getElementById('soilMetricPh');
  const soilMetricMoisture = document.getElementById('soilMetricMoisture');
  const soilMetricDrainage = document.getElementById('soilMetricDrainage');
  const manualSoilToggle = document.getElementById('manualSoilToggle');
  const manualSoilBody = document.getElementById('manualSoilBody');

  const AI_SCAN_MESSAGES = [
    'កំពុងស្កេនសាច់ដីតាមរយៈ ML Vision...',
    'កំពុងវិភាគ Spectral Color & Texture...',
    'កំពុងគណនាកម្រិត pH និងសំណើមដី...',
    'បញ្ចប់ការវិភាគដីដោយជោគជ័យ!'
  ];

  function runSoilScanAnimation(onComplete) {
    if (!satScanCard) return;
    satScanCard.classList.add('scanning');
    if (satScanBtn) {
      satScanBtn.disabled = true;
      if (satScanBtnText) satScanBtnText.textContent = 'កំពុងស្កេន...';
    }
    if (satResultPanel) satResultPanel.style.display = 'none';
    if (satProgressBox) satProgressBox.style.display = 'flex';

    let msgIdx = 0;
    if (satProgressText) satProgressText.textContent = AI_SCAN_MESSAGES[0];
    const interval = setInterval(() => {
      msgIdx++;
      if (msgIdx < AI_SCAN_MESSAGES.length && satProgressText) {
        satProgressText.textContent = AI_SCAN_MESSAGES[msgIdx];
      }
    }, 380);

    setTimeout(() => {
      clearInterval(interval);
      satScanCard.classList.remove('scanning');
      if (satProgressBox) satProgressBox.style.display = 'none';
      if (satResultPanel) satResultPanel.style.display = 'block';
      if (satScanBtn) {
        satScanBtn.disabled = false;
        if (satScanBtnText) satScanBtnText.textContent = 'ស្កេនម្តងទៀត';
      }
      if (onComplete) onComplete();
    }, 1500);
  }

  function applyDetectedSoilData(data) {
    const soil = data?.soil || 'loam';
    const ph = data?.ph || 'neutral';
    const drainage = data?.drainage || 'well';
    const confidence = data?.confidence || '៩៤%';
    const moisture = data?.moisture || '៣៨%';
    const khName = data?.khName || 'ដីល្បាប់ (Loam Soil)';
    const metricPh = data?.metricPh || '៦.៥ (ដីល្មម)';
    const metricDrainage = data?.metricDrainage || 'ល្អ';

    // Update state
    testState.soil = soil;
    testState.ph = ph;
    testState.drainage = drainage;

    // Sync manual override selectors if present
    if (drainageBtns) {
      drainageBtns.forEach(b => {
        b.classList.toggle('selected', b.getAttribute('data-drainage') === drainage);
      });
    }
    if (phBtns) {
      phBtns.forEach(b => {
        b.classList.toggle('selected', b.getAttribute('data-ph') === ph);
      });
    }

    // Update UI elements
    if (satDetectedSoil) satDetectedSoil.textContent = khName;
    if (satConfidence) satConfidence.textContent = 'ទំនុកចិត្ត ' + confidence;
    if (soilMetricPh) soilMetricPh.textContent = metricPh;
    if (soilMetricMoisture) soilMetricMoisture.textContent = moisture;
    if (soilMetricDrainage) {
      soilMetricDrainage.textContent = metricDrainage;
      soilMetricDrainage.className = 'sat-metric-val ' + (drainage === 'waterlogged' ? '' : 'sat-ok');
    }
  }

  // Handle Scan Soil Trigger button
  if (satScanBtn) {
    satScanBtn.addEventListener('click', () => {
      runSoilScanAnimation(() => {
        applyDetectedSoilData({
          soil: 'loam',
          ph: 'neutral',
          drainage: 'well',
          confidence: '៩៤%',
          moisture: '៣៨%',
          khName: 'ដីល្បាប់ (Loam Soil)',
          metricPh: '៦.៥ (ដីល្មម)',
          metricDrainage: 'ល្អ'
        });
      });
    });
  }

  // Handle manual override accordion toggle
  if (manualSoilToggle && manualSoilBody) {
    manualSoilToggle.addEventListener('click', () => {
      const isOpen = manualSoilBody.style.display !== 'none';
      manualSoilBody.style.display = isOpen ? 'none' : 'block';
      manualSoilToggle.classList.toggle('open', !isOpen);
    });
  }

  // ==============================================
  // Interactive Satellite Map (Leaflet) — tap viewport to open
  // ==============================================
  const satScanViewport = document.getElementById('satScanViewport');
  const geoMapModal = document.getElementById('geoMapModal');
  const geoMapCloseBtn = document.getElementById('geoMapCloseBtn');
  const geoMapConfirmBtn = document.getElementById('geoMapConfirmBtn');
  const geoMapCanvas = document.getElementById('geoMapCanvas');

  // Demo plot: a farmland parcel in Battambang province
  const PLOT_CENTER = [13.0957, 103.2022];
  const PLOT_BOUNDARY = [
    [13.0962, 103.2014],
    [13.0963, 103.2031],
    [13.0951, 103.2032],
    [13.0950, 103.2013]
  ];

  let geoMap = null;

  function initGeoMap() {
    if (geoMap || typeof L === 'undefined' || !geoMapCanvas) return;

    geoMap = L.map(geoMapCanvas, {
      center: PLOT_CENTER,
      zoom: 16,
      zoomControl: true,
      attributionControl: true
    });

    // Esri World Imagery — real satellite landscape, no API key required
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 19,
        attribution: 'Imagery © Esri, Maxar, Earthstar Geographics'
      }
    ).addTo(geoMap);

    // Plot boundary polygon (dashed blue, matching the pin-boundary look)
    L.polygon(PLOT_BOUNDARY, {
      color: '#2f9bff',
      weight: 3,
      dashArray: '8 6',
      fillColor: '#2f9bff',
      fillOpacity: 0.12
    }).addTo(geoMap);

    // Center pin marker with label
    L.marker(PLOT_CENTER).addTo(geoMap);
    L.marker(PLOT_CENTER, {
      icon: L.divIcon({
        className: '',
        html: '<span class="geo-plot-label">ដីរបស់អ្នក</span>',
        iconSize: [0, 0],
        iconAnchor: [30, 34]
      })
    }).addTo(geoMap);
  }

  function openGeoMap() {
    if (!geoMapModal) return;
    geoMapModal.style.display = 'flex';
    geoMapModal.setAttribute('aria-hidden', 'false');
    initGeoMap();
    // Leaflet needs a size recalculation after the container becomes visible
    setTimeout(() => {
      if (geoMap) {
        geoMap.invalidateSize();
        geoMap.setView(PLOT_CENTER, 16);
      }
    }, 120);
  }

  function closeGeoMap() {
    if (!geoMapModal) return;
    geoMapModal.style.display = 'none';
    geoMapModal.setAttribute('aria-hidden', 'true');
  }

  if (satScanViewport) {
    satScanViewport.addEventListener('click', openGeoMap);
    satScanViewport.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openGeoMap();
      }
    });
  }
  if (geoMapCloseBtn) geoMapCloseBtn.addEventListener('click', closeGeoMap);
  if (geoMapConfirmBtn) geoMapConfirmBtn.addEventListener('click', closeGeoMap);
  if (geoMapModal) {
    geoMapModal.addEventListener('click', (e) => {
      if (e.target === geoMapModal) closeGeoMap();
    });
  }

  // Season (Step 3)
  const seasonChips = document.querySelectorAll('#seasonSelectorGrid .select-chip');
  seasonChips.forEach(chip => {
    chip.addEventListener('click', () => {
      seasonChips.forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      testState.season = chip.getAttribute('data-season');
    });
  });

  // Growth Stage (Step 3)
  const stageCards = document.querySelectorAll('#stageSelectorList .stage-select-card');
  stageCards.forEach(card => {
    card.addEventListener('click', () => {
      stageCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      testState.stage = card.getAttribute('data-stage');
    });
  });

  // Priority Cards (Step 4)
  const priorityCards = document.querySelectorAll('#prioritySelectorGrid .priority-card');
  priorityCards.forEach(card => {
    card.addEventListener('click', () => {
      priorityCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      testState.priority = card.getAttribute('data-priority');
    });
  });

  // Symptoms Checklist (Step 4)
  const symptomTags = document.querySelectorAll('#symptomTagsList .symptom-tag');
  symptomTags.forEach(tag => {
    tag.addEventListener('click', () => {
      tag.classList.toggle('selected');
      const sym = tag.getAttribute('data-sym');
      if (tag.classList.contains('selected')) {
        if (!testState.symptoms.includes(sym)) testState.symptoms.push(sym);
      } else {
        testState.symptoms = testState.symptoms.filter(s => s !== sym);
      }
    });
  });

  // --- 2. STEPPER NAVIGATION LOGIC ---

  function goToStep(step) {
    // Hide all steps
    Object.values(wizardSteps).forEach(sec => {
      if (sec) sec.classList.remove('active');
    });

    if (step <= totalSteps) {
      currentStep = step;
      wizardSteps[currentStep].classList.add('active');
      wizardFooterBar.style.display = 'flex';

      // Update indicators
      currentStepNum.textContent = currentStep;
      stepCounterChip.style.display = 'block';

      // Restore wizard header state
      const stepperBar = document.querySelector('.stepper-progress-bar');
      if (stepperBar) stepperBar.style.display = 'grid';
      const testHeader = document.querySelector('.test-header');
      if (testHeader) testHeader.classList.remove('result-mode-header');
      const headerTitle = document.querySelector('.test-page-title');
      if (headerTitle) headerTitle.textContent = 'ដំណើរការវិភាគដំណាំ';

      stepSegments.forEach((seg, idx) => {
        const segStep = idx + 1;
        seg.classList.remove('active', 'completed');
        if (segStep === currentStep) {
          seg.classList.add('active');
        } else if (segStep < currentStep) {
          seg.classList.add('completed');
        }
      });

      // Update Prev / Next button states
      prevStepBtn.disabled = (currentStep === 1);

      if (currentStep === 1) {
        nextBtnText.textContent = 'បន្ទាប់';
      } else if (currentStep === 2) {
        nextBtnText.textContent = 'បន្ទាប់';
      } else if (currentStep === 3) {
        nextBtnText.textContent = 'បន្ទាប់';
      } else if (currentStep === 4) {
        nextBtnText.textContent = 'ដំណើរការវិភាគ';
      }
    } else {
      // Show Output Step (Clean Recommendation Results View)
      currentStep = 'output';
      wizardSteps.output.classList.add('active');
      wizardFooterBar.style.display = 'none'; // Hide next bar on results

      // Hide Stepper and Form Header completely
      const stepperBar = document.querySelector('.stepper-progress-bar');
      if (stepperBar) stepperBar.style.display = 'none';
      if (stepCounterChip) stepCounterChip.style.display = 'none';

      const testHeader = document.querySelector('.test-header');
      if (testHeader) testHeader.classList.add('result-mode-header');
      const headerTitle = document.querySelector('.test-page-title');
      if (headerTitle) headerTitle.textContent = 'លទ្ធផលណែនាំផលិតផល';

      stepSegments.forEach(seg => {
        seg.classList.remove('active');
        seg.classList.add('completed');
      });

      // Render recommendations
      renderRecommendations();
    }

    // Scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const content = document.getElementById('wizardContent');
    if (content) content.scrollTop = 0;
  }

  // Next Button Click
  nextStepBtn.addEventListener('click', () => {
    if (typeof currentStep === 'number') {
      if (currentStep < totalSteps) {
        goToStep(currentStep + 1);
      } else {
        goToStep('output');
      }
    }
  });

  // Prev Button Click
  prevStepBtn.addEventListener('click', () => {
    if (typeof currentStep === 'number' && currentStep > 1) {
      goToStep(currentStep - 1);
    }
  });

  // --- 3. DYNAMIC RECOMMENDATION GENERATOR (Product, Dosage & Action) ---

  function renderRecommendations() {
    const size = testState.farmSize;
    const crop = testState.crop;
    const cropKh = testState.cropKh;
    const priority = testState.priority;

    // Update Result Header
    const outputCropHeading = document.getElementById('outputCropHeading');
    if (outputCropHeading) {
      outputCropHeading.textContent = `ផែនការណែនាំសម្រាប់ដំណាំ ${cropKh} (${size.toFixed(1)} ហិកតា)`;
    }

    const outputMetaSummary = document.getElementById('outputMetaSummary');
    if (outputMetaSummary) {
      const soilMap = { clay: 'ដីឥដ្ឋ', loam: 'ដីល្បាប់', sandy: 'ដីខ្សាច់', peat: 'ដីសរីរាង្គ' };
      const seasonMap = { wet: 'រដូវវស្សា', dry: 'រដូវប្រាំង', early_rain: 'ដើមរដូវវស្សា' };
      const priorityMap = { yield: 'ទិន្នផលអតិបរមា', budget: 'សន្សំសំចៃថវិកា', organic: 'សរីរាង្គ ១០០%', protection: 'ការពារជំងឺ' };
      const provinceMap = {
        'Kandal': 'កណ្តាល',
        'Battambang': 'បាត់ដំបង',
        'Takeo': 'តាកែវ',
        'Kampong Cham': 'កំពង់ចាម',
        'Siem Reap': 'សៀមរាប',
        'Prey Veng': 'ព្រៃវែង',
        'Kampong Thom': 'កំពង់ធំ'
      };

      const soilKh = soilMap[testState.soil] || 'ដីល្បាប់';
      const seasonKh = seasonMap[testState.season] || 'រដូវវស្សា';
      const provinceKh = provinceMap[testState.province] || testState.province || 'កណ្តាល';
      const priorityKh = priorityMap[testState.priority] || 'ទិន្នផលអតិបរមា';

      outputMetaSummary.innerHTML = `
        <span class="meta-tag-pill"><span class="meta-tag-icon">🌱</span><span>${soilKh}</span></span>
        <span class="meta-tag-pill"><span class="meta-tag-icon">🌦️</span><span>${seasonKh}</span></span>
        <span class="meta-tag-pill"><span class="meta-tag-icon">📍</span><span>ខេត្ត${provinceKh}</span></span>
        <span class="meta-tag-pill priority-pill"><span class="meta-tag-icon">🎯</span><span>អាទិភាព៖ <strong>${priorityKh}</strong></span></span>
      `;
    }

    const budgetLandVal = document.getElementById('budgetLandVal');
    if (budgetLandVal) budgetLandVal.textContent = size.toFixed(1);

    // Calculated dosages based on farm size
    const fertQty = (25 * size).toFixed(1);
    const protectQty = (150 * size).toFixed(0);
    const waterQty = (100 * size).toFixed(0);
    const boosterQty = (500 * size).toFixed(0);

    // Product definitions with image, price, star rating, description & dosage
    let p1 = {
      id: 'prod_fert',
      image: 'assets/images/fertilize (1) .jpg',
      category: 'cat-fertilizer',
      catName: 'ជី & ជីវជាតិដី',
      name: 'Bio-NPK 16-16-8 + សារធាតុ Humic',
      rating: '4.9',
      reviewCount: 142,
      desc: 'ជីសរីរាង្គកំហាប់ខ្ពស់ ជួយបំប៉នដី និងពង្រឹងឫសដំណាំឱ្យលូតលាស់លឿន ធន់នឹងភាពរាំងស្ងួត។',
      dosage: `${fertQty} គីឡូក្រាម (សម្រាប់ផ្ទៃដី ${size} ហិកតា)`,
      instruction: 'រោយជុំវិញគល់ ៥-១០cm មុនពេលស្រោចទឹកពេលព្រឹកព្រលឹម',
      originalPrice: `$${(32 * Math.max(1, Math.round(size))).toFixed(0)}`,
      price: `$${(24 * Math.max(1, Math.round(size))).toFixed(0)}`,
      unit: '/បាវ (25kg)',
      unitPrice: '$24.00 / បាវ',
      dealer: 'AgroMart Battambang'
    };

    if (priority === 'organic') {
      p1.name = 'ជីកំប៉ុសសរីរាង្គ Bio-Compost Granule';
      p1.desc = 'ជីកំប៉ុសធម្មជាតិ ១០០% សម្បូរមីក្រូសារពាង្គកាយមានប្រយោជន៍ បង្កើនសំណើម និងគុណភាពដីយូរអង្វែង។';
      p1.dosage = `${(40 * size).toFixed(0)} គីឡូក្រាម (សម្រាប់ផ្ទៃដី ${size} ហិកតា)`;
      p1.instruction = 'កប់លាយជាមួយដីជុំវិញរង ដើម្បីបង្កើនសំណើម និងជីវជាតិដី';
      p1.originalPrice = `$${(30 * Math.max(1, Math.round(size))).toFixed(0)}`;
      p1.price = `$${(22 * Math.max(1, Math.round(size))).toFixed(0)}`;
      p1.unit = '/បាវ (25kg)';
      p1.unitPrice = '$22.00 / បាវ';
    } else if (priority === 'budget') {
      p1.name = 'NPK 15-15-15 + Urea Balanced Blend';
      p1.desc = 'រូបមន្តសន្សំសំចៃថវិកា ផ្តល់សារធាតុអាសូត និងប៉ូតាស្យូមពេញលេញសម្រាប់ដំណាំទូទៅ។';
      p1.dosage = `${(20 * size).toFixed(0)} គីឡូក្រាម (សម្រាប់ផ្ទៃដី ${size} ហិកតា)`;
      p1.originalPrice = `$${(25 * Math.max(1, Math.round(size))).toFixed(0)}`;
      p1.price = `$${(18 * Math.max(1, Math.round(size))).toFixed(0)}`;
      p1.unit = '/បាវ (25kg)';
      p1.unitPrice = '$18.00 / បាវ';
    }

    let p2 = {
      id: 'prod_protect',
      image: 'assets/images/fertilizer (2) .jpg',
      category: 'cat-protection',
      catName: 'ការពារដំណាំ',
      name: 'ថ្នាំជីវសាស្ត្រ Neem Bio-Defense',
      rating: '4.8',
      reviewCount: 98,
      desc: 'ចម្រាញ់ពីប្រេងស្តៅធម្មជាតិ កម្ចាត់ចៃស ដង្កូវស៊ីត្រួយ និងទប់ស្កាត់ផ្សិតស្លឹកដោយសុវត្ថិភាពខ្ពស់។',
      dosage: `${protectQty} ml លាយជាមួយទឹក ${waterQty} លីត្រ`,
      instruction: 'បាញ់លើស្លឹក និងត្រួយទាំងសងខាង នៅពេលព្រឹកព្រលឹម ឬពេលល្ងាចត្រជាក់',
      originalPrice: `$${(18 * Math.max(1, Math.round(size))).toFixed(0)}`,
      price: `$${(12 * Math.max(1, Math.round(size))).toFixed(0)}`,
      unit: '/ដប (1L)',
      unitPrice: '$12.00 / ដប',
      dealer: 'Kandal Agri-Center'
    };

    if (testState.symptoms.includes('fungal_spot')) {
      p2.name = 'ថ្នាំកម្ចាត់ផ្សិតស្លឹក Copper Bio-Fungicide';
      p2.desc = 'ថ្នាំជីវសាស្ត្រព្យាបាលជំងឺអុចត្នោត រលាកស្លឹក និងជំងឺផ្សិតសម្លាប់ឫសយ៉ាងមានប្រសិទ្ធភាព។';
      p2.unit = '/ដប (1L)';
    }

    let p3 = {
      id: 'prod_booster',
      image: 'assets/images/fertilize (3) .jpg',
      category: 'cat-seed',
      catName: 'ជំនួយការលូតលាស់',
      name: 'អ័រម៉ូនរំញោចឫស & ផ្កា',
      rating: '4.9',
      reviewCount: 115,
      desc: 'សារធាតុបំប៉នសរីរាង្គជួយឫសស្រូបជីវជាតិបានលឿន ការពារការជ្រុះផ្កា និងជួយឱ្យផ្លែធំពេញទម្ងន់។',
      dosage: `${boosterQty} ml លាយបញ្ចូលក្នុងការស្រោចស្រព`,
      instruction: 'ប្រើប្រាស់រៀងរាល់ ៧ ទៅ ១០ ថ្ងៃម្តង ក្នុងដំណាក់កាលលូតលាស់សកម្ម',
      originalPrice: `$${(14 * Math.max(1, Math.round(size))).toFixed(0)}`,
      price: `$${(9 * Math.max(1, Math.round(size))).toFixed(0)}`,
      unit: '/ដប (500ml)',
      unitPrice: '$9.00 / ដប',
      dealer: 'SmartAgri Express'
    };

    // Store in state for saving
    testState.recommendedProducts = [p1, p2, p3];

    // Render Product Cards
    const productsContainer = document.getElementById('recommendedProductsList');
    if (productsContainer) {
      productsContainer.innerHTML = [p1, p2, p3].map(p => `
        <div class="rec-product-card">
          <div class="rec-product-card-body">
            <!-- Product Image -->
            <div class="product-thumb-box">
              <img src="${p.image}" alt="${p.name}" class="product-img" />
            </div>

            <!-- Product Details -->
            <div class="product-details-content">
              <!-- 1. Product Name & Strikethrough + Bold Green Price Row -->
              <div class="product-title-row">
                <h4 class="rec-product-name">${p.name}</h4>
                <div class="product-price-tag-wrap">
                  <span class="old-price-strikethrough">${p.originalPrice || '$32'}</span>
                  <span class="current-price-bold">${p.price}</span>
                  <span class="price-unit-label">${p.unit || '/បាវ'}</span>
                </div>
              </div>

              <!-- 2. From Where (Supplier) -->
              <div class="dealer-tag">
                <span class="verified-icon">📍</span>
                <span>អ្នកផ្គត់ផ្គង់៖ <strong>${p.dealer}</strong></span>
              </div>

              <!-- 3. Product Description -->
              <p class="rec-product-desc">${p.desc}</p>

              <!-- 4. Review & Buy Button Row -->
              <div class="rec-product-footer">
                <div class="product-star-rating">
                  <span class="stars-gold">★</span>
                  <span class="rating-score">${p.rating}</span>
                  <span class="review-count">(${p.reviewCount})</span>
                </div>
                <button class="contact-dealer-btn" onclick="contactDealer('${p.dealer}', '${p.name}', '${p.id}', '${p.price}', '${p.unit || '/បាវ'}', '${encodeURIComponent(p.image)}', '${p.desc}')">
                  <span>ទាក់ទងទិញ</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      `).join('');
    }



    // Update Cost Estimation
    const costEstimate = document.getElementById('estimatedCostVal');
    if (costEstimate) {
      const minCost = Math.round(38 * size);
      const maxCost = Math.round(55 * size);
      costEstimate.textContent = `$${minCost} - $${maxCost}`;
    }
  }

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

  // --- 4. RESULT ACTIONS (Save, Telegram, Restart) ---

  const saveTestBtn = document.getElementById('saveTestBtn');
  if (saveTestBtn) {
    saveTestBtn.addEventListener('click', () => {
      // Create new record
      const testRecord = {
        id: '#0002',
        crop: `${testState.cropKh}`,
        cropSimple: testState.cropKh,
        size: testState.farmSize,
        province: testState.province,
        date: new Date().toLocaleDateString('km-KH'),
        status: 'រួចរាល់',
        priority: testState.priority,
        recommendedProducts: testState.recommendedProducts || []
      };

      // Get existing history or initialize
      let historyList = [];
      try {
        const stored = localStorage.getItem('cropwise_history_list');
        historyList = stored ? JSON.parse(stored) : [];
      } catch (e) {
        historyList = [];
      }

      // Add default #0001 if empty
      if (historyList.length === 0) {
        historyList.push({
          id: '#0001',
          crop: 'ប៉េងប៉ោះ',
          cropSimple: 'ប៉េងប៉ោះ',
          size: 1.0,
          province: 'កណ្តាល',
          date: '12/09/2026',
          status: 'កំពុងផ្គូផ្គង',
          priority: 'yield',
          recommendedProducts: [
            {
              id: 'prod_fert_default',
              image: 'assets/images/ad_fertilizer.jpg',
              category: 'cat-fertilizer',
              catName: 'ជី & ជីវជាតិដី',
              name: 'Bio-NPK 15-15-15 + Humic Organic',
              rating: '4.9',
              reviewCount: 120,
              desc: 'ជីសរីរាង្គកំហាប់ខ្ពស់ ជួយបំប៉នដី និងពង្រឹងឫសប៉េងប៉ោះឱ្យលូតលាស់ល្អ។',
              dosage: '25 គីឡូក្រាម (សម្រាប់ផ្ទៃដី 1.0 ហិកតា)',
              instruction: 'រោយជុំវិញគុម្ពចម្ងាយ ៥-១០cm មុនពេលស្រោចទឹក',
              price: '$24.00',
              dealer: 'Kandal Agri-Center'
            }
          ]
        });
      }

      // Add to front of history
      historyList.unshift(testRecord);
      localStorage.setItem('cropwise_history_list', JSON.stringify(historyList));
      localStorage.setItem('cropwise_last_test', JSON.stringify(testRecord));

      openToast('✓ បានរក្សាទុកសំណើ #0002 ក្នុងប្រវត្តិដោយជោគជ័យ!');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1400);
    });
  }

  const shareTelegramBtn = document.getElementById('shareTelegramBtn');
  if (shareTelegramBtn) {
    shareTelegramBtn.addEventListener('click', () => {
      openToast('កំពុងបើកចែករំលែកលទ្ធផលទៅកាន់ Telegram...');
    });
  }

  const restartTestBtn = document.getElementById('restartTestBtn');
  if (restartTestBtn) {
    restartTestBtn.addEventListener('click', () => {
      // Remove query params when restarting
      if (window.history.replaceState) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
      goToStep(1);
    });
  }

  // --- 5. INITIALIZE (Check if opening a history case directly) ---
  const urlParams = new URLSearchParams(window.location.search);
  const caseParam = urlParams.get('case') || urlParams.get('caseId');
  const viewParam = urlParams.get('view');

  if (caseParam || viewParam === 'result') {
    if (caseParam === '0001' || caseParam === '#0001') {
      testState.crop = 'tomato';
      testState.cropKh = 'ប៉េងប៉ោះ';
      testState.cropEn = 'Tomato';
      testState.farmSize = 1.5;
      testState.province = 'Battambang';
      testState.soil = 'loam';
      testState.season = 'early_rain';
      testState.priority = 'organic';
      testState.symptoms = ['fungal_spot'];
      const matchScore = document.getElementById('matchScoreVal');
      if (matchScore) matchScore.textContent = 'ភាពស៊ីគ្នា 96%';
    } else {
      // Default Case #0002
      testState.crop = 'rice';
      testState.cropKh = 'ស្រូវ';
      testState.cropEn = 'Paddy Rice';
      testState.farmSize = 1.0;
      testState.province = 'Kandal';
      testState.soil = 'loam';
      testState.season = 'wet';
      testState.priority = 'yield';
      testState.symptoms = ['leaf_yellow'];
      const matchScore = document.getElementById('matchScoreVal');
      if (matchScore) matchScore.textContent = 'ភាពស៊ីគ្នា 98%';
    }

    goToStep('output');
  } else {
    goToStep(1);
  }
});

// Toast Helper
let toastTimeout = null;
window.openToast = function (message) {
  const toast = document.getElementById('toastPopup');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
};
