const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname));

app.get('/api/data', (req, res) => {
    const dataPath = path.join(__dirname, 'data.json');
    if (fs.existsSync(dataPath)) {
        res.sendFile(dataPath);
    } else {
        res.status(404).json({ error: "data.json puudu" });
    }
});

app.post('/api/order', (req, res) => {
    const dataPath = path.join(__dirname, 'data.json');
    fs.readFile(dataPath, 'utf8', (err, data) => {
        let jsonData = { products: [], orders: [] };
        if (!err && data) jsonData = JSON.parse(data);
        jsonData.orders.push({ id: Date.now(), ...req.body });
        fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Viga" });
            res.status(201).json({ message: "Salvestatud!" });
        });
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`✅ Server töötab: http://localhost:${PORT}`);
    console.log(`📁 Otsin faile siit: ${__dirname}`);
});