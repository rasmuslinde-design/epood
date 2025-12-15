import { cart } from "../main.js";

export function updateCartStatus() {
  const status = document.querySelector("#cart-status");
  if (status) {
    status.textContent = `🛒 ${cart.totalItems}`;
  }
}

export function showHeartAnimation() {
  const heart = document.createElement("div");
  heart.innerHTML = "❤️";
  heart.className = "heart-animation";
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 1000);
}

export function showCartAnimation() {
  const cartAnim = document.createElement("div");
  cartAnim.innerHTML = "🛒";
  cartAnim.className = "cart-animation";
  document.body.appendChild(cartAnim);

  setTimeout(() => cartAnim.remove(), 1000);
}
