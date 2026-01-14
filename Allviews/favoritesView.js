import { favorites, toggleFavorite } from "../state.js";
import { showView } from "../main.js";

export function renderFavorites(allProducts) {
  const container = document.querySelector("#favorites-view");
  if (!container) return;

  showView("favorites-view", "Sinu lemmikud");

  const favoriteProducts = allProducts.filter(product => 
    favorites.includes(product.id)
  );

  if (favoriteProducts.length === 0) {
    container.innerHTML = `
      <div class="fav-container-new" style="text-align:center; padding:50px;">
        <p style="color: #666; font-size: 1.1rem;">Sul pole veel lemmikuid.</p>
      </div>`;
    return;
  }

  container.innerHTML = `
    <div class="fav-container-new">
      <div class="fav-header-row">
        <span>Toode</span>
        <span class="hide-mobile">Hind</span>
        <span style="text-align: right;">Eemalda</span>
      </div>
      
      <div class="fav-list-content">
        ${favoriteProducts.map(product => `
          <div class="fav-custom-row">
            <div class="fav-product-info">
              <img src="${product.image}" class="fav-thumbnail" alt="${product.title}">
              <span style="font-weight: 500;">${product.title}</span>
            </div>
            
            <div class="hide-mobile">
              <strong>${product.price.toFixed(2)} €</strong>
            </div>
            
            <div style="text-align: right;">
              <button class="fav-remove-btn" data-id="${product.id}" title="Eemalda lemmikutest">
                ✕
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  container.querySelectorAll(".fav-remove-btn").forEach(btn => {
    btn.onclick = async (e) => {
      const productId = parseInt(btn.dataset.id);
      const product = allProducts.find(p => p.id === productId);
      if (product) {
        await toggleFavorite(product);
        renderFavorites(allProducts);
      }
    };
  });
}