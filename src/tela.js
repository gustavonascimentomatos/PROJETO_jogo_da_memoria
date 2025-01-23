const ID_CONTEUDO = "all-card"

class Tela {
    static obterCodigoHTML(item) {
        return `
        <div class="cards">
          <div class="card" style="width: 50%;">
            <img src="${item.img}" name="${item.nome}" class="card-img-top">
          </div>
        </div>`
    }

    static alterarConteudoHTML(codigoHTML) {
        const conteudo = document.getElementById(ID_CONTEUDO)
        conteudo.innerHTML = codigoHTML
    }

    static gerarStringHTMLPelaImagem(itens) {
        // Para cada item da lista, vai executar a função obterCodigoHTML
        // Ao final vai concatenar tudo em uma unica string
        // Muda de Array para string
        return itens.map(Tela.obterCodigoHTML).join('')
    }

    static atualizarImagens(itens) {
        const codigoHTML = Tela.gerarStringHTMLPelaImagem(itens)
        Tela.alterarConteudoHTML(codigoHTML)
    }
}