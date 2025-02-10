import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import colors from '../common/colors';
import textStyle from '../common/customText';

const InputBox = props => {
  const {placeholderText, value, onChange, onSubmit = ''} = props;
  return (
    <View>
      <TextInput
        placeholder={placeholderText}
        placeholderTextColor={colors.neutralGray}
        value={value}
        onChangeText={onChange}
        style={styles.input}
        onSubmitEditing={onSubmit}
      />
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    ...textStyle.inputText,
    backgroundColor: colors.neutralWhite,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
});
