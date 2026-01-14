import { fetchProducts } from "./api.js";
import { renderAllProducts } from "./Allviews/allProductsView.js";
import { renderCart } from "./Allviews/cartView.js";
import { renderFavorites } from "./Allviews/favoritesView.js";
import { updateCartStatus } from "./Allviews/uiHelpers.js";

let allProducts = []; 

export function showView(viewId, title) {
  const views = ["product-list", "product-details", "cart-view", "favorites-view"];
  
  views.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = (id === viewId) ? "block" : "none";
    }
  });

  const heading = document.querySelector("h2");
  if (heading) heading.textContent = title;
  window.scrollTo(0, 0);
}

async function init() {
  // 1. Laeme tooted
  allProducts = await fetchProducts();
  
  // 2. Kuvame esimesena pealehe
  showView("product-list", "Kõik tooted");
  renderAllProducts(allProducts);
  updateCartStatus();

  // 3. OSTUKORVI MULLI KLIKK
  const cartStatus = document.getElementById("cart-status");
  if (cartStatus) {
    cartStatus.onclick = (e) => {
      e.preventDefault();
      renderCart();
    };
  }

  // 4. LOGO KLIKK (Et ka logole vajutades saaks koju)
  const brand = document.getElementById("brand");
  if (brand) {
    brand.onclick = (e) => {
      e.preventDefault();
      showView("product-list", "Kõik tooted");
      renderAllProducts(allProducts);
    }
  }

  // 5. NAVIGATSIOONI LINGID (Kodu, Lemmikud jne)
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach(link => {
    link.onclick = (e) => {
      e.preventDefault();
      // Võtame teksti ja puhastame tühikutest ning muudame väiketähtedeks
      const text = e.target.innerText.trim().toLowerCase();
      
      console.log("Navigeerin siia:", text); // See aitab sul konsoolis näha, kas klikk toimib

      if (text.includes("kodu") || text.includes("tooted")) {
        showView("product-list", "Kõik tooted");
        renderAllProducts(allProducts);
      } else if (text.includes("lemmikud")) {
        renderFavorites();
      } else if (text.includes("ostukorv")) {
        renderCart();
      }
    };
  });
}

// Käivitame poe
init();