const API_URL = "http://localhost:4000/api";

// Kõik tooted
export async function fetchProducts() {
  const r = await fetch(`${API_URL}/products`);
  return r.json();
}

// Kõik kategooriad
export async function fetchCategories() {
  const r = await fetch(`${API_URL}/categories`);
  return r.json();
}

// Tooted kategooria järgi (SEE OLI PUUDU)
export async function fetchProductsByCategory(category) {
  const r = await fetch(`${API_URL}/products/category/${encodeURIComponent(category)}`);
  return r.json();
}

// Lemmikud
export async function fetchFavorites(customerId) {
  const r = await fetch(`${API_URL}/favorites/${customerId}`);
  return r.json();
}

export async function saveFavoriteToServer(customerId, productId) {
  const r = await fetch(`${API_URL}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerId, productId })
  });
  return r.json();
}

export async function deleteFavoriteFromServer(customerId, productId) {
  const r = await fetch(`${API_URL}/favorites`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerId, productId })
  });
  return r.json();
}

// Ostukorv
export async function fetchCartFromServer(customerId) {
  const r = await fetch(`${API_URL}/cart/${customerId}`);
  return r.json();
}

export async function saveCartToServer(customerId, cartItems) {
  const r = await fetch(`${API_URL}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerId, cartItems })
  });
  return r.json();
}