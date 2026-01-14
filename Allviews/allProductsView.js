import { renderProductDetails } from "./productDetailView.js";
import { cart, favorites } from "../state.js";
import {
  updateCartStatus,
  showCartAnimation,
  showHeartAnimation,
} from "./uiHelpers.js";

export function renderAllProducts(products) {
  const container = document.querySelector("#product-list");
  if (!container) return;

  container.innerHTML = "";

  products.forEach((product) => {
    const isFavorite = favorites.some((f) => f.id === product.id);

    const card = document.createElement("div");
    card.className = "product-card";

    // Muudetud struktuur: pilt ja süda on ühises konteineris
    card.innerHTML = `
      <div class="product-image-container">
        <img src="${product.image}" alt="${
      product.title
    }" class="product-image">
        <div class="fav-icon">
          ${isFavorite ? "❤️" : "🤍"}
        </div>
      </div>
      <h3>${product.title}</h3>
      <div class="card-footer">
        <p>${product.price.toFixed(2)} €</p>
        <button class="add-to-cart">Lisa ostukorvi</button>
      </div>
    `;

    // Südame (toggle) loogika
    const favIcon = card.querySelector(".fav-icon");
    favIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      const index = favorites.findIndex((f) => f.id === product.id);

      if (index === -1) {
        favorites.push(product);
        favIcon.innerText = "❤️";
        showHeartAnimation();
      } else {
        favorites.splice(index, 1);
        favIcon.innerText = "🤍";
      }
    });

    // Kaardile vajutus avab detailid (aga mitte nupule vajutades)
    card.addEventListener("click", (e) => {
      if (!e.target.closest("button") && !e.target.closest(".fav-icon")) {
        renderProductDetails(product);
      }
    });

    card.querySelector(".add-to-cart").addEventListener("click", (e) => {
      e.stopPropagation();
      cart.addProduct(product, 1);
      updateCartStatus();
      showCartAnimation();
    });

    container.appendChild(card);
  });
}
