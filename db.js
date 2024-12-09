require("dotenv").config();
const mysql = require("mysql2/promise");

// Configuração da conexão com o banco de dados
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

// Função para adicionar um produto
async function adicionarProduto(nome, preco, estoque, categoria) {
    try {
        const [resultado] = await pool.query(
            "INSERT INTO produtos (nome, preco, estoque, categoria) VALUES (?, ?, ?, ?)",
            [nome, preco, estoque, categoria]
        );
        return { id: resultado.insertId, nome, preco, estoque, categoria };
    } catch (error) {
        console.error("Erro ao adicionar produto:", error);
        throw error;
    }
}

// Função para buscar produto por ID
async function buscarProdutoPorId(id) {
    try {
        const [resultado] = await pool.query("SELECT * FROM produtos WHERE id = ?", [id]);
        return resultado[0] || null;
    } catch (error) {
        console.error("Erro ao buscar produto:", error);
        throw error;
    }
}

// Função para listar todos os produtos
async function listarTodosProdutos() {
    try {
        const [resultado] = await pool.query("SELECT * FROM produtos");
        return resultado;
    } catch (error) {
        console.error("Erro ao listar produtos:", error);
        throw error;
    }
}


async function atualizarProduto(id, dados) {
    const { nome, preco, estoque, descricao } = dados;
    try {
        const [resultado] = await pool.query(
            "UPDATE produtos SET nome = ?, preco = ?, estoque = ?, descricao = ? WHERE id = ?",
            [nome, preco, estoque, descricao, id]
        );
        return resultado.affectedRows > 0;
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        throw error;
    }
}

// Função para excluir um produto
async function excluirProduto(id) {
    try {
        const [resultado] = await pool.query("DELETE FROM produtos WHERE id = ?", [id]);
        return resultado.affectedRows > 0;
    } catch (error) {
        console.error("Erro ao excluir produto:", error);
        throw error;
    }
}

module.exports = {
    adicionarProduto,
    buscarProdutoPorId,
    listarTodosProdutos,
    atualizarProduto,
    excluirProduto,
};
