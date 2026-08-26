//configs:
const express = require('express')
require('dotenv').config()
//importando do arquivo do banco de dados
const db = require('./database')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
//-----------------------------------------------------------------
app.get('/', (req, res) => {
    res.json({message: "API CRUD com Express e MySQL"})
})

app.get('/produtos', async (req, res) => {
    try{
        const [produtos] = await db.query('SELECT * FROM produtos ORDER BY id DESC')
        res.json(produtos)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar produtos'})
    }
})

app.get('/produtos/:id', async (req, res) => {
    try {
        const {id} = req.params
        const [produtos] = await db.query(
            'SELECT * FROM produtos WHERE id = ?', [id]
        )

        if (produtos.length === 0){
            return res.status(404).json({ message: 'Produto não encontrado'})
        }

        res.json(produtos[0])
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar produto'})
    }
})

//Exercício 1
app.get('/produtos/busca/:nome', async (req, res) => {
    try {
        const {nome} = req.params
        const [produtos] = await db.query(
            'SELECT * FROM produtos WHERE nome = ?', [nome]
        )

        if (produtos.length === 0){
            return res.status(404).json({ message: 'Produto não encontrado'})
        }

        res.json(produtos[0])
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar produto'})
    }
})

//Exercício 2
app.post('/produtos', async (req, res) => {
    try {
        const {nome, preco, descricao} = req.body
        if(!nome || !preco){
            return res.status(400).json({ message: 'Nome e preço são obrigatórios'})
        }

        if(preco < 0) {
            return res.status(400).json({ message: 'Preço menor que 0'})
        }

        const [resultado] = await db.query(
            'INSERT INTO produtos (nome, preco, descricao) VALUES (?, ?, ?)', [nome, preco, descricao || null]
        )

        res.status(201).json({
            id: resultado.insertId,
            nome,
            preco,
            descricao: descricao || null
        })
    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar produto'})
    }
})

//Exercício 2
app.put('/produtos/:id', async (req,res) => {
    try {
    const {id} = req.params
    const {nome, preco, descricao} = req.body
        
    if(!nome || !preco){
        return res.status(400).json({ message: 'Nome e preço são obrigatórios'})
    }

    if(preco < 0) {
        return res.status(400).json({ message: 'Preço menor que 0'})
    }

    const [resultado] = await db.query(
        'UPDATE produtos SET nome = ?, preco = ?, descricao = ? WHERE id = ?', [nome, preco, descricao || null, id]
    )

    if(resultado.affectedRows === 0 ){
        return res.status(404).json({ message: 'Produto não encontrado' })
    }

    res.json({ id, nome, preco, descricao: descricao || null })
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar produto'})
    }
})

app.delete('/produtos/:id', async (req, res) => {
    try {
        const {id} = req.params
        const [resultado] = await db.query(
            'DELETE FROM produtos WHERE id = ?', [id]
        )
    
    if (resultado.affectedRows === 0) {
        return res.status(404).json({ message: 'Produto não encontrado' })
    }
    
     res.status(204).send()
    } catch(error) {
        res.status(500).json({ message: 'Erro ao excluir produto' })
    }
})

// Exercício 4
app.get('/categorias', async (req, res) => {
    try{
        const [categorias] = await db.query('SELECT * FROM categorias ORDER BY id DESC')
        res.json(categorias)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar categoria'})
    }
})

app.get('/categorias/busca/:nome', async (req, res) => {
    try {
        const {nome} = req.params
        const [categorias] = await db.query(
            'SELECT * FROM categorias WHERE nome = ?', [nome]
        )

        if (categorias.length === 0){
            return res.status(404).json({ message: 'Erro ao buscar categoria'})
        }

        res.json(categorias[0])
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar categoria'})
    }
})

app.post('/categorias', async (req, res) => {
    try {
        const {nome, descricao} = req.body
        if(!nome){
            return res.status(400).json({ message: 'Nome é obrigatório'})
        }

        const [resultado] = await db.query(
            'INSERT INTO categorias (nome, descricao) VALUES (?, ?)', [nome, descricao || null]
        )

        res.status(201).json({
            id: resultado.insertId,
            nome,
            descricao: descricao || null
        })
    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar categoria'})
    }
})

app.put('/categorias/:id', async (req,res) => {
    try {
    const {id} = req.params
    const {nome, descricao} = req.body
        
    if(!nome){
        return res.status(400).json({ message: 'Nome é obrigatório'})
    }

    const [resultado] = await db.query(
        'UPDATE categorias SET nome = ?, descricao = ? WHERE id = ?', [nome, descricao || null, id]
    )

    if(resultado.affectedRows === 0 ){
        return res.status(404).json({ message: 'Categoria não encontrada' })
    }

    res.json({ id, nome, descricao: descricao || null })
    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar categoria'})
    }
})

app.delete('/categorias/:id', async (req, res) => {
    try {
        const {id} = req.params
        const [resultado] = await db.query(
            'DELETE FROM categorias WHERE id = ?', [id]
        )
    
    if (resultado.affectedRows === 0) {
        return res.status(404).json({ message: 'Categoria não encontrada' })
    }
    
     res.status(204).send()
    } catch(error) {
        res.status(500).json({ message: 'Erro ao cadastrar categoria' })
    }
})

app.listen (port, () => {
    console.log(`Server rodando em http://localhost:${port}`);
})