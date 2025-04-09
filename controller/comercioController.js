const db = require('../db');

// FORMULÁRIO DE CADASTRO
exports.formulario = (req, res) => {
  res.render('cadastro_comercio', { error: null, success: null });
};

// CRIAR COMÉRCIO
exports.cadastrar = async (req, res) => {
  const { cnpj, nome_fantasia, telefone, email, senha, cooperativa_id } = req.body;

  try {
    await db.query(
      'INSERT INTO comercio (cnpj, nome_fantasia, telefone, email, senha, cooperativa_id) VALUES ($1, $2, $3, $4, $5, $6)',
      [cnpj, nome_fantasia, telefone, email, senha, cooperativa_id]
    );

    res.render('cadastro_comercio', {
      error: null,
      success: 'Comércio cadastrado com sucesso!',
    });
  } catch (err) {
    console.error(err);
    res.render('cadastro_comercio', {
      error: 'Erro ao cadastrar comércio.',
      success: null,
    });
  }
};

// LISTAR TODOS OS COMÉRCIOS
exports.listar = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM comercio ORDER BY id');
    res.render('listar_comercio', { comercios: result.rows });
  } catch (err) {
    console.error(err);
    res.send('Erro ao buscar comércios.');
  }
};

// FORMULÁRIO DE EDIÇÃO
exports.editarFormulario = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('SELECT * FROM comercio WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.send('Comércio não encontrado');
    }

    res.render('editar_comercio', { comercio: result.rows[0], error: null, success: null });
  } catch (err) {
    console.error(err);
    res.send('Erro ao buscar comércio');
  }
};

// ATUALIZAR COMÉRCIO
exports.editarSalvar = async (req, res) => {
  const { id } = req.params;
  const { cnpj, nome_fantasia, telefone, email, senha, cooperativa_id } = req.body;

  try {
    await db.query(
      'UPDATE comercio SET cnpj = $1, nome_fantasia = $2, telefone = $3, email = $4, senha = $5, cooperativa_id = $6 WHERE id = $7',
      [cnpj, nome_fantasia, telefone, email, senha, cooperativa_id, id]
    );

    const result = await db.query('SELECT * FROM comercio WHERE id = $1', [id]);

    res.render('editar_comercio', {
      comercio: result.rows[0],
      success: 'Comércio atualizado com sucesso!',
      error: null,
    });
  } catch (err) {
    console.error(err);
    res.render('editar_comercio', {
      comercio: { id, cnpj, nome_fantasia, telefone, email, senha, cooperativa_id },
      success: null,
      error: 'Erro ao atualizar comércio.',
    });
  }
};

// DELETAR COMÉRCIO
exports.deletar = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM comercio WHERE id = $1', [id]);
    res.redirect('/comercio/listar');
  } catch (err) {
    console.error(err);
    res.send('Erro ao deletar comércio.');
  }
};
