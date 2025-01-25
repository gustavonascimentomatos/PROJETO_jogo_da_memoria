class jogoDaMemoria {
    constructor({ tela }) {
        this.tela = tela

        this.heroisIniciais = [
            { img: './files/batman.png', name: 'Batman' },
            { img: './files/gandalf.png', name: 'Gandalf' },
            { img: './files/mega.png', name: 'Mega' },
            { img: './files/flash.png', name: 'Flash' },
            { img: './files/groot.png', name: 'Groot ' },
            { img: './files/wolverine.png', name: 'Wolverine' },
        ]
        this.iconePadrao = './files/avatar.png'
        this.heroisEscondidos = []
    }

    inicializar() {
        this.tela.atualizarImagens(this.heroisIniciais);
        this.tela.configurarBotaoJogar(this.jogar.bind(this));
    }

    embaralhar() {
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

        setTimeout(() => {
            this.esconderHerois(copias)
        }, 5000)
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
        this.heroisOcultos = heroisOcultos 
    }

    jogar() {
        this.embaralhar()
    }
}