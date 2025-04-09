// controllers/coletorController.js
const db = require('../db');

exports.mostrarFormulario = (req, res) => {
  res.render('cadastroColetor', { error: null, success: null });
};

exports.cadastrarColetor = async (req, res) => {
  const { cpf, nome, telefone, senha, cooperativa_id } = req.body;

  try {
    const existente = await db.query('SELECT * FROM coletor WHERE cpf = $1', [cpf]);

    if (existente.rows.length > 0) {
      return res.render('cadastroColetor', {
        error: 'CPF já cadastrado.',
        success: null,
      });
    }

    await db.query(
      'INSERT INTO coletor (cpf, nome, telefone, senha, cooperativa_id) VALUES ($1, $2, $3, $4, $5)',
      [cpf, nome, telefone, senha, cooperativa_id]
    );

    res.render('cadastroColetor', {
      error: null,
      success: 'Coletor cadastrado com sucesso!',
    });
  } catch (err) {
    console.error(err);
    res.render('cadastroColetor', {
      error: 'Erro ao cadastrar coletor.',
      success: null,
    });
  }
};
