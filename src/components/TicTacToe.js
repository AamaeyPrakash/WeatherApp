import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet,TouchableOpacity, ImageBackground } from "react-native";

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isNext, setIsNext] = useState(true);
    
    const handlePress = (index) => {
        if (board[index] || Winner(board)) {
            return;
        }
        const newBoard = board.slice();
        newBoard[index] = isNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsNext(!isNext);
    };
  
    const renderSquare = (index) => (
        <TouchableOpacity 
        onPress={() => handlePress(index)}
        style={styles.square}>
            <Text style={styles.squareText}>
                {board[index]}
            </Text>
        </TouchableOpacity>
    );
  
    const Winner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };
    const declareWinner = Winner(board);
    let status;
    if(declareWinner){
        Alert.alert("Somebody Won!");
    }
  
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/wood_bg.jpg')} style={styles.board}>
                {board.map((_, index) => renderSquare(index))}
            </ImageBackground>
            <TouchableOpacity onPress={()=> {
                setBoard(Array(9).fill(null));
                setIsNext(true);
            }} style={styles.restartButton}>
                <Text style={styles.restartText}>Restart Game</Text>
            </TouchableOpacity>
        </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
    },
    board: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: 430,
        height: 430,
        padding: 5,
    },
    square: {
        width: 140,
        height: 140,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.2)",
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    squareText: {
        fontSize: 40,
        color: '#8B4513',
        fontWeight: 'bold',
    },
    restartButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#8B4513',
        borderRadius: 5,
    },
    restartText: {
        color: 'white',
        fontSize: 18,
    },
  })

  export default TicTacToe;