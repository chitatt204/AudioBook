import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useContext} from 'react';
import {useDispatch} from 'react-redux';

import {
  getNewBooksAPI,
  getRecommendedBooksAPI,
  getTopTrendingBookAPI,
} from '../../store/apis/Book';
import {AppContext} from '../../AppContext';
const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  const {userEmail} = useContext(AppContext);

  // lấy dữ liệu cho home
  useEffect(() => {
    dispatch(getTopTrendingBookAPI());
    dispatch(getNewBooksAPI());
    dispatch(getRecommendedBooksAPI(userEmail));
  }, [dispatch, userEmail]);

  // chuyển hướng
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('MainTabNavigation');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/img/logo.png')} />
      <Image
        source={require('../../../assets/img/logo_audio_book.png')}
        style={styles.nameApp}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameApp: {
    marginTop: 15,
  },
});
