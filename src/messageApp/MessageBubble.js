import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MessageBubble = ({ message, isSentByUser }) => {
  return (
    <View style={[
      styles.messageContainer, 
      isSentByUser ? styles.sent : styles.received
    ]}>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  sent: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
  },
  received: {
    alignSelf: 'flex-start',
    backgroundColor: '#ececec',
  },
  messageText: {
    fontSize: 16,
  },
});

export default MessageBubble;