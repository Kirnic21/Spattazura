const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do EJS como template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware para arquivos estáticos (CSS, imagens, scripts)
app.use(express.static(path.join(__dirname, "public")));

// Middleware para interpretar dados do body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
var coletorsRouter = require('./routes/coletorRouter');

app.use("/coletor",coletorsRouter)

app.get("/", (req, res) => {
    res.render("login", { error: null });
  });

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});