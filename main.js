import { Cart } from "./constructors/cart.js";
import { Customer } from "./constructors/customer.js";
import { fetchProducts, fetchData } from './api.js';

import { renderAllProducts } from "./Allviews/allProductsView.js";
import { renderCart } from "./Allviews/cartView.js";
import { renderFavorites } from "./Allviews/favoritesView.js";

export const cart = new Cart();
export const favorites = [];
export const customer = new Customer("Oskar Tallo");

let products = [];

async function initApp() {
    console.log("Rakendus käivitub...");
    
    products = await fetchProducts();
    
    if (products) {
        console.log("Tooted laetud:", products);
        renderAllProducts(products);
    }

    const data = await fetchData();
    if (data) {
        console.log("Kõik andmed bäkendist käes:", data);
    }
}

initApp();


document.querySelector("#nav-home").addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector("#product-list").style.display = "flex";
  document.querySelector("#product-details").style.display = "none";
  document.querySelector("#cart-view").style.display = "none";
  document.querySelector("#favorites-view").style.display = "none";
});

document.querySelector("#nav-brand").addEventListener("click", (event) => {
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

export { products };