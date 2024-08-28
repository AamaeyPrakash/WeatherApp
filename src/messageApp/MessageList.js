import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import MessageBubble from './MessageBubble';

const MessageList = ({ messages }) => {
  // console.log('Rendering MessageList with messages:', messages); // Debugging line

  if (!messages || messages.length === 0) {
    return (
      <View style={styles.messageList}>
        <Text>No messages</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={messages}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <MessageBubble message={item.text} isSentByUser={item.isSentByUser} />
      )}
      inverted
      style={styles.messageList}
    />
  );
};

const styles = StyleSheet.create({
  messageList: {
    flex: 1,
  },
});

export default MessageList;
