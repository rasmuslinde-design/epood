import { Order } from "./constructors/order.js";
import { saveOrder } from '../api.js';

export class Customer {
  constructor(name) {
    this.name = name;
    this.orderHistory = [];
  }

  placeOrder(cart) {
    const order = new Order(cart);
    this.orderHistory.push(order);
    return order;
  }

  printOrderHistory() {
    console.log(`Tellimuste ajalugu: ${this.name}`);
    this.orderHistory.forEach((order, index) => {
      console.log(
        `${
          index + 1
        }. Kuupäev: ${order.orderDate.toLocaleString()} | Summa: ${order.cart.calculateTotal()}€`
      );
    });
  }
}

export async function submitOrder(cartItems, customerInfo) {
    const order = {
        customer: customerInfo,
        items: cartItems,
        total: cartItems.reduce((sum, item) => sum + item.price, 0)
    };

    const result = await saveOrder(order);
    
    if (result) {
        alert('Tellimus edukalt saadetud!');
    }
}