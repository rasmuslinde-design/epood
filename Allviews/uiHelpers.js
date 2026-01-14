import { cart } from "../state.js";

/**
 * Uuendab päises olevat ostukorvi ikooni ja toodete arvu
 */
export function updateCartStatus() {
  const badge = document.getElementById("cart-status");
  if (badge) {
    // Kutsume nüüd state.js-is olevat getTotalCount meetodit
    const count = cart.getTotalCount();
    badge.innerHTML = `🛒 ${count}`;
  }
}

/**
 * Tekitab lendava emoji animatsiooni
 */
export function showCartAnimation() {
  createAnimation("🛒");
}

export function showHeartAnimation() {
  createAnimation("❤️");
}

function createAnimation(emoji) {
  const el = document.createElement("div");
  el.className = emoji === "❤️" ? "heart-animation" : "cart-animation";
  el.innerText = emoji;
  
  el.style.left = "50%";
  el.style.top = "50%";
  
  document.body.appendChild(el);
  
  setTimeout(() => {
    el.remove();
  }, 1000);
}