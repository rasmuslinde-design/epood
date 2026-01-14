const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Staatilised failid
app.use(express.static(__dirname));

const readData = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, "data.json"), "utf8");
    return JSON.parse(data);
  } catch {
    return { products: [], favorites: {} };
  }
};

// ---------- API ----------

app.get("/api/products", (req, res) => {
  res.json(readData().products);
});

app.get("/api/categories", (req, res) => {
  const products = readData().products;
  const categories = [...new Set(products.map((p) => p.category))];
  res.json(categories);
});

app.get("/api/products/category/:category", (req, res) => {
  const products = readData().products;
  res.json(products.filter((p) => p.category === req.params.category));
});

app.get("/api/products/:id", (req, res) => {
  const product = readData().products.find((p) => p.id == req.params.id);
  product
    ? res.json(product)
    : res.status(404).json({ error: "Toodet ei leitud" });
});

app.get("/api/favorites/:customerId", (req, res) => {
  const data = readData();
  res.json(data.favorites?.[req.params.customerId] || []);
});

app.post("/api/favorites", (req, res) => {
  const { customerId, productId } = req.body;
  const data = readData();

  data.favorites ??= {};
  data.favorites[customerId] ??= [];

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
  const data = readData();

  if (data.favorites?.[customerId]) {
    data.favorites[customerId] = data.favorites[customerId].filter(
      (id) => id !== productId
    );

    fs.writeFileSync(
      path.join(__dirname, "data.json"),
      JSON.stringify(data, null, 2)
    );
  }

  res.json(data.favorites?.[customerId] || []);
});

// ---------- SPA ROUTING (EXPRESS 5 FIX) ----------
// REGEX CATCH-ALL — AINUS ÕIGE VIIS
app.get(/.*/, (req, res) => {
  if (req.path.includes(".")) {
    return res.status(404).send("Faili ei leitud");
  }

  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server töötab: http://localhost:${PORT}`);
});
