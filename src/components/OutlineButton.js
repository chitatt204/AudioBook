import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import colors from '../common/colors';

const OutlineButton = props => {
  const {label, handlerButton} = props;
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={handlerButton}>
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OutlineButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'Poppin-Medium',
    fontSize: 16,
    color: colors.primary,
  },
});
