var timerId = null; //variavel que armazena a chamada da função timeout
function iniciar() {
    dificuldade = document.getElementById('dificuldade').value;
    if (dificuldade == null || dificuldade == "") {
        return alert('Selecione uma dificultade antes de iniciar');
    }
    window.location.href = "jogo.html?" + dificuldade;
}


function iniciaJogo() {

    /* um método de recuperar nivel do jogo */
    var url = window.location.search;
    var nivelJogo = url.replace("?", "");

    var tempoSegundos = 0;

    switch (nivelJogo) {

        case '1': //1 - fácil -> 120s
            tempoSegundos = 120;
            break;

        case '2': //2 - normal -> 60s
            tempoSegundos = 60;
            break;

        case '3': //3 - difícil -> 30s
            tempoSegundos = 30;
            break;
    }

    //inserindo tempo elemento span do cronometro
    document.getElementById('tempo').innerHTML = tempoSegundos;

    //criação da quantidade de balões
    var qtdBaloes = 80;

    //UI baloes inteiros
    document.getElementById('uiBaloes').innerHTML = qtdBaloes;
    criarBaloes(qtdBaloes);

    //UI baloes estourados
    document.getElementById('uiBaloesEstourados').innerHTML = 0;

    contagemRegressiva(tempoSegundos);
}

function criarBaloes(quantidade) {
    for (var i = 0; i < quantidade; i++) {
        var balao = document.createElement("img");
        balao.src = "_imagens/balao_azul_pequeno.png";
        balao.style.margin = "10px";
        balao.id = 'b' + i;
        document.getElementById('cenario').appendChild(balao);
        balao.onmousedown = function() { estourar(this); }
    }
}

function contagemRegressiva(segundos) {
    //Função recursiva que a cada 1000ms (1s) chama ela mesmo reduzindo 1s do tempo.
    /*
    pode ser feito parado o tempo usando:
    clearTimeOut(timerId);
    return false
    */

    if (segundos >= 0) {
        document.getElementById('tempo').innerHTML = segundos;
        timerId = setTimeout("contagemRegressiva(" + (segundos - 1) + ")", 1000);
    } else {
        gameOver();
        return false;
    }
}

function gameOver() {
    alert('Fim de jogo! Você não conseguiu estourar todos os balões no tempo');
    window.location.href = "index.html";
}

function estourar(e) {
    var id_balao = e.id;
    document.getElementById(id_balao).setAttribute("onmousedown", "");
    //alterando imagem do balão para estourado
    document.getElementById(id_balao).src = "_imagens/balao_azul_pequeno_estourado.png";
    pontuacao(-1);

}

function pontuacao(acao) {
    //diminuindo numero de baloes
    //aumentando numero de baloes estourados
    var baloesInteiros = document.getElementById('uiBaloes').innerHTML;
    var baloesEstourados = document.getElementById('uiBaloesEstourados').innerHTML;

    baloesInteiros = parseInt(baloesInteiros);
    baloesEstourados = parseInt(baloesEstourados);

    baloesInteiros += acao;
    baloesEstourados -= acao;

    document.getElementById('uiBaloes').innerHTML = baloesInteiros;
    document.getElementById('uiBaloesEstourados').innerHTML = baloesEstourados;

    situacaoJogo(baloesInteiros);
}

function situacaoJogo(inteiros) {
    if (inteiros == 0) {
        alert('Parabéns, você venceu');
        pararJogo();
    }
}

function pararJogo() {
    clearTimeout(timerId);
}