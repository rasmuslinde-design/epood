// fakestoreapist tõmban alla tooted ja runnin npm seed.js ühekorra

const fs = require('fs');

async function fetchAndSeed() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        
        const data = {
            products: products,
            orders: [],
            favorites: {}
        };

        fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
        console.log('✅ Andmed FakeStoreAPI-st edukalt salvestatud data.json faili!');
    } catch (error) {
        console.error('❌ Viga andmete toomisel:', error);
    }
}

fetchAndSeed();