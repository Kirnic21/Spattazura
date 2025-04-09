const db = require('../db');

// Buscar todas as pontuações
exports.getAllPontuacoes = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM pontuacao');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pontuações' });
  }
};

// Buscar pontuação por ID
exports.getPontuacaoById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM pontuacao WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pontuação não encontrada' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pontuação' });
  }
};

// Criar nova pontuação
exports.createPontuacao = async (req, res) => {
  const { pontos } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO pontuacao (pontos) VALUES ($1) RETURNING *`,
      [pontos]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar pontuação' });
  }
};

// Atualizar pontuação
exports.updatePontuacao = async (req, res) => {
  const { id } = req.params;
  const { pontos } = req.body;
  try {
    const result = await db.query(
      `UPDATE pontuacao SET pontos = $1 WHERE id = $2 RETURNING *`,
      [pontos, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pontuação não encontrada' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar pontuação' });
  }
};

// Deletar pontuação
exports.deletePontuacao = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM pontuacao WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pontuação não encontrada' });
    }
    res.json({ message: 'Pontuação deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar pontuação' });
  }
};