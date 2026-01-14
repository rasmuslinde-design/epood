import { cart } from "../state.js";

export function updateCartStatus() {
  const cartStatus = document.getElementById("cart-status");
  if (cartStatus) {
    const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cartStatus.innerText = `🛒 ${count}`;
  }
}

export function showCartAnimation() {
  const anim = document.createElement("div");
  anim.className = "cart-animation";
  anim.innerText = "Lisatud korvi! 🚀";
  document.body.appendChild(anim);
  setTimeout(() => anim.remove(), 1000);
}

export function showHeartAnimation() {
  const anim = document.createElement("div");
  anim.className = "heart-animation";
  anim.innerText = "❤️";
  document.body.appendChild(anim);
  setTimeout(() => anim.remove(), 1000);
}
