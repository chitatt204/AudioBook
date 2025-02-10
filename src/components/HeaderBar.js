import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
const HeaderBar = () => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('Setting');
  };
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.logoContainer}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Image
          source={require('../../assets/img/logo.png')}
          style={styles.logo}
        />
        <Image source={require('../../assets/img/logo_audio_book.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <Image source={require('../../assets/img/ic_setting.png')} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
  },
  logoContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 20,
  },
});
