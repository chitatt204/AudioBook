import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import textStyle from '../common/customText';
import {useNavigation} from '@react-navigation/native';
import colors from '../common/colors';
const HeaderComponent = props => {
  const {
    title,
    rightIcon = false,
    isSave = false,
    handlerBookmark = '',
    isBookmark = false,
    handlerSave = '',
  } = props;
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Image source={require('../../assets/img/ic_arrow.png')} />
      </TouchableOpacity>
      <Text numberOfLines={1} style={textStyle.titleHeader}>
        {title}
      </Text>
      {rightIcon ? (
        <TouchableOpacity onPress={handlerBookmark}>
          {isBookmark ? (
            <Image
              source={require('../../assets/img/bookmark_solid.png')}
              style={styles.bookmarkIcon}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require('../../assets/img/bookmark_outline.png')}
              style={styles.bookmarkIcon}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
      ) : isSave ? (
        <TouchableOpacity onPress={handlerSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  bookmarkIcon: {
    width: 20,
    height: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  saveText: {
    fontFamily: 'Poppins-Meidum',
    fontSize: 16,
    lineHeight: 24,
    color: colors.primary,
  },
});
