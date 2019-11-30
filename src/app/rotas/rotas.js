//Arquivo que aramzena as rotas da aplicação

//Instanciando um objeto da classe LivrosDAO
const LivroDao = require("../infra/livro-dao");

//Adicionando o banco de dados
const db = require("../../config/database");

//Exportar uma função que recebe um parâmetro (app)
module.exports = (app) => {

    //Atender a requisição get do protocolo HTTP criando uma rota
    app.get('/', function(req, res) {
        res.send('<h1>VICTOR</h1>');
    }); //(Rota, Callback)

    //LISTAGEM DE LIVROS
    app.get('/livros', function(req, res) {
        
        //Há um tratamento a segui na página de visualização de livros, para que nos caso, recupere a lista direto do banco de dados

        //Instancia um objeto do tipo LivroDAO passando o bd como parâmetro
        const livroDao = new LivroDao(db);

        //Executa o método lista do objeto LivrosDAO
        livroDao.lista()
                .then(livros => res.marko(
                        require('../views/livros/lista/lista.marko'),
                        {
                            livros: livros //array de livros, sendo resultados cada retorno da consulta SQL
                        }
                    ) //o método marko() do resp é um método que recebe uma arquivo de extensão .marko e devolve para o usuário. (caminho do documento a ser renderizado, parâmetros a ser passados a esse documento)
                )
                .catch(erro => console.log(erro)); //método que recupera os erros obtidos na execução
    });
    
    //CADASTRO DE LIVROS

    //Visualização da página
    app.get('/livros/form', function(req, res){
        res.marko(require('../views/livros/form/form.marko'), { livro: {} });//Não há necessidade de se passar nenhum dado específico a esse documento, nem tratar esses dados pois aqui vai ser aberto uma tela de cadastro vazia 
    });

    //Execução da inclusão
    app.post('/livros', function(req, res){ //Aqui nessa rota, se cria em /livros um novo elemento (por isso a necessidade do metodo post)
        console.log(req.body);
        const livroDao = new LivroDao(db);
        livroDao.adiciona(req.body)
                .then(res.redirect('/livros'))
                .catch(erro => console.log(erro));
    });

    //EDIÇÃO DE LIVROS

    //Visualização da página de edição
    app.get('/livros/form/:id', function(req, res) { //Recupera do elemento clicado o seu id e seus outros dados e o recarrega em /livros/form/:id para realizar a alteração
        const id = req.params.id;
        const livroDao = new LivroDao(db);

        livroDao.buscarPorId(id)
                .then(livro =>
                    res.marko(
                        require('../views/livros/form/form.marko'),
                        { livro: livro }
                    )
                )
                .catch(erro => console.log(erro));

    });

    //Editando o livro
    app.put('/livros', function(req, res){
        console.log(req.body);
        const livroDao = new LivroDao(db);

        livroDao.atualiza(req.body)
                .then(res.redirect('/livros'))
                .catch(erro => console.log(erro));
    });



    //EXCLUSÃO DE LIVROS

    //Execução da exclusão após a página de visualização ('/livros')
    app.delete('/livros/:id', function(req, res) {
        const id = req.params.id;

        const livroDao = new LivroDao(db);
        livroDao.remove(id)
                .then(() => res.status(200).end())
                .catch(erro => console.log(erro)); 
    });

    /*
    app.get('/buscar', function(req, res) {
        res.marko(require('../views/livros/form/form-buscar-id'));
    })

    app.post('/buscar/resultado-busca', function(req, res) {
        console.log(req.body);
        const livroDao = new LivroDao(db);
        livroDao.buscarPorId(req.body)
                .then(res.redirect('/resultado-busca'))
                .catch(erro => console.log(erro));
    });

    app.get('/buscar/resultado-busca', function(req, res) {
        const livroDao = new LivroDao(db);

        livroDao.buscarPorId(req.body)
                .then(livros => res.marko(
                        require('../views/livros/lista/lista-id.marko'),
                        {
                            livros: livros //array de livros, sendo resultados cada retorno da consulta SQL
                        }
                    )
                )
                .catch(erro => console.log(erro)); //método que recupera os erros obtidos na execução
    });
    
    */



}  


