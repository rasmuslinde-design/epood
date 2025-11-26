const uuidv4 = require("uuid/v4")

class Product {
    constructor(id, title, price, category) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.category = category;
    }
    describe() {
        return `${this.title} maksab €${this.price} ja kuulub kategooriasse ${this.category}.`;
    }
}