async function getAllCooperativass() {
    const { rows } = await pool.query("SELECT * FROM cooperativa");
    return rows;
}
async function getCooperativa(id) {
    const { rows } = await pool.query("SELECT * FROM cooperativa WHERE id = $1", [id]);
    return { rows }; 
}

async function insertCooperativa(cooperativa) {
    try {
        await pool.query(
            "INSERT INTO cooperativa (usuario, senha) VALUES ($1, $2)",
            [cooperativa.usuario,cooperativa.senha]
        );
    } catch (error) {
        console.error("Erro ao inserir usuário no banco:", error);
        throw error;
    }
}
async function deleteCooperativa(id) {
    await pool.query("DELETE FROM cooperativa WHERE id = $1", [id]);
}


async function updateCooperativa(usuario,senha) {
    await pool.query(
        "UPDATE cooperativa SET usuario = $1,senha = $2" 
        [usuario,senha]
    );
}

async function searchCooperativa(usuario) {
    const { rows } = await pool.query("SELECT * FROM usuario WHERE usuario = $1", [usuario]);
    return rows;
}
