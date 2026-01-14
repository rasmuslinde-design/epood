import { fetchProducts, fetchCategories, fetchProductsByCategory } from "./api.js";
import { renderAllProducts } from "./Allviews/allProductsView.js";
import { renderCart } from "./Allviews/cartView.js";
import { renderFavorites } from "./Allviews/favoritesView.js";
import { updateCartStatus } from "./Allviews/uiHelpers.js";

let allProducts = [];

// --- ÜLESANNE 4: SESSIOONI HALDUS ---
function initSession() {
  let clientId = sessionStorage.getItem("clientId");
  if (!clientId) {
    clientId = "user_" + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem("clientId", clientId);
  }
  const display = document.getElementById("client-id-display");
  if (display) display.textContent = clientId;
  return clientId;
}

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

  const heading = document.getElementById("main-heading");
  if (heading) heading.textContent = title;
  window.scrollTo(0, 0);
}

// --- ÜLESANNE 2.3: KATEGOORIATE KUVAMINE ---
function renderCategoryFilters(categories) {
  const filterContainer = document.getElementById("category-filters");
  if (!filterContainer) return;

  filterContainer.innerHTML = `<button class="filter-btn active" data-category="all">Kõik</button>`;
  
  categories.forEach(category => {
    const btn = document.createElement("button");
    btn.className = "filter-btn";
    btn.dataset.category = category;
    btn.textContent = category;
    filterContainer.appendChild(btn);
  });

  filterContainer.querySelectorAll(".filter-btn").forEach(btn => {
    btn.onclick = async (e) => {
      filterContainer.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.dataset.category;
      if (category === "all") {
        renderAllProducts(allProducts);
      } else {
        // ÜLESANNE 2.2: Filtreerimine
        const filtered = await fetchProductsByCategory(category);
        renderAllProducts(filtered);
      }
    };
  });
}

async function init() {
  const clientId = initSession();
  console.log("Sessioon algatatud kliendile:", clientId);

  allProducts = await fetchProducts();
  const categories = await fetchCategories();
  
  renderCategoryFilters(categories);
  showView("product-list", "Kõik tooted");
  renderAllProducts(allProducts);
  updateCartStatus();

  // --- NAVIGATSIOONI PARANDUS (ID-PÕHINE) ---
  
  document.getElementById("nav-home").onclick = (e) => {
    e.preventDefault();
    showView("product-list", "Kõik tooted");
    renderAllProducts(allProducts);
  };

  document.getElementById("nav-favorites").onclick = (e) => {
    e.preventDefault();
    renderFavorites();
  };

  document.getElementById("nav-cart").onclick = (e) => {
    e.preventDefault();
    renderCart();
  };

  document.getElementById("brand-link").onclick = (e) => {
    e.preventDefault();
    showView("product-list", "Kõik tooted");
    renderAllProducts(allProducts);
  };

  document.getElementById("cart-status").onclick = () => renderCart();
}

init();