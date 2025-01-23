function onLoad() {
    const dependencias = {
        tela: Tela
    }

    const jodoDaMemoria = new jogoDaMemoria(dependencias)
    jodoDaMemoria.inicializar()
}

window.onload = onLoad