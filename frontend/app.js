const API_BASE = "http://localhost:3000";

function prettyJson(el, data) {
  el.textContent = JSON.stringify(data, null, 2);
}

// Health check
document.getElementById("btnHealth").addEventListener("click", async () => {
  const resultEl = document.getElementById("healthResult");
  try {
    const res = await fetch(`${API_BASE}/api/health`);
    const data = await res.json();
    prettyJson(resultEl, data);
  } catch (err) {
    resultEl.textContent = "Erro ao chamar /api/health: " + err.message;
  }
});

// Login
document
  .getElementById("loginForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const resultEl = document.getElementById("loginResult");

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        resultEl.textContent = "Erro: " + (data.error || "Falha no login");
      } else {
        prettyJson(resultEl, data);
      }
    } catch (err) {
      resultEl.textContent = "Erro ao chamar /api/login: " + err.message;
    }
  });

// Busca
document
  .getElementById("searchForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const resultEl = document.getElementById("searchResult");
    const query = document.getElementById("query").value;

    try {
      const res = await fetch(
        `${API_BASE}/api/search?q=` + encodeURIComponent(query)
      );
      const data = await res.json();
      prettyJson(resultEl, data);
    } catch (err) {
      resultEl.textContent = "Erro ao chamar /api/search: " + err.message;
    }
  });

// Enviar mensagem
document
  .getElementById("messageForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const resultEl = document.getElementById("messageResult");

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
      const res = await fetch(`${API_BASE}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();
      if (!res.ok) {
        resultEl.textContent = "Erro: " + (data.error || "Falha ao enviar");
      } else {
        prettyJson(resultEl, data);
      }
    } catch (err) {
      resultEl.textContent = "Erro ao chamar /api/messages: " + err.message;
    }
  });

// Listar mensagens
document
  .getElementById("btnListMessages")
  .addEventListener("click", async () => {
    const resultEl = document.getElementById("listMessagesResult");
    try {
      const res = await fetch(`${API_BASE}/api/messages`);
      const data = await res.json();
      prettyJson(resultEl, data);
    } catch (err) {
      resultEl.textContent = "Erro ao chamar /api/messages: " + err.message;
    }
  });
