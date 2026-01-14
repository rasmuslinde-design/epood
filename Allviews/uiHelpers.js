import { cart } from "../state.js";

export function updateCartStatus() {
  const badge = document.getElementById("cart-status");
  if (badge) {
    badge.innerHTML = `🛒 ${cart.getTotalCount()}`;
  }
}

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
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}