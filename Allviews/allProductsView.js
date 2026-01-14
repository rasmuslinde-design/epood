import { renderProductDetails } from "./productDetailView.js";
import { cart, favorites } from "../state.js";
import { updateCartStatus, showCartAnimation, showHeartAnimation } from "./uiHelpers.js";

export function renderAllProducts(products) {
  const container = document.querySelector("#product-list");
  if (!container) return;

  container.innerHTML = "";
  container.style.display = "flex";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="product-image">
      <h3>${product.title}</h3>
      <p>${product.price.toFixed(2)} €</p>
      <button class="add-to-cart">Lisa korvi</button>
      <button class="add-to-favorites">Lemmikutesse</button>
    `;

    card.addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON") {
        renderProductDetails(product);
      }
    });

    card.querySelector(".add-to-cart").addEventListener("click", (e) => {
      e.stopPropagation();
      cart.addProduct(product, 1);
      updateCartStatus();
      showCartAnimation();
    });

    card.querySelector(".add-to-favorites").addEventListener("click", (e) => {
      e.stopPropagation();
      if (!favorites.find(f => f.id === product.id)) {
        favorites.push(product);
        showHeartAnimation();
      }
    });

    container.appendChild(card);
  });
}