import { showView } from "../main.js";
import { cart, favorites, toggleFavorite } from "../state.js";
import { updateCartStatus, showCartAnimation, showHeartAnimation } from "./uiHelpers.js";

export function renderProductDetails(product) {
  const details = document.querySelector("#product-details");
  if (!details) return;

  showView("product-details", product.title);

  const isFavorite = favorites.some(f => f.id === product.id);

  details.innerHTML = `
    <button id="back-btn" style="margin-bottom: 20px; padding: 10px 20px; cursor: pointer; border-radius: 6px; border: 1px solid #333; background: #eee;">
      ← Tagasi poodi
    </button>
    <div class="detail-content" style="display: flex; gap: 40px; background: white; padding: 30px; border-radius: 12px; border: 2px solid #333;">
      <div style="flex: 1; text-align: center;">
        <img src="${product.image}" alt="${product.title}" style="max-width: 100%; height: 400px; object-fit: contain;">
      </div>
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
        <h1 style="margin-bottom: 20px;">${product.title}</h1>
        <p style="font-size: 1.1rem; line-height: 1.6; color: #555; margin-bottom: 25px;">${product.description}</p>
        <h2 style="font-size: 2rem; color: #1943da; margin-bottom: 30px;">${product.price.toFixed(2)} €</h2>
        
        <div style="display: flex; gap: 15px;">
          <button id="detail-add-cart" class="add-to-cart" style="flex: 2; padding: 15px; font-weight: bold; cursor: pointer;">
            🛒 Lisa ostukorvi
          </button>
          <button id="detail-add-fav" class="add-to-favorites" style="flex: 1; padding: 15px; font-weight: bold; cursor: pointer;">
            ${isFavorite ? '❤️ Lemmik' : '🤍 Lisa lemmikuks'}
          </button>
        </div>
      </div>
    </div>
  `;

  // TAGASI NUPP
  details.querySelector("#back-btn").onclick = () => {
    showView("product-list", "Kõik tooted");
  };

  // LISA OSTUKORVI
  details.querySelector("#detail-add-cart").onclick = () => {
    cart.addProduct(product, 1);
    updateCartStatus();
    showCartAnimation();
  };

  // LISA LEMMIKUTESSE
  const favBtn = details.querySelector("#detail-add-fav");
  favBtn.onclick = () => {
    const wasAdded = toggleFavorite(product);
    favBtn.innerHTML = wasAdded ? '❤️ Lemmik' : '🤍 Lisa lemmikuks';
    if (wasAdded) showHeartAnimation();
  };
}