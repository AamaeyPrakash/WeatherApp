import React from 'react'
import { View, Text, FlatList, ScrollView } from 'react-native';
import FoodCard from '../components/FoodCard';

function DisplayScreen() {
  return (

      <ScrollView>
        <FoodCard/>
        <FoodCard/>
        <FoodCard/>
      </ScrollView>

  )
}

export default DisplayScreen