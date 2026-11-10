
const visor = document.getElementById("visor");

let valorAtual = "0";
let valorAnterior = null;
let operadorAtual = null;
let novoNumero = false;


// Digitar os números
function digitarNumero(numero) {

    if (numero === "." && valorAtual.includes(".")) {
        return;
    }

    if (novoNumero) {
        valorAtual = numero === "." ? "0." : numero;
        novoNumero = false;
    } else {
        valorAtual = valorAtual === "0" && numero !== "."
            ? numero
            : valorAtual + numero;
    }

    atualizarVisor();
}


// Escolher a operação
function escolherOperador(operador) {

    if (operadorAtual !== null && !novoNumero) {
        calcular();
    }

    valorAnterior = parseFloat(valorAtual);
    operadorAtual = operador;
    novoNumero = true;
}


// Realizar o cálculo
function calcular() {

    if (operadorAtual === null || valorAnterior === null || novoNumero) {
        return;
    }

    const segundoNumero = parseFloat(valorAtual);
    let resultado;

    switch (operadorAtual) {

        case "+":
            resultado = valorAnterior + segundoNumero;
            break;

        case "-":
            resultado = valorAnterior - segundoNumero;
            break;

        case "*":
            resultado = valorAnterior * segundoNumero;
            break;

        case "/":
            if (segundoNumero === 0) {
                valorAtual = "Erro";
                valorAnterior = null;
                operadorAtual = null;
                novoNumero = true;
                atualizarVisor();
                return;
            }

            resultado = valorAnterior / segundoNumero;
            break;
    }

    valorAtual = String(Number(resultado.toPrecision(12)));
    valorAnterior = null;
    operadorAtual = null;
    novoNumero = true;

    atualizarVisor();
}


// Limpar a calculadora
function limpar() {

    valorAtual = "0";
    valorAnterior = null;
    operadorAtual = null;
    novoNumero = false;

    atualizarVisor();
}


// Apagar o último número
function apagar() {

    if (novoNumero) {
        return;
    }

    valorAtual = valorAtual.slice(0, -1);

    if (valorAtual === "" || valorAtual === "-") {
        valorAtual = "0";
    }

    atualizarVisor();
}


// Atualizar o visor
function atualizarVisor() {
    visor.value = valorAtual;
}


// Identificar os cliques nos botões
document.querySelectorAll("button").forEach(botao => {

    botao.addEventListener("click", () => {

        if (botao.dataset.number !== undefined) {
            digitarNumero(botao.dataset.number);
        }

        if (botao.dataset.operator !== undefined) {
            escolherOperador(botao.dataset.operator);
        }

        if (botao.dataset.action === "igual") {
            calcular();
        }

        if (botao.dataset.action === "limpar") {
            limpar();
        }

        if (botao.dataset.action === "apagar") {
            apagar();
        }

    });

});
