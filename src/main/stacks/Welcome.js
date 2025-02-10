import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import FillButton from '../../components/FillButton';
import OutlineButton from '../../components/OutlineButton';
import textStyle from '../../common/customText';
import colors from '../../common/colors';
const Welcome = props => {
  const {navigation} = props;

  function personalizeButtonHandler() {
    navigation.navigate('SelectTopics');
  }
  return (
    <ImageBackground
      source={require('../../../assets/img/bg_img.png')}
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome !</Text>
        <Text style={styles.heading}>Find what you are looking for</Text>
        <Text style={textStyle.normalText}>
          By personalize your account, we can help you to find what you like.
        </Text>

        <View style={styles.btnContainer}>
          <FillButton
            label={'Personalize Your Account'}
            handlerButton={personalizeButtonHandler}
          />
        </View>

        <OutlineButton
          label={'Skip'}
          handlerButton={() => navigation.navigate('Splash')}
        />
      </View>
    </ImageBackground>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  heading: {
    width: '80%',
    fontFamily: 'Poppins-Thin',
    color: colors.primary,
    fontSize: 48,
    marginTop: 8,
    marginBottom: 16,
  },
  welcomeText: {
    fontFamily: 'Poppins-SemiBold',
    color: colors.accent,
    fontSize: 16,
    lineHeight: 24,
  },
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'center',
  },
  btnContainer: {
    marginTop: 32,
    marginBottom: 16,
  },
});
