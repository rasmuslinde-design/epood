const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const DATA_FILE = path.join(__dirname, "data.json");

const readData = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return { products: [], favorites: {}, cart: {} };
  }
};

const saveData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// --- TOODETE API ---
app.get("/api/products", (req, res) => res.json(readData().products));

app.get("/api/categories", (req, res) => {
  const products = readData().products;
  const categories = [...new Set(products.map((p) => p.category))];
  res.json(categories);
});

// Filtreerimine kategooria järgi
app.get("/api/products/category/:category", (req, res) => {
  const products = readData().products;
  const filtered = products.filter((p) => p.category === req.params.category);
  res.json(filtered);
});

// --- LEMMIKUTE API ---
app.get("/api/favorites/:customerId", (req, res) => {
  const data = readData();
  res.json(data.favorites?.[req.params.customerId] || []);
});

app.post("/api/favorites", (req, res) => {
  const { customerId, productId } = req.body;
  const data = readData();
  data.favorites = data.favorites || {};
  data.favorites[customerId] = data.favorites[customerId] || [];
  if (!data.favorites[customerId].includes(productId)) {
    data.favorites[customerId].push(productId);
  }
  saveData(data);
  res.status(201).json(data.favorites[customerId]);
});

app.delete("/api/favorites", (req, res) => {
  const { customerId, productId } = req.body;
  const data = readData();
  if (data.favorites?.[customerId]) {
    data.favorites[customerId] = data.favorites[customerId].filter(id => id !== productId);
    saveData(data);
  }
  res.json(data.favorites?.[customerId] || []);
});

// --- OSTUKORVI API ---
app.get("/api/cart/:customerId", (req, res) => {
  const data = readData();
  res.json(data.cart?.[req.params.customerId] || []);
});

app.post("/api/cart", (req, res) => {
  const { customerId, cartItems } = req.body;
  const data = readData();
  data.cart = data.cart || {};
  data.cart[customerId] = cartItems;
  saveData(data);
  res.status(201).json(data.cart[customerId]);
});

// SPA routing: Peab olema faili lõpus
app.get(/.*/, (req, res) => {
  if (req.path.includes(".")) return res.status(404).send("Faili ei leitud");
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log(`🚀 Server: http://localhost:${PORT}`));