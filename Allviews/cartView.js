import { cart } from "../state.js";
import { showView } from "../main.js";
import { updateCartStatus } from "./uiHelpers.js";

export function renderCart() {
  const container = document.querySelector("#cart-view");
  showView("cart-view", "Sinu ostukorv");

  if (cart.items.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:40px;">
        <p>Ostukorv on tühi.</p>
        <button id="go-shopping" style="margin-top:20px; padding:10px 20px; cursor:pointer;">Mine poodi</button>
      </div>
    `;
    document.getElementById("go-shopping").onclick = () => {
      document.querySelector('nav a').click(); // Simuleerib "Kodu" vajutust
    };
    return;
  }

  const itemsHTML = cart.items.map(item => `
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
  `).join("");

  container.innerHTML = `
    <div class="cart-container">
      ${itemsHTML}
      <div style="text-align:right; padding:20px; border-top:2px solid #333; margin-top:20px;">
        <h3>Kokku: ${cart.getTotalPrice().toFixed(2)} €</h3>
        <button id="checkout-btn" style="background:#28a745; color:white; padding:15px 30px; border:none; border-radius:8px; font-weight:bold; cursor:pointer; font-size:1.1rem; width:100%;">
          MAKSA NÜÜD
        </button>
      </div>
    </div>
  `;

  // --- NUPPUDE KUULAJAD ---
  container.querySelectorAll(".increase").forEach(btn => {
    btn.onclick = () => { cart.updateQuantity(btn.dataset.id, 1); updateCartStatus(); renderCart(); };
  });

  container.querySelectorAll(".decrease").forEach(btn => {
    btn.onclick = () => { cart.updateQuantity(btn.dataset.id, -1); updateCartStatus(); renderCart(); };
  });

  container.querySelectorAll(".remove").forEach(btn => {
    btn.onclick = () => { cart.removeItem(btn.dataset.id); updateCartStatus(); renderCart(); };
  });

  // MAKSA NUPP
  document.getElementById("checkout-btn").onclick = () => {
    alert(`Täname ostu eest! Teie tellimus summas ${cart.getTotalPrice().toFixed(2)} € on vastu võetud.`);
    cart.items = []; // Tühjenda korv
    cart.save(); // Salvesta tühjus brauserisse
    updateCartStatus();
    location.reload(); // Värskenda lehte, et minna tagasi algusesse
  };
}