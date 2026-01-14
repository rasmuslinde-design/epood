const API_URL = 'http://localhost:4000/api';

//(tooted + tellimused)
export const fetchData = async () => {
    try {
        const response = await fetch(`${API_URL}/data`);
        if (!response.ok) throw new Error('Andmete laadimine ebaõnnestus');
        return await response.json();
    } catch (error) {
        console.error("Viga andmete laadimisel:", error);
    }
};

export const fetchProducts = async () => {
    const data = await fetchData();
    return data ? data.products : [];
};

// Funktsioon tellimuse saatmiseks
export const saveOrder = async (orderData) => {
    try {
        const response = await fetch(`${API_URL}/order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData),
        });
        return await response.json();
    } catch (error) {
        console.error("Tellimuse salvestamise viga:", error);
    }
};