import {StyleSheet} from 'react-native';
import colors from './colors';

const textStyle = StyleSheet.create({
  highLightText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 21,
    color: colors.neutralBlue,
  },
  accentText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: colors.accent,
    lineHeight: 21,
  },
  errText: {
    color: 'red',
    fontSize: 14,
    lineHeight: 16,
    fontFamily: 'Roboto-Regular',
  },
  heading: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    lineHeight: 36,
    color: colors.neutralBlack,
  },

  normalText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 21,
    color: colors.neutralBlue,
  },
  largerText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: colors.neutralBlue,
  },
  inputText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 21,
    color: colors.neutralBlue,
  },
  titleAuthen: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: colors.neutralBlue,
  },
  titleHeader: {
    fontFamily: 'Poppins-Meidum',
    fontSize: 16,
    lineHeight: 24,
    color: colors.neutralBlue,
  },
  titleSection: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 24,
    color: colors.neutralBlack,
  },

  subTextItem: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: colors.neutral60,
  },
  primaryNormalText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.primary,
    lineHeight: 21,
  },
  primarySubText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.primary,
    lineHeight: 18,
  },
});

export default textStyle;
