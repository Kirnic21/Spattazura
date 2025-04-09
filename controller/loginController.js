const db = require('../db');

exports.loginForm = (req, res) => {
  res.render('login', { error: null });
};

exports.login = async (req, res) => {
  const { cpf, senha } = req.body;

  try {
    const result = await db.query('SELECT * FROM coletor WHERE cpf = $1 AND senha = $2', [cpf, senha]);

    if (result.rows.length > 0) {
      return res.redirect('/coletor/painel'); // substitua pela sua rota real
    } else {
      return res.render('login', { error: 'CPF ou senha inválidos.' });
    }
  } catch (err) {
    console.error(err);
    res.render('login', { error: 'Erro ao tentar fazer login.' });
  }
};
