export class Product {
    constructor(id, title, price, category) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.category = category;
    }

    describe() {
        return `${this.title} | Hind: ${this.price}€ | Kategooria: ${this.category}`;
    }

    static discountedPrice(price, percent) {
        const discount = price - (price * (percent / 100));
        return Number(discount.toFixed(2));

    }
}