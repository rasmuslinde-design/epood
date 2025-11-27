import { Order } from './order.js';

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
                `${index + 1}. Kuupäev: ${order.orderDate.toLocaleString()} | Summa: ${order.cart.calculateTotal()}€`
            );
        });
    }
}