import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import ChatHeader from '../messageApp/ChatHeader';
import MessageList from '../messageApp/MessageList';
import InputBar from './InputBar';

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello!', isSentByUser: false },
    { text: 'Hi there!', isSentByUser: true },
    { text: 'How are you?', isSentByUser: false },
    { text: 'I am good, thanks!', isSentByUser: true },
  ]);

  const handleSend = (message) => {
    setMessages([{ text: message, isSentByUser: true }, ...messages]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ChatHeader title="Chat with Aamaey" />
      <MessageList messages={messages} />
      <InputBar onSend={handleSend} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});

export default ChatScreen;
