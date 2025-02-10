import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import colors from '../common/colors';

const FillButton = props => {
  const {label, handlerButton, isDisable = false} = props;

  return (
    <View>
      <TouchableOpacity
        style={[styles.button]}
        onPress={handlerButton}
        disabled={isDisable}>
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FillButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 56,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'Poppin-Medium',
    fontSize: 16,
    color: '#fff',
  },
});
