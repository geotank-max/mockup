// --- PRODUCTS PAGE (ផលិតផល) ---

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
  }, 2800);
};

document.addEventListener('DOMContentLoaded', () => {

  // --- Search ---
  const searchInput = document.getElementById('productsSearchInput');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = searchInput.value.trim();
        openToast(q ? `កំពុងស្វែងរក "${q}"...` : 'សូមបញ្ចូលពាក្យស្វែងរក');
      }
    });
  }

  // --- Sort / Filter chips ---
  const filterLabels = {
    category: 'ត្រង​តាមមុខទំនិញ',
    sort: 'តម្រៀបតាមការពេញនិយម',
    location: 'ការកំណត់តំបន់',
    rating: 'តម្រៀបតាមវាយតម្លៃខ្ពស់',
    promo: 'បង្ហាញតែការផ្តល់ជូន'
  };

  const filterChips = document.querySelectorAll('#productsFilterRow .filter-chip');
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const type = chip.getAttribute('data-filter');

      // Toggle active state across the row (single active chip)
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      openToast(filterLabels[type] || 'តម្រៀបផលិតផល');
    });
  });

  // --- Store card clicks -> product detail with store info ---
  const storeCards = document.querySelectorAll('.store-card');
  storeCards.forEach(card => {
    const openStore = () => {
      const name = card.querySelector('.store-name')?.textContent.trim() || '';
      const img = card.querySelector('.store-banner-img')?.getAttribute('src') || '';
      const rating = card.querySelector('.store-rating-pill span:last-child')?.textContent.trim() || '4.8';
      const fee = card.querySelector('.store-fee-current')?.textContent.trim() || '$0.45';
      const oldFee = card.querySelector('.store-fee-old')?.textContent.trim() || '$1.00';

      openToast(name ? `កំពុងបើក ${name}...` : 'កំពុងបើកហាង...');

      const queryParams = new URLSearchParams({
        store: name,
        img: img,
        rating: rating,
        fee: fee,
        oldFee: oldFee,
        dist: '1.08km',
        time: '26នាទី'
      });

      // Navigate to the product/store detail page
      setTimeout(() => {
        window.location.href = `product-detail.html?${queryParams.toString()}`;
      }, 400);
    };

    card.addEventListener('click', openStore);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openStore();
      }
    });
  });

});
