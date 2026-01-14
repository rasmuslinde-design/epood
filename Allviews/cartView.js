import { cart } from "../state.js";
import { showView } from "../main.js";
import { updateCartStatus } from "./uiHelpers.js";

export function renderCart() {
  const container = document.querySelector("#cart-view");
  showView("cart-view", "Sinu ostukorv");

  if (cart.items.length === 0) {
    container.innerHTML = "<p style='text-align:center; padding:20px;'>Ostukorv on tühi.</p>";
    return;
  }

  container.innerHTML = cart.items.map(item => `
    <div class="cart-item">
      <img src="${item.image}" class="cart-image">
      <p>${item.title} (${item.quantity} tk)</p>
      <div class="cart-controls">
        <button class="decrease" data-id="${item.id}">-</button>
        <button class="increase" data-id="${item.id}">+</button>
        <button class="remove" data-id="${item.id}">Eemalda</button>
      </div>
      <p>${(item.price * item.quantity).toFixed(2)} €</p>
    </div>
  `).join("") + `
    <div style="text-align:right; padding:20px;">
      <h3>Kokku: ${cart.getTotalPrice().toFixed(2)} €</h3>
      <button id="checkout-btn">Maksa</button>
    </div>
  `;

  // Nuppude loogika
  container.querySelectorAll(".increase").forEach(btn => {
    btn.onclick = () => { cart.updateQuantity(btn.dataset.id, 1); updateCartStatus(); renderCart(); };
  });
  container.querySelectorAll(".decrease").forEach(btn => {
    btn.onclick = () => { cart.updateQuantity(btn.dataset.id, -1); updateCartStatus(); renderCart(); };
  });
  container.querySelectorAll(".remove").forEach(btn => {
    btn.onclick = () => { cart.removeItem(btn.dataset.id); updateCartStatus(); renderCart(); };
  });
}