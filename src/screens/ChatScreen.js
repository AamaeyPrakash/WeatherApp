import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import { databases } from '../../appWriteConfig';
import ChatHeader from '../messageApp/ChatHeader';
import MessageList from '../messageApp/MessageList';
import InputBar from '../messageApp/InputBar';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  const handleSend = async(message) => {
    const newMessage = {
      text:message,
      isSentByUser:true,
    }
    try{
      const response = await databases.createDocument(
        "66b0c833001eaadd638b",
        "66bdefde0019fedaa635",
        'unique()',
        newMessage
      );
      setMessages([response,...messages]);
    } 
    catch (error) {
      console.error("Error Saving Messages",error);
    }
  };

  useEffect(()=>{
    const fetchMessages = async() => {
      try{
        const response = await databases.listDocuments(
          "66b0c833001eaadd638b",
          "66bdefde0019fedaa635",
        );
        console.log(response.documents)
        setMessages(response.documents);
      }
      catch(error){
        console.error("Error Saving Messages",error);
      }
    };
    fetchMessages();
  },[]);

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
