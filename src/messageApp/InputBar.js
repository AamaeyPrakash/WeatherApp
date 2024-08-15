import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const sendArrow = require('../assets/sendArrow.png')

const InputBar = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <View style={styles.inputBarContainer}>
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={setText}
        placeholder="Type a message"
      />
      <TouchableOpacity onPress={handleSend}>
        <Image source={sendArrow} style={styles.sendButton}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  textInput: {
    flex: 1,
    padding: 10,
    backgroundColor: '#2a3942',
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#202c33',
    color:'white',
  },
  sendButton: {
    width: 29,
    height:32,
    borderRadius:15,
  }
});

export default InputBar;
