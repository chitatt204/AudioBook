import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import HeaderComponent from '../../components/HeaderComponent';
import {getListChapterAPI} from '../../store/apis/Chapter';
import textStyle from '../../common/customText';

const {width} = Dimensions.get('window');
const imgSize = width * 0.693;
const ShowListChapter = props => {
  const {navigation, route} = props;
  const bookName = props.route?.params?.bookName;
  const bookId = props.route?.params?.bookId;
  const bookImg = props.route?.params?.bookImg;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListChapterAPI(bookId));
  }, [bookId]);
  const {listChapterData, getListChapterStatus} = useSelector(
    state => state.listChapter,
  );

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <Text style={styles.itemText}>
          Chương {item.numChap}: {item.title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <HeaderComponent title={bookName} />
      <View style={styles.bodyContainer}>
        <Image source={{uri: bookImg}} style={styles.img} />
        <Text style={styles.chapterHeading}>Danh sách chương</Text>
        <FlatList
          data={listChapterData?.data}
          keyExtractor={item => item._id}
          renderItem={renderItem}
          style={styles.flatListContainer}
        />
        <View style={styles.btnContainer}>
          <View style={styles.btnGroup}>
            <TouchableOpacity style={styles.firstBtn}>
              <Text style={styles.firstLabel}>Đọc từ đầu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.finalBtn}>
              <Text style={styles.finalLabel}>Đọc chương cuối</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.saveBtn}>
            <Text style={styles.saveLabel}>Lưu sách</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ShowListChapter;

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  flatListContainer: {
    maxHeight: '50%',
  },
  img: {
    width: imgSize,
    height: imgSize,
    margin: 'auto',
    marginBottom: 30,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 24,
  },
  chapterHeading: {
    ...textStyle.titleSection,
    paddingVertical: 10,
    // borderBottomWidth: 2,
    // borderTopWidth: 2,
    // borderColor: '#ccc',
  },
  itemText: {
    ...textStyle.normalText,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});
