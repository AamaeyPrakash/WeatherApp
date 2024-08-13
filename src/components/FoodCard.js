import { View, Text, StyleSheet, Dimensions, FlatList, Image } from 'react-native'
import React, {useState} from 'react'


const data = [
  { id: 1, title: 'Card 1' },
  { id: 2, title: 'Card 2' },
  { id: 3, title: 'Card 3' },
  { id: 4, title: 'Card 4' },
  { id: 5, title: 'Card 5' },
];

const Card = ({ title }) => (
  <View style={styles.card}>
    <View>
      <Image source={require('../assets/zomato_logo.png')} style={styles.cardImage}/>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text>
    </View>
  </View>
);



const FoodCard = () => {
  const renderItem = ({ item }) => (
    <Card title={item.title} />
  );

  return (
    <View style={styles.container}>
      <FlatList data={data} renderItem={renderItem} horizontal={true}/>
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        margin: 10,
        width: 410,
        height: 300,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000000',
    },
    description: {
      color:'black',
    },
    cardImage: {
      width: 360,
      height: 200,
      display: 'block',
    },
})

export default FoodCard