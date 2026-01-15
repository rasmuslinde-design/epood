import {
  fetchProducts,
  fetchCategories,
  fetchProductsByCategory,
} from "./api.js";
import { renderAllProducts } from "./Allviews/allProductsView.js";
import { renderCart } from "./Allviews/cartView.js";
import { renderFavorites } from "./Allviews/favoritesView.js";
import { renderLogin } from "./Allviews/loginView.js";
import { updateCartStatus } from "./Allviews/uiHelpers.js";
import { loadFavorites, cart } from "./state.js";

let allProducts = [];

function initSession() {
  let user = localStorage.getItem("userName");
  if (!user) {
    let guest =
      sessionStorage.getItem("clientId") ||
      "user_" + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem("clientId", guest);
    user = guest;
  }
  // Parandus: Kui ID-d pole sisse logitud, näitame sessiooni ID-d
  document.getElementById("client-id-display").textContent = user;
  updateAuthUI(localStorage.getItem("userName"));
  return user;
}

function updateAuthUI(user) {
  document.getElementById("nav-login").style.display = user
    ? "none"
    : "inline-block";
  document.getElementById("nav-logout").style.display = user
    ? "inline-block"
    : "none";
  document.getElementById("welcome-user").textContent = user
    ? `Tere, ${user}!`
    : "";
}

// --- KATEGOORIATE FILTRITE RENDERDAMINE ---
function renderCategoryFilters(categories) {
  const filterContainer = document.getElementById("category-filters");
  if (!filterContainer) return;

  filterContainer.innerHTML = `<button class="filter-btn active" data-category="all">Kõik</button>`;

  categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn";
    btn.dataset.category = category;
    btn.textContent = category;
    filterContainer.appendChild(btn);
  });

  filterContainer.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.onclick = async (e) => {
      filterContainer
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.dataset.category;
      if (category === "all") {
        renderAllProducts(allProducts);
      } else {
        const filtered = await fetchProductsByCategory(category);
        renderAllProducts(filtered);
      }
    };
  });
}

// UUENDATUD: showView funktsioon toetab nüüd flex-disaini keskmestamiseks
export function showView(viewId, title, pushState = true) {
  const paths = {
    "product-list": "/",
    "cart-view": "/ostukorv",
    "favorites-view": "/lemmikud",
    "login-view": "/logisisse",
  };

  if (pushState) history.pushState({ viewId }, title, paths[viewId] || "/");

  document.querySelectorAll(".view").forEach((v) => {
    if (v.id === viewId) {
      // OLULINE MUUDATUS: login-view ja product-list peavad olema flex, et CSS keskmestamine töötaks
      v.style.display =
        viewId === "login-view" || viewId === "product-list" ? "flex" : "block";
    } else {
      v.style.display = "none";
    }
  });

  const filters = document.getElementById("category-filters");
  if (filters)
    filters.style.display = viewId === "product-list" ? "flex" : "none";

  document.getElementById("main-heading").textContent = title;
}

async function handleRouting() {
  const path = window.location.pathname;
  if (path === "/lemmikud") {
    showView("favorites-view", "Lemmikud", false);
    renderFavorites(allProducts);
  } else if (path === "/ostukorv") {
    showView("cart-view", "Ostukorv", false);
    renderCart();
  } else if (path === "/logisisse") {
    // renderLogin peab kutsuma showView-d seespool, teeme kindlaks et see töötab:
    showView("login-view", "Logi sisse", false);
    renderLogin();
  } else {
    showView("product-list", "Tooted", false);
    renderAllProducts(allProducts);
  }
}

async function init() {
  initSession();
  await loadFavorites();
  await cart.load();

  try {
    allProducts = await fetchProducts();
    const categories = await fetchCategories();

    renderCategoryFilters(categories);
    handleRouting();
  } catch (e) {
    console.error("Viga andmete laadimisel:", e);
  }
  updateCartStatus();
}

// Navigatsioon - lisatud e.preventDefault() igale poole, et vältida lehe refreshi
document.getElementById("nav-home").onclick = (e) => {
  e.preventDefault();
  showView("product-list", "Tooted");
  renderAllProducts(allProducts);
};
document.getElementById("nav-favorites").onclick = (e) => {
  e.preventDefault();
  showView("favorites-view", "Lemmikud");
  renderFavorites(allProducts);
};
document.getElementById("nav-cart").onclick = (e) => {
  e.preventDefault();
  showView("cart-view", "Ostukorv");
  renderCart();
};
document.getElementById("nav-login") &&
  (document.getElementById("nav-login").onclick = (e) => {
    e.preventDefault();
    showView("login-view", "Logi sisse");
    renderLogin();
  });
document.getElementById("nav-logout").onclick = (e) => {
  e.preventDefault();
  localStorage.removeItem("userName");
  window.location.href = "/";
};
document.getElementById("brand-link").onclick = (e) => {
  e.preventDefault();
  showView("product-list", "Tooted");
  renderAllProducts(allProducts);
};

window.onpopstate = () => handleRouting();

init();
