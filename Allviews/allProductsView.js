import { renderProductDetails } from "./productDetailView.js";
import { cart, favorites, toggleFavorite } from "../state.js";
import { updateCartStatus, showCartAnimation, showHeartAnimation } from "./uiHelpers.js";

export function renderAllProducts(products) {
  const container = document.querySelector("#product-list");
  if (!container) return;
  container.innerHTML = "";

  products.forEach((product) => {
    const isFavorite = favorites.includes(product.id);
    
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <div class="fav-icon">${isFavorite ? '❤️' : '🤍'}</div>
      </div>
      <h3>${product.title}</h3>
      <div class="card-footer">
        <p>${product.price.toFixed(2)} €</p>
        <button class="add-to-cart">Lisa ostukorvi</button>
      </div>
    `;

    // Lisa korvi klikk
    card.querySelector(".add-to-cart").onclick = (e) => {
      e.stopPropagation();
      cart.addProduct(product, 1);
      updateCartStatus();
      showCartAnimation();
    };

    card.querySelector(".fav-icon").onclick = async (e) => {
      e.stopPropagation();
      
      const added = await toggleFavorite(product);
      
      e.target.innerText = added ? '❤️' : '🤍';
      if (added) showHeartAnimation();
    };

    // Kaardile vajutus avab detailid
    card.onclick = () => renderProductDetails(product);

    container.appendChild(card);
  });
}