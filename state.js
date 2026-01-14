export const cart = {
  items: [],
  addProduct(product, qty) {
    const existing = this.items.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity += qty;
    } else {
      this.items.push({ product, quantity: qty });
    }
  },
  removeProduct(productId) {
    this.items = this.items.filter(item => item.product.id !== productId);
  },
  calculateTotal() {
    return this.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }
};

export let favorites = [];