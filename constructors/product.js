export class Product {
    constructor(id, title, price, category, image) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.category = category;
        this.image = image;
    }

    describe() {
        return `${this.title} | Hind: ${this.price}€ | Kategooria: ${this.category}`;
    }

    static discountedPrice(price, percent) {
        const discount = price - (price * (percent / 100));
        return Number(discount.toFixed(2));

    }
}