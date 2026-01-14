import { favorites, toggleFavorite } from "../state.js";
import { showView } from "../main.js";

export function renderFavorites() {
  const container = document.querySelector("#favorites-view");
  showView("favorites-view", "Sinu lemmikud");

  if (favorites.length === 0) {
    container.innerHTML = "<p style='text-align:center; padding:20px;'>Sul pole veel lemmikuid.</p>";
    return;
  }

  container.innerHTML = favorites.map(item => `
    <div class="favorite-item">
      <img src="${item.image}" class="favorite-image">
      <p>${item.title}</p>
      <button class="remove-fav" data-id="${item.id}">Eemalda</button>
    </div>
  `).join("");

  container.querySelectorAll(".remove-fav").forEach(btn => {
    btn.onclick = () => {
      const product = favorites.find(f => f.id == btn.dataset.id);
      toggleFavorite(product);
      renderFavorites();
    };
  });
}