const BASE_URL = 'http://localhost:4000/api';

export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/categories`);
  return res.json();
}

export async function fetchProductsByCategory(category) {
  const res = await fetch(`${BASE_URL}/products/category/${category}`);
  return res.json();
}

export async function fetchProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return res.json();
}

export async function fetchFavorites(customerId) {
  const res = await fetch(`${BASE_URL}/favorites/${customerId}`);
  return res.json();
}

export async function saveFavoriteToServer(customerId, productId) {
  const res = await fetch(`${BASE_URL}/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ customerId, productId }),
  });
  return res.json();
}

// Kustutame lemmiku serverist (DELETE meetod)
export async function deleteFavoriteFromServer(customerId, productId) {
  const res = await fetch(`${BASE_URL}/favorites`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ customerId, productId }),
  });
  return res.json();
}