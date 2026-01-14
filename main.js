import { fetchProducts, fetchCategories, fetchProductsByCategory } from "./api.js";
import { renderAllProducts } from "./Allviews/allProductsView.js";
import { renderCart } from "./Allviews/cartView.js";
import { renderFavorites } from "./Allviews/favoritesView.js";
import { updateCartStatus } from "./Allviews/uiHelpers.js";

let allProducts = [];

// LISA SIINE 'export' MÄRKSÕNA!
export function showView(viewId, title) {
  const views = ["product-list", "product-details", "cart-view", "favorites-view"];
  views.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (id === viewId) {
        el.style.display = (id === "product-list") ? "flex" : "block";
      } else {
        el.style.display = "none";
      }
    }
  });

  const heading = document.querySelector("h2");
  if (heading) heading.textContent = title;
}

// Kategooriate loendi kuvamine (Ülesanne 2.3)
function renderCategoryFilters(categories) {
  const filterContainer = document.querySelector("#category-filters");
  if (!filterContainer) return;

  filterContainer.innerHTML = `<button class="filter-btn active" data-category="all">Kõik</button>`;
  
  categories.forEach(category => {
    filterContainer.innerHTML += `<button class="filter-btn" data-category="${category}">${category}</button>`;
  });

  filterContainer.querySelectorAll(".filter-btn").forEach(btn => {
    btn.onclick = async (e) => {
      filterContainer.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.dataset.category;
      if (category === "all") {
        renderAllProducts(allProducts);
      } else {
        // Filtreerimine kategooria alusel (Ülesanne 2.2)
        const filteredProducts = await fetchProductsByCategory(category);
        renderAllProducts(filteredProducts);
      }
    };
  });
}

async function init() {
  allProducts = await fetchProducts(); // Kõik tooted (Ülesanne 2.1)
  const categories = await fetchCategories();
  
  renderCategoryFilters(categories);
  showView("product-list", "Kõik tooted");
  renderAllProducts(allProducts);
  updateCartStatus();

  // Navigatsiooni sündmused jäävad samaks nagu sul olid...
  document.getElementById("brand").onclick = () => {
    showView("product-list", "Kõik tooted");
    renderAllProducts(allProducts);
  };
  
  document.getElementById("cart-status").onclick = () => renderCart();
}

init();