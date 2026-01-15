import { showView } from "../main.js";

export function renderLogin() {
  const container = document.querySelector("#login-view"); 
  showView("login-view", "Sisselogimine");

  container.innerHTML = `
    <div class="login-card">
      <div class="login-header">
        <i class="fas fa-user-circle"></i>
        <h2>Tere tulemast tagasi!</h2>
        <p>Sisesta oma nimi, et näha oma salvestatud lemmikuid.</p>
      </div>
      <form id="login-form" class="login-form">
        <div class="input-group">
          <input type="text" id="username-input" placeholder="Kasutajanimi" required>
        </div>
        <div class="input-group">
          <input type="password" placeholder="Parool (suvaline)" required>
        </div>
        <button type="submit" class="login-btn">Logi sisse</button>
      </form>
    </div>
  `;

  document.getElementById("login-form").onsubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById("username-input").value.trim();
    if (username) {
      localStorage.setItem("userName", username);
      // Eemaldame külalise ID, et sisselogitud nimi saaks võimule
      sessionStorage.removeItem("clientId");
      // Liigume avalehele
      window.location.href = "/";
    }
  };
}