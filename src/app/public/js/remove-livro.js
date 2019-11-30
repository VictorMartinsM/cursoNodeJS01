let tabelaLivros = document.querySelector('#livros');
tabelaLivros.addEventListener('click', (evento) => {
    let elementoClicado = evento.target;

    if(elementoClicado.dataset.type == 'remocao') {
        let livroID = elementoClicado.dataset.ref;
        fetch(`http://localhost:3000/livros/${livroID}`), { method: 'DELETE' }
            .then(resposta => {
                let tr = elementoClicado.closest(`#livro_${livroID}`);
                tr.remove();
            })
            .catch(erro => console.log(erro));
    }
});