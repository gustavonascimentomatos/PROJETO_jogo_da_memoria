const util = Util

const ID_CONTEUDO = "all-card"
const ID_BTN_JOGAR = "jogar"
const ID_MENSAGEM = "mensagem"
const ID_CARREGANDO = "carregando"
const ID_CONTADOR = "contador"
const CLASSE_INVISIVEL = "invisible"
const ID_BTN_MOSTRAR_TUDO = "mostrarTudo"

const MENSAGENS = {
    sucesso: {
        texto: 'Combinação correta!',
        classe: 'alert-success'
    },
    erro: {
        texto: 'Combinação incorreta!',
        classe: 'alert-danger'
    }
}
class Tela {
    static obterCodigoHTML(item) {
        return `
        <div class="cards">
          <div class="card" style="width: 50%;" onclick="window.verificarSelecao('${item.id}', '${item.nome}')">
            <img src="${item.img}" name="${item.nome}" class="card-img-top">
          </div>
        </div>`
    }

    static configurarBotaoVericarSelecao(funcaoOnClick) {
        window.verificarSelecao = funcaoOnClick
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

    static configurarBotaoJogar(funcaoOnClick) {
        const btnJogar = document.getElementById(ID_BTN_JOGAR)
        btnJogar.onclick = funcaoOnClick 
    }

    static exibirHerois(nomeDoHeroi, img) {
        const elementosHTML = document.getElementsByName(nomeDoHeroi)
        elementosHTML.forEach(item => (item.src = img))
    }

    static async exibirMensagem(sucesso = true) {
        const elemento = document.getElementById(ID_MENSAGEM)

        if (sucesso) {
            elemento.classList.remove(MENSAGENS.erro.classe)
            elemento.classList.add(MENSAGENS.sucesso.classe)
            elemento.innerText = MENSAGENS.sucesso.texto
        } else {
            elemento.classList.remove(MENSAGENS.sucesso.classe)
            elemento.classList.add(MENSAGENS.erro.classe)
            elemento.innerText = MENSAGENS.erro.texto
        }
        elemento.classList.remove(CLASSE_INVISIVEL)
        await util.timeout(500)
        elemento.classList.add(CLASSE_INVISIVEL)
    }

    static exibirCarregando(mostrar = true) {
        const carregando = document.getElementById(ID_CARREGANDO)
        if (mostrar) {
            carregando.classList.remove(CLASSE_INVISIVEL)
            return
        }
        carregando.classList.add(CLASSE_INVISIVEL)
    }

    static iniciarContador() {
        let contaAte = 3
        const elementoContador = document.getElementById(ID_CONTADOR)
        const identificadorNoTexto = '$$contador'
        const textoPadrao = `Começando em ${identificadorNoTexto} ...`

        const atualizarTexto = () => 
        (elementoContador.innerHTML = textoPadrao.replace(identificadorNoTexto, contaAte--))

        atualizarTexto()
        const idDoIntervalo = setInterval(atualizarTexto, 1000)
        return idDoIntervalo
    }

    static limparContador(idDoIntervalo) {
        clearInterval(idDoIntervalo)
        document.getElementById(ID_CONTADOR).innerHTML = ""
    }

    static configurarBotaoMostrarTudo(funcaoOnClick) {
        const btnMostrarTudo = document.getElementById(ID_BTN_MOSTRAR_TUDO)
        btnMostrarTudo.onclick = funcaoOnClick
    }
}