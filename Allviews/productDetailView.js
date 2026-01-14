import { showView } from "../main.js";
import { cart, favorites } from "../state.js";
import { updateCartStatus, showCartAnimation, showHeartAnimation } from "./uiHelpers.js";

export function renderProductDetails(product) {
  const details = document.querySelector("#product-details");
  showView("product-details", product.title);

  const isFavorite = favorites.some(f => f.id === product.id);

  details.innerHTML = `
    <div class="product-detail-wrapper" style="padding-bottom: 60px;">
      <button id="back-btn" style="margin-bottom: 20px; padding: 10px 20px; cursor: pointer;">← Tagasi</button>
      
      <div style="display: flex; gap: 40px; flex-wrap: wrap;">
        <img src="${product.image}" alt="${product.title}" style="max-width: 400px; width: 100%; height: auto; background: white; padding: 20px; border-radius: 10px; border: 2px solid #333;">
        
        <div style="flex: 1; min-width: 300px;">
          <h1>${product.title}</h1>
          <p style="font-size: 1.2rem; margin: 20px 0;">${product.description}</p>
          <h2 style="color: #1943da; margin: 20px 0;">${product.price.toFixed(2)} €</h2>
          
          <div style="display: flex; gap: 10px;">
            <button class="add-to-cart-detail" style="background: #28a745; color: white; padding: 15px 30px; border: none; border-radius: 8px; font-size: 1.1rem; cursor: pointer; flex: 1;">
              Lisa ostukorvi
            </button>
            <button class="add-to-fav-detail" style="background: ${isFavorite ? '#555' : '#dc3545'}; color: white; padding: 15px 30px; border: none; border-radius: 8px; font-size: 1.1rem; cursor: pointer; flex: 1;">
              ${isFavorite ? 'Eemalda lemmikutest ❤️' : 'Lisa lemmikutesse 🤍'}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Lemmikute nupu toggle loogika
  const favBtn = details.querySelector(".add-to-fav-detail");
  favBtn.addEventListener("click", () => {
    const index = favorites.findIndex(f => f.id === product.id);
    
    if (index === -1) {
      favorites.push(product);
      favBtn.innerText = 'Eemalda lemmikutest ❤️';
      favBtn.style.background = '#555';
      showHeartAnimation();
    } else {
      favorites.splice(index, 1);
      favBtn.innerText = 'Lisa lemmikutesse 🤍';
      favBtn.style.background = '#dc3545';
    }
  });

  details.querySelector("#back-btn").addEventListener("click", () => {
    showView("product-list", "Kõik tooted");
  });

  details.querySelector(".add-to-cart-detail").addEventListener("click", () => {
    cart.addProduct(product, 1);
    updateCartStatus();
    showCartAnimation();
  });
}