import { 
  saveFavoriteToServer, deleteFavoriteFromServer, fetchFavorites,
  fetchCartFromServer, saveCartToServer 
} from "./api.js";

const getCustomerId = () => localStorage.getItem("userName") || sessionStorage.getItem("clientId");

export let favorites = [];

export const cart = {
  items: [],

  async load() {
    const id = getCustomerId();
    this.items = id ? await fetchCartFromServer(id) : [];
  },

  async save() {
    const id = getCustomerId();
    if (id) await saveCartToServer(id, this.items);
    localStorage.setItem("cart", JSON.stringify(this.items)); // Varukoopia
  },

  getTotalCount() {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  },

  getTotalPrice() {
    return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  },

  async addProduct(product, qty = 1) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) existing.quantity += qty;
    else this.items.push({ ...product, quantity: qty });
    await this.save();
  },

  async updateQuantity(id, delta) {
    const i = this.items.find(item => item.id == id);
    if (i) {
      i.quantity += delta;
      if (i.quantity <= 0) this.items = this.items.filter(item => item.id != id);
      await this.save();
    }
  },

  async removeItem(id) {
    this.items = this.items.filter(i => i.id != id);
    await this.save();
  }
};

export async function loadFavorites() {
  const id = getCustomerId();
  favorites = id ? await fetchFavorites(id) : [];
}

export async function toggleFavorite(product) {
  const id = getCustomerId();
  if (!id) return false;
  const isFav = favorites.includes(product.id);
  favorites = isFav 
    ? await deleteFavoriteFromServer(id, product.id) 
    : await saveFavoriteToServer(id, product.id);
  return !isFav;
}