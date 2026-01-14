// state.js
const loadFromStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const cart = {
  items: loadFromStorage('cartItems') || [],
  
  addProduct(product, quantity) {
    const existing = this.items.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      // Oluline: loome uue objekti, et vältida viitade probleeme
      this.items.push({ ...product, quantity: quantity });
    }
    this.save();
    console.log("Toode lisatud. Korv:", this.items); // Kontrolliks
  },

  updateQuantity(productId, delta) {
    const item = this.items.find(item => item.id == productId);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) this.removeItem(productId);
    }
    this.save();
  },

  removeItem(productId) {
    this.items = this.items.filter(item => item.id != productId);
    this.save();
  },

  getTotalCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  getTotalPrice() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  save() {
    saveToStorage('cartItems', this.items);
  }
};

export let favorites = loadFromStorage('favorites') || [];

export const toggleFavorite = (product) => {
  const index = favorites.findIndex(f => f.id === product.id);
  let added = false;
  if (index === -1) {
    favorites.push(product);
    added = true;
  } else {
    favorites.splice(index, 1);
  }
  saveToStorage('favorites', favorites);
  return added;
};