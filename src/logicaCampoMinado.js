// logicaCampoMinado.js

const criarTabuleiro = (linhas, colunas) => {
    return Array(linhas).fill(0).map((_, linha) => {
        return Array(colunas).fill(0).map((_, coluna) => {
            return {
                linha,
                coluna,
                aberto: false,
                bandeirado: false,
                minado: false,
                explodido: false,
                aoredor: 0
            }
        })
    })
}

const espalharMinas = (tabuleiro, minas) => {
    const linhas = tabuleiro.length
    const colunas = tabuleiro[0].length
    let minasEspalhadas = 0

    while (minasEspalhadas < minas) {
        const linhaSel = Math.floor(Math.random() * linhas)
        const colunaSel = Math.floor(Math.random() * colunas)

        if (!tabuleiro[linhaSel][colunaSel].minado) {
            tabuleiro[linhaSel][colunaSel].minado = true
            minasEspalhadas++
        }
    }
}

const criarTabuleiroComMinas = (linhas, colunas, minas) => {
    const tabuleiro = criarTabuleiro(linhas, colunas)
    espalharMinas(tabuleiro, minas)
    return tabuleiro
}

const calcularAoredor = tabuleiro => {
    const linhas = tabuleiro.length
    const colunas = tabuleiro[0].length

    const vizinhos = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], /* 0,0 */ [0, 1],
        [1, -1], [1, 0], [1, 1]
    ]

    for (let linha = 0; linha < linhas; linha++) {
        for (let coluna = 0; coluna < colunas; coluna++) {
            const campo = tabuleiro[linha][coluna]
            if (!campo.minado) {
                let minas = 0
                vizinhos.forEach(([dx, dy]) => {
                    const novaLinha = linha + dx
                    const novaColuna = coluna + dy
                    if (novaLinha >= 0 && novaLinha < linhas && novaColuna >= 0 && novaColuna < colunas) {
                        if (tabuleiro[novaLinha][novaColuna].minado) {
                            minas++
                        }
                    }
                })
                campo.aoredor = minas
            }
        }
    }
}

const abrirCampo = (tabuleiro, linha, coluna) => {
    const campo = tabuleiro[linha][coluna]
    if (!campo.aberto) {
        campo.aberto = true
        if (campo.minado) {
            campo.explodido = true
        } else if (campo.aoredor === 0) {
            const vizinhos = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1], /* 0,0 */ [0, 1],
                [1, -1], [1, 0], [1, 1]
            ]
            vizinhos.forEach(([dx, dy]) => {
                const novaLinha = linha + dx
                const novaColuna = coluna + dy
                if (novaLinha >= 0 && novaLinha < tabuleiro.length && novaColuna >= 0 && novaColuna < tabuleiro[0].length) {
                    abrirCampo(tabuleiro, novaLinha, novaColuna)
                }
            })
        }
    }
}

const marcarCampo = (tabuleiro, linha, coluna) => {
    const campo = tabuleiro[linha][coluna]
    campo.bandeirado = !campo.bandeirado
}

const verificarVitoria = tabuleiro => {
    let ganhou = true
    for (let linha = 0; linha < tabuleiro.length; linha++) {
        for (let coluna = 0; coluna < tabuleiro[0].length; coluna++) {
            const campo = tabuleiro[linha][coluna]
            if ((campo.minado && !campo.bandeirado) || (!campo.minado && !campo.aberto)) {
                ganhou = false
            }
        }
    }
    return ganhou
}

export { criarTabuleiroComMinas, calcularAoredor, abrirCampo, marcarCampo, verificarVitoria }