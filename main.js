import { Product } from "/epood/constructors/product.js";
import { Cart } from "/epood/constructors/cart.js";
import { Customer } from "/epood/constructors/customer.js";

import { allProductsView } from "/epood/All views/allProductsView.js";

document.body.innerHTML += allProductsView;

const products = [
  new Product(1, "Sülearvuti Windows 11 Pro", 999.99, "Arvutid"),
  new Product(2, "iPhone 17", 1199.99, "Nutitelefonid"),
  new Product(3, "MacBook Pro 18", 2499.99, "Arvutid"),
  new Product(4, "Samsung Galaxy S26", 1099.99, "Nutitelefonid"),
  new Product(5, "AirPods Ultra", 399.99, "Tarvikud")
];

const laptop = products[0];
const phone = products[1];

console.log(laptop.describe());
console.log(phone.describe());

console.log("10% Allahindlus:", Product.discountedPrice(laptop.price, 10));

const cart = new Cart();
cart.addProduct(laptop, 1);
cart.addProduct(phone, 2);

console.log("Kogusumma:", cart.calculateTotal());
console.log("Kõik tooted ostukorvis:", cart.totalItems);

const customer = new Customer("Oskar Tallo");
customer.placeOrder(cart);
customer.printOrderHistory();

function renderProducts() {
  const container = document.querySelector("#product-list");
  container.innerHTML = "";

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <h3>${p.title}</h3>
      <p>Hind: €${p.price.toFixed(2)}</p>
      <button class="add-to-cart">Lisa korvi</button>
      <button class="add-to-favorites">Lisa lemmikutesse</button>
    `;

    container.appendChild(card);
  });
}

renderProducts();
