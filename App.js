import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet,TouchableOpacity } from "react-native";
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import AppNavigator from './src/navigation/AppNavigator';
// import HomeScreen from './src/screens/HomeScreen';
// import DisplayScreen from './src/screens/DisplayScreen';


// const Tab = createBottomTabNavigator();

// const App = () => {
//   return(
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Display" component={DisplayScreen} />
//         <Tab.Screen name="Profile" component={AppNavigator} />
//       </Tab.Navigator>
//     </NavigationContainer>  )
// }

const App = () => {
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
          <View style={styles.board}>
          {board.map((_,index) => renderSquare(index))}
          </View>
          <TouchableOpacity onPress={()=> {
              setBoard(Array(9).fill(null));
              setIsNext(true);
          }}>
              <Text>Restart Game</Text>
          </TouchableOpacity>
         
      </View>
  );
};
const styles = StyleSheet.create({
  container:{
      flex:1,
      justifyContent:"center",
      alignContent:"center",
  },
  board:{
      flexDirection:"row",
      flexWrap:"wrap",
      width:429, 
     },
  square:{
      width:143,
      height:143,
      justifyContent:"center",
      alignContent:"center",
      borderWidth:1,
      borderColor:"white"
  },
  squareText:{
      fontSize:20,
      textAlign: "center",
  }
})
export default App;