import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
import textStyle from '../common/customText';
import colors from '../common/colors';
import {useDispatch} from 'react-redux';
import {addSearchHistoryAPI} from '../store/apis/User';
import {AppContext} from '../AppContext';

const {width} = Dimensions.get('window');
const imgSize1 = width * 0.425;
const imgSize2 = width * 0.213;
const BookItem = props => {
  const {
    nav,
    item,
    showAuthor = false,
    isHorizontal = false,
    isSearch = false,
  } = props;
  const dispatch = useDispatch();
  const {userEmail} = useContext(AppContext);
  return (
    <TouchableOpacity
      onPress={() => {
        nav.navigate('Detail', {item: item});
        if (isSearch) {
          dispatch(addSearchHistoryAPI({email: userEmail, bookId: item._id}));
        }
      }}>
      <View
        style={
          isHorizontal
            ? styles.horizontalItem
            : [styles.item, showAuthor ? {marginBottom: 16} : '']
        }>
        <Image
          source={{uri: item.coverImage}}
          resizeMode="cover"
          style={isHorizontal ? styles.image2 : styles.image1}
        />
        <View>
          <Text style={textStyle.titleHeader} numberOfLines={2}>
            {item.title}
          </Text>
          {showAuthor || isHorizontal ? (
            <Text style={styles.author}>{item.author} </Text>
          ) : (
            ''
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookItem;

const styles = StyleSheet.create({
  horizontalItem: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    padding: 12,
  },
  item: {
    width: imgSize1,
    gap: 12,
    marginRight: 16,
  },
  image1: {
    width: '100%',
    height: imgSize1,
  },
  image2: {
    width: imgSize2,
    height: imgSize2,
  },
  author: {
    ...textStyle.primarySubText,
  },
});
