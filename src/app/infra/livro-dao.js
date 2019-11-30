//Classe de livros LivrosDAO

class LivroDao {
    //Na hora em que ele for instanciado, ele deve receber como parâmetro o banco de dados
    constructor(db) {
        this._db = db;
    }

    //01
    //Método que realiza uma consulta de SELECT no banco de dado e o retorna os resultado na variável resultado
    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                "SELECT * FROM livros",
                (erro, resultados) => {
                    if (erro) return reject("Não foi possível conectar ao banco de dados!");

                    return resolve(resultados);
                }
            ) //Método all = consulta de listagem. (string da consulta, função Callback que é executada quando a consulta é realizada)
    
        });

    }
    
    //02
    //Método que adiciona um livro no banco de dados
    adiciona(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `INSERT INTO livros (titulo, preco, descricao) VALUES (?,?,?)`,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao
                ], 
                function(erro) {
                    if(erro) {
                        console.log(erro);
                        return reject("Não foi possível adicionar o livro!");
                    }

                    resolve();
                }
            )//A função run é uma sfunção do SQLite que realiza uma consulta SQL sem retornar resultado (inserção, deleção e atualização), diferentemento da função all
            //Recebe três parâmetros: 1 - A consulta SQL a ser executada 2 - O array de parâmetros a ser inclusos na consulta SQL 3 - Função callback a ser executada após o termino da execução da instrução 
        }); 
    }
    
    //03
    //Método que pesquisa um livro por id e o retorna numa página se houver resultado
    buscarPorId(id) { //Recebe um id, que é o livro a ser pesquisado
        return new Promise((resolve, reject) => {
            this._db.get(
                `SELECT * FROM livros WHERE id = ?`,
                [
                    id
                ], 
                (erro, livro) => {
                    if(erro) {
                        console.log(erro);
                        return reject("Não foi encontrado nenhum livro com a id informada, ou ocorreu um erro inexperado");
                    }

                    return resolve(livro);
                }

            );
        });
    }


    //04
    //Método que atualiza um livro selecionado
    atualiza(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE livros SET 
                titulo = ?,
                preco = ?,
                descricao = ?
                WHERE id = ?
            `,
            [
                livro.titulo,
                livro.preco,
                livro.descricao,
                livro.id
            ], //Array de parâmetros
            erro => {
                if(erro) {
                    return reject('Não foi possível atualizar o livro!')
                }

                resolve();
            }); // Arrow function que captura se houve erros durante a execução
        });//Método run que executa uma ação SQL sem retornar um resultado
    }

    //05
    //Método que remove um livro do banco de dados
    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
            `
                DELETE 
                FROM livros 
                WHERE id = ?
            `,
            [
                id
            ],
            (erro) => {
                if (erro) {
                    return reject('Não foi possível remover o livro!');
                }
                return resolve();
            }
            );
        });
    }
    



}

module.exports = LivroDao;