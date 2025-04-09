const db = require("../db/queries"); // Importa as queries do banco


exports.cooperativaList = async (req, res, next) => {
    try {
        const cooperativas = await db.getAllCooperativas();
        console.log("Cooperativas:", cooperativas);
        res.render("cooperativa/index", { cooperativas });
    } catch (error) {
        console.error("Erro ao listar cooperativas:", error);
        next(error);
    }
};


exports.cooperativaCreateGet = (req, res, next) => {
    res.render("cooperativa/create");
};

exports.cooperativaCreatePost = async (req, res, next) => {
    const { nome, endereco, telefone } = req.body;

    try {
        await db.insertCooperativa({ nome, endereco, telefone });
        res.redirect("/cooperativas");
    } catch (error) {
        console.error("Erro ao criar cooperativa:", error);
        next(error);
    }
};

// Busca cooperativas por nome
exports.cooperativaSearchGet = async (req, res, next) => {
    try {
        const searchQuery = req.query.nome;
        let cooperativas = [];

        if (searchQuery) {
            cooperativas = await db.searchCooperativa(searchQuery);
        }

        res.render("cooperativa/index", { cooperativas });
    } catch (error) {
        console.error("Erro na busca por cooperativas:", error);
        next(error);
    }
};

// Exibe o formulário de edição
exports.cooperativaUpdateGet = async (req, res, next) => {
    try {
        const cooperativa = await db.getCooperativa(req.params.id);

        if (!cooperativa || !cooperativa.rows || cooperativa.rows.length === 0) {
            return res.status(404).send("Cooperativa não encontrada");
        }

        res.render("cooperativa/update", { cooperativa: cooperativa.rows[0] });
    } catch (error) {
        console.error("Erro ao buscar a cooperativa:", error);
        next(error);
    }
};

// Processa a atualização da cooperativa
exports.cooperativaUpdatePost = async (req, res, next) => {
    try {
        const { nome, endereco, telefone } = req.body;

        await db.updateCooperativa(nome, endereco, telefone, req.params.id);

        res.redirect("/cooperativas");
    } catch (error) {
        console.error("Erro ao atualizar cooperativa:", error);
        next(error);
    }
};

// Deleta uma cooperativa
exports.cooperativaDelete = async (req, res, next) => {
    try {
        const cooperativaId = req.params.id;

        await db.deleteCooperativa(cooperativaId);

        res.redirect("/cooperativas");
    } catch (error) {
        console.error("Erro ao excluir cooperativa:", error);
        next(error);
    }
};
