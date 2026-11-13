import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from "./db.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT;

//Middlewares
app.use(cors());
app.use(express.json());

//CRUD
//CREATE
//READ
//UPDATE
//DELETE


//Criar o usuári CREATE
app.post("/", async (req, res) => {
    try {
        const { nome, email, } = req.body;

        const [result] = await pool.query(
            "INSERT INTO users (nome, email) VALUES (?, ?)", [nome, email]
            [nome, email]
        );

        res.status(201).json({ id: result.insertId, nome, email });
    } catch (e) {
        res.status(500).json({ erro: "Falha ao criar o usuário" });
    }
});

//Listar usuários READ
app.get("/", async (req, res) => {
    try {
    const [rows] = await pool.query("SELECT * FROM usuarios");

    res.json(rows);
    } catch (e) {
        res.status(500).json({ erro: "Falha ao listar usuários" });
    }
});

//Atualizar usuarios UPDATE
 app.put("/", async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email } = req.body
    
        const [result] = await pool.query(
            "UPDATE usuarios SET nome = COALESCE(?, nome), email = COALESCE(?, email) WHERE id = ?",
            [nome || null, email || null, id]
        );
    } catch (e) {
        res.status(500).json({ erro: "Falha ao atualizar usuário" });
    }

});

//Deletar usuários DELETE
app.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

      const [result] = await pool.query("DELETE FROM usuarios WHERE id = ?", [
        id,
      ]);

      if (!result.affectedRows)
        return res.status(404).json({ erro: "Usuário não encontrado"});

      res.json({ mensagem: "Deletado com sucesso" });
    } catch (e) {
         res.status(500).json({ erro: "Falha ao deletar usuário" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor MySQL rodando em http://localhost:${PORT}`);
});