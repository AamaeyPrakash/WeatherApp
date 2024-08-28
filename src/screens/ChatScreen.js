import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import { databases, account } from '../../appWriteConfig';
import ChatHeader from '../messageApp/ChatHeader';
import MessageList from '../messageApp/MessageList';
import InputBar from '../messageApp/InputBar';
import { Query } from 'appwrite';

const ChatScreen = ({route}) => {
  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const {RecieverId,RecieverName} = route.params;

  console.log(route);
  
  useEffect(()=>{
    const getCurrentUser = async () => {
      try {
        const user = await account.get();
        setCurrentUserId(user.$id);
        //console.log(user);
      }
      catch(error){
        console.error(error);
      }
    };
    getCurrentUser();
  },[])
  const handleSend = async(message) => {
    const newMessage = {
      text:message,
      isSentByUser:true,
      sendersID:currentUserId,
      recieverID:RecieverId,
      timestamp:new Date().toISOString(),
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
      if (!currentUserId) {
        console.error("user Not found");
        return;
      }
      if (!RecieverId) {
        console.error("reciever Not found");
        return;

      }
      try{
        const response = await databases.listDocuments(
          "66b0c833001eaadd638b",
          "66bdefde0019fedaa635",[
            Query.or([
              Query.and([ Query.equal("sendersID",currentUserId),Query.equal("recieverID",RecieverId)]),
              Query.and([ Query.equal("sendersID",RecieverId),Query.equal("recieverID",currentUserId)]),
            ])
          
          ]
        );
        //console.log(response.documents)
        setMessages(response.documents);
      }
      catch(error){
        console.error("Error Saving Messages",error);
      }
    };
    if(currentUserId && RecieverId){
       fetchMessages();
    }
  },[currentUserId,RecieverId]);

  const RecieverChatName = "Chat with " + RecieverName
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        style={styles.background}
        source={require('../assets/bgPlaceholder.jpg')}
        >
        <StatusBar barStyle="light-content" />
        <ChatHeader title={RecieverChatName} />
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
