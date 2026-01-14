import { renderAllProducts } from "./Allviews/allProductsView.js";
import { updateCartStatus } from "./Allviews/uiHelpers.js";
import { renderCart } from "./Allviews/cartView.js";
import { renderFavorites } from "./Allviews/favoritesView.js";

export let products = [];

async function initApp() {
  try {
    const res = await fetch("/api/products");
    if (!res.ok) throw new Error("Andmete laadimine ebaõnnestus");
    products = await res.json();
    renderAllProducts(products);
    updateCartStatus();
  } catch (err) {
    console.error("Viga:", err);
  }
}

export function showView(viewId, title) {
  const views = ["product-list", "product-details", "cart-view", "favorites-view"];
  views.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = (id === viewId) ? (id === 'product-list' ? 'flex' : 'block') : 'none';
    }
  });
  const titleEl = document.querySelector("h2");
  if (titleEl) titleEl.innerText = title;
  window.scrollTo(0, 0);
}

document.addEventListener("click", (e) => {
  const target = e.target;
  if (target.id === "nav-home" || target.closest("#nav-brand")) {
    e.preventDefault();
    showView("product-list", "Kõik tooted");
  } 
  else if (target.id === "nav-cart") {
    e.preventDefault();
    renderCart(); // JÕUSTAB UUENDAMISE
    showView("cart-view", "Sinu ostukorv");
  } 
  else if (target.id === "nav-favorites") {
    e.preventDefault();
    renderFavorites(); // JÕUSTAB UUENDAMISE
    showView("favorites-view", "Sinu lemmikud");
  }
});

initApp();