import { showView } from "../main.js";
import { cart, toggleFavorite } from "../state.js";
import { updateCartStatus, showCartAnimation, showHeartAnimation } from "./uiHelpers.js";

export function renderProductDetails(product) {
  const details = document.querySelector("#product-details");
  showView("product-details", product.title);

  details.innerHTML = `
    <button id="back-btn">← Tagasi</button>
    <div class="detail-content" style="display: flex; gap: 20px; padding: 20px;">
      <img src="${product.image}" style="width: 300px; object-fit: contain;">
      <div>
        <h1>${product.title}</h1>
        <p>${product.description}</p>
        <h2>${product.price.toFixed(2)} €</h2>
        <button id="detail-add-cart" class="add-to-cart">Lisa ostukorvi</button>
        <button id="detail-add-fav" class="add-to-favorites">Lisa lemmikutesse</button>
      </div>
    </div>
  `;

  details.querySelector("#back-btn").addEventListener("click", () => {
    showView("product-list", "Kõik tooted");
  });

  details.querySelector("#detail-add-cart").addEventListener("click", () => {
    cart.addProduct(product, 1);
    updateCartStatus();
    showCartAnimation();
  });

  details.querySelector("#detail-add-fav").addEventListener("click", () => {
    const added = toggleFavorite(product);
    if (added) showHeartAnimation();
  });
}