let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1; // Inicialização da contagem
console.log(numeroSecreto); // Para fins de teste

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 100');
}

// Inicia o jogo com as mensagens padrão
exibirMensagemInicial();

function verificarChute() {
    // Pega o valor do input (sempre retorna string, o '==' lida com isso)
    let chute = document.querySelector('input').value;
    
    // O console.log que você colocou para debug está correto
    console.log(chute == numeroSecreto); 
    
    if (chute == numeroSecreto) {
        // --- Lógica de Vitória ---
        exibirTextoNaTela('h1', 'ACERTOU!');
        
        // Operador Ternário para singular/plural
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTetativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTetativas);
        
        // Habilita o botão de reiniciar (supondo que ele tenha o id='reiniciar')
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        // --- Lógica de Dicas ---
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor!');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior!');
        }
        
        // Incrementa a contagem SÓ se o jogador errou (correto)
        tentativas++;
        limparCampo();
    }

}

function gerarNumeroAleatorio() {
    // Gera um número inteiro entre 1 e 100
    let NumeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(NumeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else{
        listaDeNumerosSorteados.push(NumeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return NumeroEscolhido;
    }
}

function limparCampo() {
    // Seleciona o input e limpa o valor
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    // 1. Gera um novo número
    numeroSecreto = gerarNumeroAleatorio();
    console.log(numeroSecreto);
    
    // 2. Limpa o campo de chute
    limparCampo();
    
    // 3. Reseta as tentativas
    tentativas = 1; 
    
    // 4. Exibe a mensagem inicial
    exibirMensagemInicial();
    
    // 5. Desabilita o botão de reiniciar
    document.getElementById('reiniciar').setAttribute('disabled', true);
}