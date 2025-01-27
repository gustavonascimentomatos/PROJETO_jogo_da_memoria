function onLoad() {
    const dependencias = {
        tela: Tela,
        util: Util
    }

    const jodoDaMemoria = new jogoDaMemoria(dependencias)
    jodoDaMemoria.inicializar()
}

window.onload = onLoad