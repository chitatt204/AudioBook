import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
const Test = () => {
  const [text, setText] = useState('abc');
  return (
    <View>
      <TextInput
        style={styles.edtBox}
        value={text}
        placeholder={'Edit Box'}
        placeholderTextColor={'#ccc'}
        onChangeText={text => setText(text)}
      />
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({});
