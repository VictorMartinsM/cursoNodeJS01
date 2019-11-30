//ARQUIVO QUE MODIFICA E PERSONALIZA O MODULO EXPRESS

//Adicionando o Marko para trabalhar com o Express
require('marko/node-require').install(); //instala o Node no modulo Marko
require('marko/express'); //instala o Express no modulo Marko

//Recebe a chamada pro módulo express
const express = require('express'); //Retorna uma função
//Recebe o retorno da funcão chamada
const app = express(); //Chama a função retornada
//Recebe a chamada do módulo BodyParser
const bodyParser = require('body-parser');
//Recebe a chamada do módulo Method Override
const methodOverride = require('method-override');

//Configurando uma nova middleware
app.use('/estatico', express.static('src/app/public')); //1 - Url que vai ativar o middleware 2 - Configuração do middleware que será executada sempre que houver requisição para a URL indicada

//Definindo o middleware BodyParser
app.use(bodyParser.urlencoded({
    extended: true //informando o boydParser que ele está capacitado para receber objetos complexos no formato JSON
})); //urlencoded = define como o middleware vai executar. Receb um objeto Javascript

//Definindo o middleware Method Override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        //look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

//Importa o módulo rotas.js
const rotas = require('../app/rotas/rotas');
rotas(app);

//O módulo deve exportar a constante app que guarda o objeto do express
module.exports = app;