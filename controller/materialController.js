const db = require('../db');

// FORMULÁRIO DE CADASTRO
exports.formulario = (req, res) => {
  res.render('cadastro_material', { error: null, success: null });
};

// CRIAR MATERIAL (POST)
exports.cadastrar = async (req, res) => {
  const { nome, descricao, cotacao_ponto_peso } = req.body;

  try {
    await db.query(
      'INSERT INTO material (nome, descricao, cotacao_ponto_peso) VALUES ($1, $2, $3)',
      [nome, descricao, cotacao_ponto_peso]
    );

    res.render('cadastro_material', {
      error: null,
      success: 'Material cadastrado com sucesso!',
    });
  } catch (err) {
    console.error(err);
    res.render('cadastro_material', {
      error: 'Erro ao cadastrar material.',
      success: null,
    });
  }
};

// LISTAR TODOS OS MATERIAIS
exports.listar = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM material ORDER BY id');
    res.render('listar_material', { materiais: result.rows });
  } catch (err) {
    console.error(err);
    res.send('Erro ao buscar materiais.');
  }
};

// FORMULÁRIO DE EDIÇÃO
exports.editarFormulario = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('SELECT * FROM material WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.send('Material não encontrado');
    }

    res.render('editar_material', { material: result.rows[0], error: null, success: null });
  } catch (err) {
    console.error(err);
    res.send('Erro ao buscar material');
  }
};

// ATUALIZAR MATERIAL (POST)
exports.editarSalvar = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, cotacao_ponto_peso } = req.body;

  try {
    await db.query(
      'UPDATE material SET nome = $1, descricao = $2, cotacao_ponto_peso = $3 WHERE id = $4',
      [nome, descricao, cotacao_ponto_peso, id]
    );

    const result = await db.query('SELECT * FROM material WHERE id = $1', [id]);

    res.render('editar_material', {
      material: result.rows[0],
      success: 'Material atualizado com sucesso!',
      error: null,
    });
  } catch (err) {
    console.error(err);
    res.render('editar_material', {
      material: { id, nome, descricao, cotacao_ponto_peso },
      success: null,
      error: 'Erro ao atualizar material.',
    });
  }
};

// DELETAR MATERIAL
exports.deletar = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM material WHERE id = $1', [id]);
    res.redirect('/material/listar');
  } catch (err) {
    console.error(err);
    res.send('Erro ao deletar material.');
  }
};
