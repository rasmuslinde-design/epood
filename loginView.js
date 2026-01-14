import { showView } from "../main.js";

export function renderLogin() {
  const container = document.querySelector("#product-list"); 
  showView("product-list", "Sisselogimine");

  container.innerHTML = `
    <div class="login-container">
      <h2>Tere tulemast!</h2>
      <p>Palun logi sisse, et jätkata ostlemist.</p>
      <form class="login-form" id="login-form">
        <input type="text" id="username-input" placeholder="Kasutajanimi" required>
        <input type="password" placeholder="Parool (prooviks suvaline)" required>
        <button type="submit" class="login-btn">Logi sisse</button>
      </form>
    </div>
  `;

  document.getElementById("login-form").onsubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById("username-input").value;
    localStorage.setItem("userName", username);
    window.location.reload(); 
  };
}