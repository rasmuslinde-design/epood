const API_URL = 'http://localhost:4000/api';

export async function fetchProducts() {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error('Toodete laadimine ebaõnnestus');
    return await response.json();
}

export async function fetchCategories() {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) throw new Error('Kategooriate laadimine ebaõnnestus');
    return await response.json();
}

export async function fetchProductsByCategory(category) {
    const response = await fetch(`${API_URL}/products/category/${encodeURIComponent(category)}`);
    if (!response.ok) throw new Error('Kategooria toodete laadimise viga');
    return await response.json();
}

export async function fetchProductById(id) {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) throw new Error('Toodet ei leitud');
    return await response.json();
}

export async function fetchFavorites(customerId) {
    const response = await fetch(`${API_URL}/favorites/${customerId}`);
    if (!response.ok) return [];
    return await response.json();
}

export async function addFavorite(customerId, productId) {
    const response = await fetch(`${API_URL}/favorites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, productId })
    });
    return await response.json();
}

export async function removeFavorite(customerId, productId) {
    const response = await fetch(`${API_URL}/favorites`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, productId })
    });
    return await response.json();
}

export async function saveOrder(orderData) {
    const response = await fetch(`${API_URL}/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    });
    if (!response.ok) throw new Error('Tellimuse salvestamine ebaõnnestus');
    return await response.json();
}