import { Cart } from "./constructors/cart.js";
import { Customer } from "./constructors/customer.js";
import { fetchProducts } from "./api.js";
import { renderAllProducts } from "./Allviews/allProductsView.js";
import { renderCart } from "./Allviews/cartView.js";
import { renderFavorites } from "./Allviews/favoritesView.js";

if (!sessionStorage.getItem("customerId")) {
  sessionStorage.setItem(
    "customerId",
    "user_" + Math.random().toString(36).substring(2, 9)
  );
}
export const currentCustomerId = sessionStorage.getItem("customerId");

export const cart = new Cart();
const savedCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
if (savedCart.length > 0) {
  cart.items = savedCart;
}

export const favorites = [];
export const customer = new Customer("Oskar Tallo");
export let products = [];

export function saveCartToLocal(cartItems) {
  localStorage.setItem("shoppingCart", JSON.stringify(cartItems));
}

async function initApp() {
  try {
    products = await fetchProducts();
    if (products) {
      renderAllProducts(products);
    }
  } catch (err) {
    console.error("Viga andmete laadimisel:", err);
  }
}

initApp();

document.querySelector("#nav-home").addEventListener("click", (e) => {
  e.preventDefault();
  toggleView("product-list");
});

document.querySelector("#nav-brand").addEventListener("click", (e) => {
  e.preventDefault();
  toggleView("product-list");
});

document.querySelector("#nav-cart").addEventListener("click", (e) => {
  e.preventDefault();
  toggleView("cart-view");
  renderCart();
});

document.querySelector("#nav-favorites").addEventListener("click", (e) => {
  e.preventDefault();
  toggleView("favorites-view");
  renderFavorites();
});

function toggleView(viewId) {
  const views = [
    "product-list",
    "product-details",
    "cart-view",
    "favorites-view",
  ];
  views.forEach((id) => {
    const el = document.querySelector(`#${id}`);
    if (el)
      el.style.display =
        id === viewId ? (id === "product-list" ? "flex" : "block") : "none";
  });
}
