import { Product } from "./product.js";
import { Cart } from "./cart.js";
import { Customer } from "./customer.js";


const laptop = new Product(1, "Sülearvuti Windows 11 Pro", 999.99, "Arvutid");
const phone = new Product(2, "iPhone 17", 1199.99, "Nutitelefonid");

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