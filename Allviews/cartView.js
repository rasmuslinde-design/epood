import { cart } from "../state.js";
import { showView } from "../main.js";
import { updateCartStatus } from "./uiHelpers.js";

export function renderCart() {
  const container = document.querySelector("#cart-view");
  if (!container) return;

  showView("cart-view", "Sinu ostukorv");

  if (cart.items.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 50px; background: white; border-radius: 8px;">
        <p style="font-size: 1.2rem; margin-bottom: 20px;">Sinu ostukorv on tühi.</p>
        <button id="go-home-btn" style="padding: 10px 20px; cursor: pointer; background: #333; color: white; border: none; border-radius: 5px;">Tagasi poodi</button>
      </div>`;

    document.getElementById("go-home-btn").onclick = () => {
      document.getElementById("nav-home").click();
    };
    return;
  }

  container.innerHTML = `
    <div class="cart-container-new">
      <div class="cart-header-row">
        <span>Toode</span>
        <span class="hide-mobile">Hind</span>
        <span>Kogus</span>
        <span>Kokku</span>
        <span></span>
      </div>
      <div class="cart-items-list">
        ${cart.items
          .map(
            (item) => `
          <div class="cart-custom-row" data-id="${item.id}">
            <div class="cart-product-info">
              <img src="${item.image}" alt="${
              item.title
            }" class="cart-thumbnail">
              <div class="cart-text">
                <span class="item-title">${item.title}</span>
                <span class="mobile-price">${item.price.toFixed(2)} €</span>
              </div>
            </div>
            <div class="cart-price-col hide-mobile">${item.price.toFixed(
              2
            )} €</div>
            <div class="cart-qty-col">
              <div class="qty-stepper">
                <button class="qty-step-btn minus" data-id="${
                  item.id
                }">−</button>
                <span class="qty-num">${item.quantity}</span>
                <button class="qty-step-btn plus" data-id="${
                  item.id
                }">+</button>
              </div>
            </div>
            <div class="cart-total-col">
              <strong>${(item.price * item.quantity).toFixed(2)} €</strong>
            </div>
            <div class="cart-remove-col">
              <button class="cart-del-btn" data-id="${
                item.id
              }" title="Eemalda">✕</button>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
      <div class="cart-summary-box">
        <div class="cart-total-line">
          <span>Summa kokku:</span>
          <span class="final-price">${cart.getTotalPrice().toFixed(2)} €</span>
        </div>
        <button class="checkout-confirm-btn">Vormista tellimus</button>
      </div>
    </div>
  `;

  // --- Koguste muutmine ---
  container.querySelectorAll(".qty-step-btn").forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      const id = parseInt(btn.dataset.id);
      const delta = btn.classList.contains("plus") ? 1 : -1;
      cart.updateQuantity(id, delta);
      updateCartStatus();
      renderCart();
    };
  });

  // --- Üksiku toote eemaldamine ---
  container.querySelectorAll(".cart-del-btn").forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      const id = parseInt(btn.dataset.id);
      cart.removeItem(id);
      updateCartStatus();
      renderCart();
    };
  });

  const checkoutBtn = container.querySelector(".checkout-confirm-btn");
  if (checkoutBtn) {
    checkoutBtn.onclick = () => {
      alert("Täname ostu eest! Sinu tellimus on edukalt sooritatud.");

      cart.items = [];

      localStorage.setItem("cart", JSON.stringify([]));

      updateCartStatus();
      renderCart();
    };
  }
}
