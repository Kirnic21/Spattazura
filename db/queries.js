const pool = require("./pool");

async function getAllUsers() {
    const { rows } = await pool.query("SELECT * FROM users");
    return rows;
}

async function getUser(id) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return { rows }; 
}

async function insertUser(user) {
    try {
        await pool.query(
            "INSERT INTO users (username, cpf, telefone, senha) VALUES ($1, $2, $3, $4)",
            [user.username, user.cpf, user.telefone, user.senha]
        );
    } catch (error) {
        console.error("Erro ao inserir usuário no banco:", error);
        throw error;
    }
}
async function updateUser(username, cpf, telefone, id) {
    await pool.query(
        "UPDATE users SET username = $1, cpf = $2, telefone = $3 WHERE id = $4", 
        [username, cpf, telefone, id]
    );
}

async function searchUser(name) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [name]);
    return rows;
}

async function deleteUser(id) {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
}



module.exports = {
    getAllUsers,
    insertUser,
    updateUser,
    getUser,
    deleteUser,
    searchUser
};
