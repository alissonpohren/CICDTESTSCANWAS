const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota de saúde (pra ver se o app está no ar)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend online para testes DAST" });
});

// "Banco" em memória
const users = [
  { id: 1, username: "admin", password: "admin123" },
  { id: 2, username: "user", password: "user123" },
];

const messages = [];

// Rota de login simples (NÃO é segura, é só pra teste de DAST)
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  // Retorna um "token fake" só pra DAST ter algo pra ver
  res.json({
    message: "Login efetuado com sucesso",
    token: "fake-jwt-token-123",
    user: { id: user.id, username: user.username },
  });
});

// Rota de busca com querystring (boa pra DAST testar parâmetros)
app.get("/api/search", (req, res) => {
  const q = req.query.q || "";
  res.json({
    query: q,
    results: [
      `Resultado 1 para: ${q}`,
      `Resultado 2 para: ${q}`,
      `Resultado 3 para: ${q}`,
    ],
  });
});

// Rota para envio de mensagem (contato / feedback)
app.post("/api/messages", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Preencha todos os campos" });
  }

  const newMessage = {
    id: messages.length + 1,
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  };

  messages.push(newMessage);

  res.status(201).json({ message: "Mensagem recebida", data: newMessage });
});

// Listar mensagens (DAST consegue testar autenticação, enumeração etc)
app.get("/api/messages", (req, res) => {
  res.json(messages);
});

// Servir frontend estático (opcional, se quiser servir direto pelo backend)
app.use("/", express.static(path.join(__dirname, "..", "frontend")));

app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});
