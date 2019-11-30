//Arquivo que cuida do servidor HTTP

//Solicita o módulo custom-express, na pasta config que, por sua vez, chama o módulo express do Node
const app = require('./src/config/custom-express');

//listen(porta, callback(){});
app.listen(3000, function() {
    console.log('Servidor rodando na porta 3000');
});



/*

    CÓDIGO SEM EXPRESS

//require() = Disponibiliza o módulo HTTP (padrão do Node.JS)
//referencia em modo de String
const htttp = require('http'); //Retorna um módulo

//Função do módulo HTTP que cria um servidor
//Retorna um objeto do tipo Server
//Recebe como parâmetro um requestListener para executar (res) o código quando receber uma requisição (req)
const servidor = htttp.createServer(function (req, resp) {
    //resp = oque devolver pro usuário
    resp.end('<p>Conteúdo que o usuário vê</p>'); //Recebe o conteúdo que vai ser enviado ao cliente;
}); 
servidor.listen(3000); //Servidor vai ser executado na porta 3000 (convesão de portas)

*/