/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';

import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function App() {
  const [tela, setTela] = useState('menu');
  const [jogadoraAtual, setJogadorAtual] = useState('');
  const [tabuleiro, setTabuleiro] = useState([]);
  const [jogadasRestantes, setJogadasRestantes] = useState(0);
  const [vencedor, setVencedor] = useState('');

  function inciarJogo(jogador) {
    setJogadorAtual(jogador);
    setJogadasRestantes(9);
    setTabuleiro([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);

    setTela('jogo');
  }

  function jogar(linha, coluna) {
    tabuleiro[linha][coluna] = jogadoraAtual;
    setTabuleiro([...tabuleiro]);
    setJogadorAtual(jogadoraAtual === 'X' ? 'O' : 'X');

    verificarVencedor(tabuleiro, linha, coluna);
  }

  function verificarVencedor(tabuleiro, linha, coluna) {
    if (
      tabuleiro[linha][0] !== '' &&
      tabuleiro[linha][0] === tabuleiro[linha][1] &&
      tabuleiro[linha][1] === tabuleiro[linha][2]
    ) {
      return finalizarJogo(tabuleiro[linha][0]);
    }
    //Colunas
    if (
      tabuleiro[0][coluna] !== '' &&
      tabuleiro[0][coluna] === tabuleiro[1][coluna] &&
      tabuleiro[1][coluna] === tabuleiro[2][coluna]
    ) {
      return finalizarJogo(tabuleiro[0][coluna]);
    }

    //Diagonal 1

    if (
      tabuleiro[0][0] !== '' &&
      tabuleiro[0][0] === tabuleiro[1][1] &&
      tabuleiro[1][1] === tabuleiro[2][2]
    ) {
      return finalizarJogo(tabuleiro[0][0]);
    }

    if (
      tabuleiro[0][2] !== '' &&
      tabuleiro[0][2] === tabuleiro[1][1] &&
      tabuleiro[1][1] === tabuleiro[2][0]
    ) {
      return finalizarJogo(tabuleiro[0][2]);
    }
    //Empate

    if (jogadasRestantes - 1 === 0) {
      return finalizarJogo('');
    }

    //Jogo nao finalizado

    setJogadasRestantes(jogadasRestantes - 1);
  }

  function finalizarJogo(jogador) {
    setVencedor(jogador);
    setTela('vencedor');
  }

  switch (tela) {
    case 'menu':
      return getTelaMenu();

    case 'jogo':
      return getTelaJogo();

    case 'vencedor':
      return getTelaVencedor();
  }

  function getTelaMenu() {
    return (
      <View style={StyleSheet.container}>
        <StatusBar style="auto" />
        <Text style={Style.titulo}>Jogo da Velha</Text>
        <Text style={Style.subtitulo}>Selecione o primeiro jogador!</Text>

        <View style={Style.inlineItems}>
          <TouchableOpacity
            style={Style.boxJogador}
            onPress={() => inciarJogo('X')}>
            <Text style={Style.jogadorX}>X</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={Style.boxJogador}
            onPress={() => inciarJogo('O')}>
            <Text style={Style.jogadorO}>O</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function getTelaJogo() {
    return (
      <View Style={StyleSheet.container}>
        <StatusBar style="auto" />
        <Text style={Style.titulo}>Jogo da Velha</Text>

        {tabuleiro.map((linha, numeroLinha) => {
          return (
            <View key={numeroLinha} style={Style.inlineItems}>
              {linha.map((coluna, numeroColuna) => {
                return (
                  <TouchableOpacity
                    key={numeroColuna}
                    style={Style.boxJogador2}
                    onPress={() => jogar(numeroLinha, numeroColuna)}
                    disabled={coluna !== ''}>
                    <Text
                      style={coluna === 'X' ? Style.jogadorX : Style.jogadorO}>
                      {coluna}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}

        <TouchableOpacity
          style={Style.botaoMenu}
          onPress={() => setTela('menu')}>
          <Text style={Style.textoBotaoMenu}>Voltar ao menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function getTelaVencedor() {
    return (
      <View Style={StyleSheet.container}>
        <StatusBar style="auto" />
        <Text style={Style.titulo}>Jogo da Velha</Text>
        <Text style={Style.subtitulo}>Resultado final</Text>

        {vencedor === '' && <Text style={Style.vencedor}>Empate</Text>}

        {vencedor !== '' && (
          <>
            <Text style={Style.vencedor}>Vencedor</Text>
            <View style={Style.boxJogador3}>
              <Text style={vencedor === 'X' ? Style.jogadorX : Style.jogadorO}>
                {vencedor}
              </Text>
            </View>
          </>
        )}

        <TouchableOpacity
          style={Style.botaoMenu}
          onPress={() => setTela('menu')}>
          <Text style={Style.textoBotaoMenu}>Voltar ao menu</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#e8f8ff',
    marginTop: 280,
    alignSelf: 'center',
  },
  subtitulo: {
    fontSize: 20,
    color: 'e8f8ff',
    marginTop: 10,
    alignSelf: 'center',
  },

  boxJogador: {
    height: 80,
    width: 90,
    marginTop: 30,
    backgroundColor: '#ddd',
    marginLeft: 80,
    alignItems: 'center',
    justifyContent: 'center',
    margin: -25,
  },
  boxJogador2: {
    height: 80,
    width: 90,
    marginTop: 30,
    backgroundColor: '#ddd',
    marginLeft: 35,
    alignItems: 'center',
    justifyContent: 'center',
    margin: -10,
  },
  boxJogador3: {
    alignSelf: 'center',
    height: 80,
    width: 90,
    marginTop: 30,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    margin: -10,
  },
  jogadorX: {
    fontSize: 50,
    color: '#059103',
  },
  jogadorO: {
    fontSize: 50,
    color: '#cc0e0e',
  },
  inlineItems: {
    flexDirection: 'row',
  },
  botaoMenu: {
    marginTop: 40,
    marginLeft: 150,
  },
  textoBotaoMenu: {
    color: '#4e6fe4',
  },
  vencedor: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#e1e8e6',
    alignSelf: 'center',
    marginTop: 25,
  },
});
