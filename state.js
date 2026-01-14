import { 
  saveFavoriteToServer, 
  deleteFavoriteFromServer, 
  fetchFavorites 
} from "./api.js";

// --- OSTUKORVI STAATIK (LocalStorage) ---
export const cart = {
  items: JSON.parse(localStorage.getItem("cart")) || [],
  
  save() {
    localStorage.setItem("cart", JSON.stringify(this.items));
  },


  getTotalCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  addProduct(product, quantity = 1) {
    const existing = this.items.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ ...product, quantity });
    }
    this.save();
  },

  updateQuantity(productId, delta) {
    const item = this.items.find(i => i.id == productId);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.items = this.items.filter(i => i.id != productId);
      }
    }
    this.save();
  },

  removeItem(productId) {
    this.items = this.items.filter(i => i.id != productId);
    this.save();
  },

  getTotalPrice() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
};

// --- LEMMIKUTE STAATIK (Serveri suhtlus) ---

// toodete ID
export let favorites = [];

const getCustomerId = () => sessionStorage.getItem("clientId");

export async function loadFavorites() {
  const customerId = getCustomerId();
  if (customerId) {
    try {
      favorites = await fetchFavorites(customerId);
    } catch (error) {
      console.error("Viga lemmikute laadimisel:", error);
      favorites = [];
    }
  }
}

export async function toggleFavorite(product) {
  const customerId = getCustomerId();
  if (!customerId) return false;

  const productId = product.id;
  const isFav = favorites.includes(productId);

  if (isFav) {
    favorites = await deleteFavoriteFromServer(customerId, productId);
    return false; 
  } else {
    favorites = await saveFavoriteToServer(customerId, productId);
    return true; 
  }
}