require("dotenv").config();
const express = require("express");
const db = require("./db"); 

const app = express();
app.use(express.json());

o
app.post("/produtos", async (req, res) => {
    const { nome, preco, estoque, categoria } = req.body;

    if (!nome || !preco || !estoque || !categoria) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    try {
        const produto = await db.adicionarProduto(nome, preco, estoque, categoria);
        res.status(201).json({ message: "Produto adicionado com sucesso!", produto });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao adicionar produto." });
    }
});


app.get("/produtos/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const produto = await db.buscarProdutoPorId(id);
        if (produto) {
            res.json(produto);
        } else {
            res.status(404).json({ message: "Produto não encontrado." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar produto." });
    }
});


app.get("/produtos", async (req, res) => {
    try {
        const produtos = await db.listarTodosProdutos();
        res.json(produtos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao listar produtos." });
    }
});


app.put("/produtos/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, preco, estoque, descricao } = req.body;

    try {
        const atualizado = await db.atualizarProduto(id, { nome, preco, estoque, descricao });
        if (atualizado) {
            res.json({ message: "Produto atualizado com sucesso!" });
        } else {
            res.status(404).json({ message: "Produto não encontrado." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar produto." });
    }
});


app.delete("/produtos/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const excluido = await db.excluirProduto(id);
        if (excluido) {
            res.json({ message: "Produto excluído com sucesso!" });
        } else {
            res.status(404).json({ message: "Produto não encontrado." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao excluir produto." });
    }
});


app.get("/", (req, res) => {
    res.json({ message: "Bem-vindo à API de Produtos!" });
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
