// state.js

// --- ABIUUDISED SALVESTAMISEKS ---

// Laeb andmed brauseri mälust
const loadFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Viga andmete laadimisel localStorage-ist:", error);
    return null;
  }
};

// Salvestab andmed brauseri mällu
const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Viga andmete salvestamisel localStorage-isse:", error);
  }
};

// --- OSTUKORVI LOOGIKA ---

export const cart = {
  // Laeb lehe avamisel salvestatud tooted või alustab tühja massiiviga
  items: loadFromStorage('cartItems') || [],

  // Lisa toode või suurenda kogust
  addProduct(product, quantity) {
    const existing = this.items.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      // Kasutame spread operatorit, et mitte muuta algset tooteobjekti
      this.items.push({ ...product, quantity });
    }
    this.save();
  },

  // Eemalda toode täielikult
  removeProduct(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.save();
  },

  // Muuda kogust (näiteks ostukorvi vaates + ja - nupud)
  updateQuantity(productId, newQuantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      item.quantity = newQuantity;
      // Kui kogus läheb nulli või alla selle, eemaldame toote
      if (item.quantity <= 0) {
        this.removeProduct(productId);
      }
    }
    this.save();
  },

  // Arvuta kokku toodete arv (mulli jaoks)
  getTotalCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  // Arvuta ostukorvi kogusumma
  getTotalPrice() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  // Salvesta praegune seis
  save() {
    saveToStorage('cartItems', this.items);
  }
};

// --- LEMMIKUTE LOOGIKA ---

// Kuna favorites on lihtne massiiv, siis exportime selle ja salvestusfunktsiooni eraldi
export let favorites = loadFromStorage('favorites') || [];

export const saveFavorites = () => {
  saveToStorage('favorites', favorites);
};

// Abifunktsioon lemmikute haldamiseks (et kood oleks puhtam)
export const toggleFavorite = (product) => {
  const index = favorites.findIndex(f => f.id === product.id);
  if (index === -1) {
    favorites.push(product);
    saveFavorites();
    return true; // Lisati
  } else {
    favorites.splice(index, 1);
    saveFavorites();
    return false; // Eemaldati
  }
};