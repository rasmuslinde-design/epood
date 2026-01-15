const fs = require("fs");

async function fetchAndSeed() {
  try {
    // 1. Tõmbame andmed API-st
    const response = await fetch("https://fakestoreapi.com/products");
    const apiProducts = await response.json();

    // 2. uus struktuur juhuks, kui faili veel pole
    let currentData = {
      products: [],
      orders: [],
      favorites: {},
    };

    // 3. loeme kas data.json olemas juba ja võrdleme
    if (fs.existsSync("./data.json")) {
      const fileContent = fs.readFileSync("./data.json", "utf-8");
      if (fileContent) {
        currentData = JSON.parse(fileContent);
      }
    }

    // 4. uute toodete filtreerimine (kontrollime ID põhjal)
    let addedCount = 0;
    apiProducts.forEach((apiProduct) => {
      const exists = currentData.products.find((p) => p.id === apiProduct.id);

      if (!exists) {
        currentData.products.push(apiProduct);
        addedCount++;
      }
    });

    // uuendatud andmed (säilitades orders ja favorites)
    fs.writeFileSync("./data.json", JSON.stringify(currentData, null, 2));

    if (addedCount > 0) {
      console.log(
        `✅ Lisati ${addedCount} uut toodet. Kokku on nüüd ${currentData.products.length} toodet.`
      );
    } else {
      console.log("ℹ️ Kõik tooted on juba olemas, midagi ei lisatud.");
    }
  } catch (error) {
    console.error("❌ Viga andmete töötlemisel:", error);
  }
}

fetchAndSeed();
