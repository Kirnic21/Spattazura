
const db = require("../db/queries")
const bcrypt = require("bcrypt");
exports.userList = async (req, res, next) => {
    const users = await db.getAllUsers()
    console.log("Users",users)

     await res.render("index", { users }); 
};

exports.userCreateGet = (req,res,next) =>{
res.render("create")
}
exports.userCreatePost = async (req,res,next)=>{
    const { username, cpf, telefone, senha } = req.body;

    try {
        // Hash da senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Inserir usuário no banco de dados
        await db.insertUser({ username, cpf, telefone, senha: hashedPassword });

        
        res.redirect("/")
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
}}
    exports.userSearchGet = async (req, res, next) => {
        try {
            const searchQuery = req.query.nome;
            let users = [];
            
            if (searchQuery) {
                users = await db.searchUser(searchQuery);
            }
    
          
            res.render("index", { users });
        } catch (error) {
            console.error("Error in userSearchGet:", error);
            next(error);
        }
    };
    

    exports.userUpdateGet = async (req, res, next) => {
        try {
            // Obtenha o usuário pelo ID
            const user = await db.getUser(req.params.id);
    
            if (!user || !user.rows || user.rows.length === 0) {
                return res.status(404).send("Usuário não encontrado");
            }
    
       
            res.render("userUpdate", { user: user.rows[0] });
        } catch (error) {
            console.error("Erro ao buscar o usuário:", error);
            next(error); // Passa o erro para o próximo middleware de erro
        }
    };
    
    
exports.userUpdatePost = async (req, res, next) => {
    try {
        const { username, cpf, telefone } = req.body;

        // Atualiza o usuário
        await db.updateUser(username, cpf, telefone, req.params.id);

        // Redireciona para a página de usuários
        res.redirect("/");
    } catch (error) {
        console.error("Error updating user:", error);
        next(error); // Passa o erro para o middleware
    }
};
exports.userDelete = async (req, res, next) => {
    try {
        const userId = req.params.id; 

        await db.deleteUser(userId);

   
        res.redirect("/");
    } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        next(error);
    }
};

