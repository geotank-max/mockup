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
    category: 'ត្រង​តាមប្រភេទ',
    sort: 'តម្រៀបតាម',
    location: 'ត្រង​តាមតំបន់',
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

  // --- Store card clicks -> product detail ---
  const storeCards = document.querySelectorAll('.store-card');
  storeCards.forEach(card => {
    const openStore = () => {
      const name = card.querySelector('.store-name');
      openToast(name ? `កំពុងបើកហាង ${name.textContent.trim()}...` : 'កំពុងបើកហាង...');
      // Navigate to the product/store detail page
      setTimeout(() => {
        window.location.href = 'product-detail.html';
      }, 500);
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
