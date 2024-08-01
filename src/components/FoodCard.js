import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import React from 'react'


const FoodCard = () => {
  return (
    <View style={styles.card}>
        <Text style={styles.cardTitle}>Title</Text>
        <Image source={""}></Image>
    </View>
  )
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        margin: 10,
        width: Dimensions.get('window').width,
        heigth: 1000,
    },
      cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
      },
})

export default FoodCard