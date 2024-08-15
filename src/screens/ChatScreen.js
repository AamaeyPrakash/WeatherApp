import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import ChatHeader from '../messageApp/ChatHeader';
import MessageList from '../messageApp/MessageList';
import InputBar from '../messageApp/InputBar';

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
      <ImageBackground 
        style={styles.background}
        source={require('../assets/bgPlaceholder.jpg')}
        >
        <StatusBar barStyle="light-content" />
        <ChatHeader title="Chat with Aamaey" />
        <MessageList messages={messages} />
        <InputBar onSend={handleSend} />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  background: {
    flex: 1,
  }
});

export default ChatScreen;
