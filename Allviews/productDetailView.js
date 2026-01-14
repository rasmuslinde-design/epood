// Allviews/productDetailView.js
import { cart, favorites } from "../state.js"; // PARANDUS: impordi state.js failist
import {
  updateCartStatus,
  showCartAnimation,
  showHeartAnimation,
} from "./uiHelpers.js";
import { showView } from "../main.js";

export function renderProductDetails(product) {
  const list = document.querySelector("#product-list");
  const details = document.querySelector("#product-details");

  showView("product-details", product.title);

  details.innerHTML = `
    <div class="product-detail-container">
        <button id="back-button">← Tagasi</button>
        <img src="${product.image}" alt="${product.title}">
        <p>${product.description || "Toote kirjeldus."}</p>
        <p><strong>Hind: ${product.price.toFixed(2)} €</strong></p>
        <button class="add-to-cart">Lisa korvi</button>
        <button class="add-to-favorites">Lisa lemmikutesse</button>
    </div>
  `;

  details.querySelector("#back-button").addEventListener("click", () => {
    showView("product-list", "Kõik tooted");
  });

  details.querySelector(".add-to-cart").addEventListener("click", () => {
    cart.addProduct(product, 1);
    updateCartStatus();
    showCartAnimation();
  });

  details.querySelector(".add-to-favorites").addEventListener("click", () => {
    if (!favorites.find((f) => f.id === product.id)) {
      favorites.push(product);
      showHeartAnimation();
    }
  });
}
