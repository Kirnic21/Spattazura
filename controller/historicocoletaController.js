const db = require('../db');

// FORMULÁRIO DE CADASTRO
exports.formulario = (req, res) => {
  res.render('cadastro_historico', { error: null, success: null });
};

// CRIAR REGISTRO NO HISTÓRICO
exports.cadastrar = async (req, res) => {
  const { qtd_coletada, data_hora, coletor_id, material_id } = req.body;

  try {
    await db.query(
      'INSERT INTO historicocoletas (qtd_coletada, data_hora, coletor_id, material_id) VALUES ($1, $2, $3, $4)',
      [qtd_coletada, data_hora, coletor_id, material_id]
    );

    res.render('cadastro_historico', {
      error: null,
      success: 'Histórico registrado com sucesso!',
    });
  } catch (err) {
    console.error(err);
    res.render('cadastro_historico', {
      error: 'Erro ao registrar histórico.',
      success: null,
    });
  }
};

// LISTAR TODOS OS HISTÓRICOS
exports.listar = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM historicocoletas ORDER BY id');
    res.render('listar_historico', { historicos: result.rows });
  } catch (err) {
    console.error(err);
    res.send('Erro ao buscar históricos.');
  }
};

// FORMULÁRIO DE EDIÇÃO
exports.editarFormulario = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('SELECT * FROM historicocoletas WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.send('Histórico não encontrado');
    }

    res.render('editar_historico', {
      historico: result.rows[0],
      error: null,
      success: null
    });
  } catch (err) {
    console.error(err);
    res.send('Erro ao buscar histórico.');
  }
};


exports.editarSalvar = async (req, res) => {
  const { id } = req.params;
  const { qtd_coletada, data_hora, coletor_id, material_id } = req.body;

  try {
    await db.query(
      'UPDATE historicocoletas SET qtd_coletada = $1, data_hora = $2, coletor_id = $3, material_id = $4 WHERE id = $5',
      [qtd_coletada, data_hora, coletor_id, material_id, id]
    );

    const result = await db.query('SELECT * FROM historicocoletas WHERE id = $1', [id]);

    res.render('editar_historico', {
      historico: result.rows[0],
      success: 'Histórico atualizado com sucesso!',
      error: null
    });
  } catch (err) {
    console.error(err);
    res.render('editar_historico', {
      historico: { id, qtd_coletada, data_hora, coletor_id, material_id },
      success: null,
      error: 'Erro ao atualizar histórico.'
    });
  }
};

// DELETAR HISTÓRICO
exports.deletar = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM historicocoletas WHERE id = $1', [id]);
    res.redirect('/historico/listar');
  } catch (err) {
    console.error(err);
    res.send('Erro ao deletar histórico.');
  }
};
