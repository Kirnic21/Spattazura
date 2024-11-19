const pool = require("./pool");

async function getAllUsers() {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows;
}
async function updateUser(user, raca, peso, id) {
        await pool.query(
            "UPDATE users SET user = $1, raca = $2, peso = $3 WHERE id = $4", 
            [user, raca, peso, id]
        );
    }
async function getUser(id){
    const  users  = await pool.query("SELECT * FROM users WHERE id = $1",[id] )
    return users
}
async function insertUser(user, raca, peso) {
    await pool.query(
      "INSERT INTO users (user, raca, peso) VALUES ($1, $2, $3)", 
      [user, raca, peso]
    );
  }
async functio
async function deleteUser(user){
    await pool.query("DELETE FROM users WHERE user = $1;",[user])
}
module.exports = {
  getAllUsers,
  insertUser,
  updateUser,
  getUser,
  deleteUser
};