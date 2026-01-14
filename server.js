const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const readData = () => {
  const data = fs.readFileSync(path.join(__dirname, "data.json"), "utf8");
  return JSON.parse(data);
};

app.get("/api/products", (req, res) => {
  const data = readData();
  res.json(data.products);
});

app.get("/api/categories", (req, res) => {
  const data = readData();
  const categories = [...new Set(data.products.map((p) => p.category))];
  res.json(categories);
});

app.get("/api/products/category/:category", (req, res) => {
  const data = readData();
  const filtered = data.products.filter(
    (p) => p.category === req.params.category
  );
  res.json(filtered);
});

app.get("/api/products/:id", (req, res) => {
  const data = readData();
  const product = data.products.find((p) => p.id == req.params.id);
  product ? res.json(product) : res.status(404).send("Toodet ei leitud");
});

app.get("/api/favorites/:customerId", (req, res) => {
  const data = readData();
  if (!data.favorites) return res.json([]);
  res.json(data.favorites[req.params.customerId] || []);
});

app.post("/api/favorites", (req, res) => {
  const { customerId, productId } = req.body;
  let data = readData();
  if (!data.favorites) data.favorites = {};
  if (!data.favorites[customerId]) data.favorites[customerId] = [];
  if (!data.favorites[customerId].includes(productId)) {
    data.favorites[customerId].push(productId);
  }
  fs.writeFileSync(
    path.join(__dirname, "data.json"),
    JSON.stringify(data, null, 2)
  );
  res.status(201).json(data.favorites[customerId]);
});

app.delete("/api/favorites", (req, res) => {
  const { customerId, productId } = req.body;
  let data = readData();
  if (data.favorites && data.favorites[customerId]) {
    data.favorites[customerId] = data.favorites[customerId].filter(
      (id) => id !== productId
    );
    fs.writeFileSync(
      path.join(__dirname, "data.json"),
      JSON.stringify(data, null, 2)
    );
  }
  res.json(data.favorites ? data.favorites[customerId] || [] : []);
});

app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 http://localhost:${PORT}`);
});
