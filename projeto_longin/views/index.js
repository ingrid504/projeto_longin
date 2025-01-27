const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 3000;

// Configurações
app.use(bodyParser.urlencoded({ extend: true }));
app.use(express.static('public'));

// Rota da tela de login
app.get('/', (req, res) => {
    res.sendFile(_dirname + '/views/login.html');
});

// Rota da tela de login 
app.post('/login', (req, res) => {
    const { username, password} = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error ao consultar o banco de dados:', err);
            return res.status(500).send('Error interno no servidor.');
        }

        if(results.lenght > 0) {
            // Redireciona para o GitHub após login bem-sucedido
            console.log('Login bem-sucedido:', username);
            res.redirect('https://github.com');
        }else {
            // Exibe mensagem de erro
            console.log('Credencias inválidas:', username);
            res.send(`
            <h1>Usuário ou senha inválidos!</h1>
            <a href="/">Voltar</a>0 
            `);
        }
    });
});

// Inicia o servidor
app.listen(PORT, () => {
     console.log(`Servidor rodando em http://localhost:${PORT}`);
});
