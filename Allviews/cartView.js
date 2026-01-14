import { cart } from "../state.js";
import { updateCartStatus } from "./uiHelpers.js";

export function renderCart() {
  const container = document.querySelector("#cart-view");
  container.innerHTML = "<h2>Sinu ostukorv</h2>";

  if (cart.items.length === 0) {
    container.innerHTML += "<p>Ostukorv on tühi.</p>";
    return;
  }

  const itemsContainer = document.createElement("div");
  itemsContainer.className = "cart-items-list";

  cart.items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.product.image}" alt="${item.product.title}" class="cart-image">
      <div style="flex: 1;">
        <p><strong>${item.product.title}</strong></p>
        <p>${item.product.price.toFixed(2)} €</p>
      </div>
      <div class="cart-controls">
        <button class="decrease">-</button>
        <span style="margin: 0 10px;">${item.quantity}</span>
        <button class="increase">+</button>
      </div>
      <button class="remove" style="margin-left: 20px; background: #ff4444; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Eemalda</button>
    `;

    div.querySelector(".increase").addEventListener("click", () => {
      item.quantity++;
      updateCartStatus();
      renderCart();
    });

    div.querySelector(".decrease").addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cart.removeProduct(item.product.id);
      }
      updateCartStatus();
      renderCart();
    });

    div.querySelector(".remove").addEventListener("click", () => {
      cart.removeProduct(item.product.id);
      updateCartStatus();
      renderCart();
    });

    itemsContainer.appendChild(div);
  });

  container.appendChild(itemsContainer);

  // Kokkuvõte ja Maksma nupp
  const summary = document.createElement("div");
  summary.style.marginTop = "30px";
  summary.style.padding = "20px";
  summary.style.background = "#eee";
  summary.style.borderRadius = "10px";
  summary.style.textAlign = "right";

  summary.innerHTML = `
    <h3>Kokku: ${cart.calculateTotal().toFixed(2)} €</h3>
    <button id="checkout-btn" style="background: #28a745; color: white; padding: 15px 30px; border: none; border-radius: 8px; font-size: 1.1rem; cursor: pointer; font-weight: bold;">
      MAKSA NÜÜD
    </button>
  `;

  summary.querySelector("#checkout-btn").addEventListener("click", () => {
    alert("💸 Makse sooritatud! Täname ostu eest!");
    cart.items = []; // Tühjendame andmed
    updateCartStatus();
    renderCart(); // Joonistame tühja korvi
  });

  container.appendChild(summary);
}