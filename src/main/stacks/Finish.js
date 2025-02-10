import {Image, StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';
import FillButton from '../../components/FillButton';
import textStyle from '../../common/customText';

const Finish = ({navigation}) => {
  const onFinish = () => {
    navigation.navigate('Splash');
  };
  return (
    <ImageBackground
      source={require('../../../assets/img/bg_img.png')}
      style={styles.background}>
      <View style={styles.container}>
        <Image
          source={require('../../../assets/img/illustration.png')}
          style={styles.illustration}
        />
        <Text style={textStyle.heading}>You are ready to go!</Text>
        <Text style={[textStyle.normalText, styles.desc]}>
          Congratulation, any interesting topics will be shortly in your hands.
        </Text>
        <View style={styles.btnStyle}>
          <FillButton label={'Finish'} handlerButton={onFinish} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default Finish;

const styles = StyleSheet.create({
  btnStyle: {
    width: '100%',
  },
  illustration: {
    marginBottom: 24,
  },
  desc: {
    marginBottom: 24,
    marginTop: 12,
    textAlign: 'center',
  },
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
