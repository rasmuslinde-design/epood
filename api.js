const BASE_URL = 'https://fakestoreapi.com';

export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/products/categories`);
  return res.json();
}

export async function fetchProductsByCategory(category) {
  const res = await fetch(`${BASE_URL}/products/category/${category}`);
  return res.json();
}

// Ülesanne 2.4: Ühe toote andmed ID põhjal
export async function fetchProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return res.json();
}