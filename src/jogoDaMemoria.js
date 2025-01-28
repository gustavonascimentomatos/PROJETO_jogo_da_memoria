class jogoDaMemoria {
    constructor({ tela, util }) {
        this.tela = tela
        this.util = util
        this.heroisIniciais = [
            { img: './files/batman.png', nome: 'Batman' },
            { img: './files/gandalf.png', nome: 'Gandalf' },
            { img: './files/mega.png', nome: 'Mega' },
            { img: './files/flash.png', nome: 'Flash' },
            { img: './files/groot.png', nome: 'Groot ' },
            { img: './files/wolverine.png', nome: 'Wolverine' },
        ]
        this.iconePadrao = './files/avatar.png'
        this.heroisEscondidos = []
        this.heroisSelecionados = []
    }

    inicializar() {
        this.tela.atualizarImagens(this.heroisIniciais);
        this.tela.configurarBotaoJogar(this.jogar.bind(this));
        this.tela.configurarBotaoVericarSelecao(this.verificarSelecão.bind(this));
        this.tela.configurarBotaoMostrarTudo(this.mostrarHeroisEscondidos.bind(this))
    }

    async embaralhar() {
        const copias = this.heroisIniciais

        // Duplicar os cards
        .concat(this.heroisIniciais)

        // Entrar em ada item e criar um id aleatório
        .map(item => {
            return Object.assign({}, item, { id: Math.random() / 0.5 })
        })

        // Ordenar aleatoriamente
        .sort(() => Math.random() - 0.5)

        this.tela.atualizarImagens(copias)
        this.tela.exibirCarregando()

        const idDoIntervalo = this.tela.iniciarContador()
        
        await this.util.timeout(3000)
        this.tela.limparContador(idDoIntervalo)
        this.esconderHerois(copias)
        this.tela.exibirCarregando(false)
    }

    esconderHerois(herois) {
        // Trocar a imagem de todos os herois existentes
        // pelo icone padrão
        const heroisOcultos = herois.map(( { nome, id }) => ({
            id,
            nome,
            img: this.iconePadrao
        }))
        this.tela.atualizarImagens(heroisOcultos)
        this.heroisEscondidos = heroisOcultos 
    }

    exibirHerois(nomeDoHeroi) {
        // Procura pelo nome em heroisIniciais
        const { img } = this.heroisIniciais.find(({ nome }) => nomeDoHeroi === nome)
        this.tela.exibirHerois(nomeDoHeroi, img)
    }

    verificarSelecão(id, nome) {
        const item = { id, nome }
        const heroisSelecionados = this.heroisSelecionados.length

        switch (heroisSelecionados) {
            case 0:    
                // Adiciona a escolha na lista, pesterando pelo proximo click
                this.heroisSelecionados.push(item)
                break;
            case 1:
                // Se a quantidade de escolhidos for 1, significa que o usuário só pode escolher mais um
                // Obtemos o primeiro item para comparação
                const [ opcao1 ] = this.heroisSelecionados
                // Zerar a lista anterior para não selecionar mais de dois
                this.heroisSelecionados = []

                // Conferir se os nomes são iguais e os IDs diferentes
                if (opcao1.nome === item.nome && opcao1.id !== item.id) {
                    this.exibirHerois(item.nome)
                    this.tela.exibirMensagem()
                    return
                }
                this.tela.exibirMensagem(false)
                break;
            default:
                break;
        }
    }

    mostrarHeroisEscondidos() {
        const heroisEscondidos = this.heroisEscondidos
        for (const heroi of heroisEscondidos) {
            const { img } = this.heroisIniciais.find(item => item.nome === heroi.nome)
            heroi.img = img
        }
        this.tela.atualizarImagens(heroisEscondidos)
    }

    jogar() {
        this.embaralhar()
    }
}