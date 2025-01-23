class jogoDaMemoria {
    constructor({ tela }) {
        this.tela = tela

        this.heroisIniciais = [
            { img: './files/batman.png', name: 'Batman' },
            { img: './files/gandalf.png', name: 'Gandalf' },
            { img: './files/mega.png', name: 'Mega' },
            { img: './files/helboy.png', name: 'Helboy' },
            { img: './files/flash.png', name: 'Flash' },
            { img: './files/groot.png', name: 'Groot' },
            { img: './files/maravilha.png', name: 'Maravilha' },
            { img: './files/wolverine.png', name: 'Wolverine' },
        ]
    }

    inicializar() {
        this.tela.atualizarImagens(this.heroisIniciais)
    }
}