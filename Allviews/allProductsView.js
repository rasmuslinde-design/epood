import { renderProductDetails } from "./productDetailView.js";
import { cart, favorites, toggleFavorite } from "../state.js";
import { updateCartStatus, showCartAnimation, showHeartAnimation } from "./uiHelpers.js";

/**
 * Renderdab kõik tooted pealehele
 * @param {Array} products - Tootemassiiv API-st
 */
export function renderAllProducts(products) {
  const container = document.querySelector("#product-list");
  if (!container) return;

  // Puhastame konteineri enne uut renderdust
  container.innerHTML = "";

  products.forEach((product) => {
    // Kontrollime, kas toode on lemmikutes (et näidata õiget südant)
    const isFavorite = favorites.some(f => f.id === product.id);

    const card = document.createElement("div");
    card.className = "product-card";

    // Toote kaardi struktuur (pilt ja süda ühes konteineris)
    card.innerHTML = `
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy">
        <div class="fav-icon" title="${isFavorite ? 'Eemalda lemmikutest' : 'Lisa lemmikutesse'}">
          ${isFavorite ? '❤️' : '🤍'}
        </div>
      </div>
      <h3>${product.title}</h3>
      <div class="card-footer">
        <p>${product.price.toFixed(2)} €</p>
        <button class="add-to-cart">Lisa ostukorvi</button>
      </div>
    `;

    // 1. LEMMIKUTE (SÜDAME) LOOGIKA
    const favIcon = card.querySelector(".fav-icon");
    favIcon.addEventListener("click", (e) => {
      e.stopPropagation(); // Takistab detailvaate avanemist
      
      // Kasutame state.js uut toggle funktsiooni (salvestab automaatselt)
      const wasAdded = toggleFavorite(product);
      
      // Muudame visuaali vastavalt tulemusele
      favIcon.innerText = wasAdded ? '❤️' : '🤍';
      favIcon.title = wasAdded ? 'Eemalda lemmikutest' : 'Lisa lemmikutesse';
      
      if (wasAdded) {
        showHeartAnimation();
      }
    });

    // 2. OSTUKORVI LISAMISE LOOGIKA
    const cartBtn = card.querySelector(".add-to-cart");
    cartBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Takistab detailvaate avanemist
      
      cart.addProduct(product, 1); // Salvestab automaatselt localStorage-isse
      updateCartStatus();          // Uuendab numbrit päises
      showCartAnimation();         // Näitab animatsiooni
    });

    // 3. DETAILVAATE AVAMINE
    // Avame detailid ainult siis, kui vajutatakse kaardile, aga mitte nupule või südamele
    card.addEventListener("click", (e) => {
      const isButton = e.target.closest('button');
      const isIcon = e.target.closest('.fav-icon');
      
      if (!isButton && !isIcon) {
        renderProductDetails(product);
      }
    });

    container.appendChild(card);
  });
}