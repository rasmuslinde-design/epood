import { Product } from "./constructors/product.js";
import { Cart } from "./constructors/cart.js";
import { Customer } from "./constructors/customer.js";

import { renderAllProducts } from "./Allviews/allProductsView.js";
import { renderCart } from "./Allviews/cartView.js";
import { renderFavorites } from "./Allviews/favoritesView.js";

export const cart = new Cart();
export const favorites = [];

const products = [
  new Product(1, "Sülearvuti Windows 11 Pro", 999.99, "Arvutid", "images/pilt1.jpg"),
  new Product(2, "iPhone 17", 1199.99, "Nutitelefonid", "images/pilt1.jpg"),
  new Product(3, "MacBook Pro 18", 2499.99, "Arvutid", "images/pilt1.jpg"),
  new Product(4, "Samsung Galaxy S26", 1099.99, "Nutitelefonid", "images/pilt1.jpg"),
  new Product(5, "AirPods Ultra", 399.99, "Tarvikud", "images/pilt1.jpg"),
  new Product(6, "Logitech MX Master 4", 99.99, "Tarvikud", "images/pilt1.jpg"),
  new Product(7, "Dell XPS 15", 1299.99, "Arvutid", "images/pilt1.jpg"),
  new Product(8, "Google Pixel 8", 899.99, "Nutitelefonid", "images/pilt1.jpg"),
  new Product(9, "Sony WH-1000XM5", 349.99, "Tarvikud", "images/pilt1.jpg"),
  new Product(10, "HP Spectre x360", 1399.99, "Arvutid", "images/pilt1.jpg"),
  new Product(11, "OnePlus 12", 799.99, "Nutitelefonid", "images/pilt1.jpg"),
  new Product(12, "Apple Watch Series 9", 499.99, "Tarvikud", "images/pilt1.jpg"),
];

const customer = new Customer("Oskar Tallo");

renderAllProducts(products);

document.querySelector("#nav-home").addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector("#product-list").style.display = "flex";
  document.querySelector("#product-details").style.display = "none";
  document.querySelector("#cart-view").style.display = "none";
  document.querySelector("#favorites-view").style.display = "none";
});

document.querySelector("#nav-cart").addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector("#product-list").style.display = "none";
  document.querySelector("#product-details").style.display = "none";
  document.querySelector("#favorites-view").style.display = "none";
  document.querySelector("#cart-view").style.display = "block";
  renderCart();
});

document.querySelector("#nav-favorites").addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector("#product-list").style.display = "none";
  document.querySelector("#product-details").style.display = "none";
  document.querySelector("#cart-view").style.display = "none";
  document.querySelector("#favorites-view").style.display = "block";
  renderFavorites();
});

export { products, customer };

document.querySelector("#nav-brand").addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector("#product-list").style.display = "flex";
  document.querySelector("#product-details").style.display = "none";
  document.querySelector("#cart-view").style.display = "none";
  document.querySelector("#favorites-view").style.display = "none";
});
