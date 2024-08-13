import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const MessageBubble = ({message, isSentByUser}) => {
  return (
    <View style={[
        styles.messageContainer,
        isSentByUser ? styles.sent : styles.recieved
    ]}>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    messageText: {
        fontSize: 14,
    },
    messageContainer: {
        maxWidth:'80%',
        margin:10,
        padding:10,
        borderRadius:10,
    },
    sent:{
        backgroundColor:'dcf8f8f8',
        alignSelf:'flex-end',
    },
    sent:{
        backgroundColor:'dcf8f8f8',
    }
});

export default MessageBubble