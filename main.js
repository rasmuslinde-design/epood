import { fetchProducts } from "./api.js";
import { renderAllProducts } from "./Allviews/allProductsView.js";
import { renderCart } from "./Allviews/cartView.js";
import { renderFavorites } from "./Allviews/favoritesView.js";
import { updateCartStatus } from "./Allviews/uiHelpers.js";

let allProducts = [];

export function showView(viewId, title) {
  const views = ["product-list", "product-details", "cart-view", "favorites-view"];
  
  views.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (id === viewId) {
        // Pealeht peab olema FLEX, teised võivad olla BLOCK
        el.style.display = (id === "product-list") ? "flex" : "block";
      } else {
        el.style.display = "none";
      }
    }
  });

  const heading = document.querySelector("h2");
  if (heading) heading.textContent = title;
  window.scrollTo(0, 0);
}

async function init() {
  allProducts = await fetchProducts();
  showView("product-list", "Kõik tooted");
  renderAllProducts(allProducts);
  updateCartStatus();

  // Logo/Brand klikk viib koju
  document.getElementById("brand").onclick = (e) => {
    e.preventDefault();
    showView("product-list", "Kõik tooted");
    renderAllProducts(allProducts);
  };

  // Navigatsioon
  document.querySelectorAll("nav a").forEach(link => {
    link.onclick = (e) => {
      e.preventDefault();
      const text = e.target.innerText.trim().toLowerCase();
      if (text.includes("kodu") || text.includes("tooted")) {
        showView("product-list", "Kõik tooted");
        renderAllProducts(allProducts);
      } else if (text.includes("lemmikud")) {
        renderFavorites();
      } else if (text.includes("ostukorv")) {
        renderCart();
      }
    };
  });

  // Ostukorvi mulli klikk
  document.getElementById("cart-status").onclick = () => renderCart();
}

init();