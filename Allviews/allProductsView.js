import { cart, favorites } from "./main.js";
import { renderProductDetails } from "./productDetailView.js";
import {
  updateCartStatus,
  showHeartAnimation,
  showCartAnimation,
} from "./uiHelpers.js";

export function renderAllProducts(products) {
  const container = document.querySelector("#product-list");
  container.innerHTML = "";
  container.style.display = "flex";

  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <h3>${p.title}</h3>
      <img src="${p.image}" alt="${p.title}" class="product-image">
      <p>Hind: €${p.price.toFixed(2)}</p>
      <button class="add-to-cart">Lisa korvi</button>
      <button class="add-to-favorites">Lisa lemmikutesse</button>
    `;

    card.querySelector(".add-to-cart").addEventListener("click", (event) => {
      event.stopPropagation();
      cart.addProduct(p, 1);
      updateCartStatus();
      showCartAnimation();
      console.log(`${p.title} lisatud ostukorvi.`);
    });

    card
      .querySelector(".add-to-favorites")
      .addEventListener("click", (event) => {
        event.stopPropagation();
        if (!favorites.some((fav) => fav.id === p.id)) {
          favorites.push(p);
          showHeartAnimation();
          console.log(`${p.title} lisatud lemmikutesse.`);
        }
      });

    card.addEventListener("click", (event) => {
      if (event.target.tagName.toLowerCase() === "button") return;
      renderProductDetails(p);
    });

    container.appendChild(card);
  });
}
