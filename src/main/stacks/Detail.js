import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {Rating} from '@kolking/react-native-rating';
import {useDispatch, useSelector} from 'react-redux';

import HeaderComponent from '../../components/HeaderComponent';
import colors from '../../common/colors';
import {getReviewsByBookId} from '../../store/apis/Reviews';
import CustomCarousel from '../../components/CustomCarousel';
import {AppContext} from '../../AppContext';
import {toggleSavedBookAPI} from '../../store/apis/User';

const {width} = Dimensions.get('window');
const imgSize = width * 0.693;

const Detail = props => {
  const {navigation, route} = props;
  const obj = props.route?.params?.item;
  const genres = obj?.genres;
  useEffect(() => {
    console.log(genres);
  }, []);
  const {userEmail} = useContext(AppContext);
  const [isBookmark, setIsBookmark] = useState(false);

  const dispatch = useDispatch();

  const {savedBookChangeData, fetchChangeSavedBookStatus} = useSelector(
    state => state.toggleSavedBook,
  );
  const {reviewData, fetchReviewStatus} = useSelector(
    state => state.reviewsOfBook,
  );

  useEffect(() => {
    dispatch(getReviewsByBookId(obj._id));
  }, [obj._id]);

  useEffect(() => {
    if (savedBookChangeData?.data) {
      const isBookmarked = savedBookChangeData.data.some(
        item => item === obj._id,
      );
      setIsBookmark(isBookmarked);
    }
  }, [savedBookChangeData, obj._id]);

  const handleBookmark = () => {
    const data = {email: userEmail, bookId: obj._id};
    dispatch(toggleSavedBookAPI(data)).then(() => {
      setIsBookmark(!isBookmark);
    });
  };

  const handleReadBtn = () => {
    navigation.navigate('ListChapter', {
      bookId: obj._id,
      bookName: obj.title,
      bookImg: obj.coverImage,
    });
  };
  return (
    <View style={styles.container}>
      <HeaderComponent
        title={obj.title}
        rightIcon={true}
        handlerBookmark={handleBookmark}
        isBookmark={isBookmark}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}>
        <View style={styles.imgContainer}>
          <Image source={{uri: obj.coverImage}} style={styles.img} />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{obj.title}</Text>
        </View>
        <View style={styles.authorContainer}>
          <Text style={styles.author}>{obj.author}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <View>
            <Rating size={24} rating={obj.rating} />
          </View>
          <View>
            <Text style={styles.ratingNum}>{obj.rating}</Text>
          </View>
        </View>
        <View style={styles.typeContainer}>
          {genres?.map((item, index) => {
            return (
              <View style={styles.typeItem} key={item._id}>
                <Text style={styles.type}>{item.name}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.actButtonGroup}>
          <TouchableOpacity style={styles.playButton}>
            <Image source={require('../../../assets/img/ic_play.png')} />
            <Text style={styles.playButtonLabel}>Play Audio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.readButton} onPress={handleReadBtn}>
            <Image source={require('../../../assets/img/ic_doc.png')} />
            <Text style={styles.readButtonLabel}>Read Book</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.summaryContainer}>
          <Text style={styles.heading}>Summary</Text>
          <Text style={styles.desc}>{obj.summary}</Text>
        </View>

        {reviewData?.data?.length > 0 ? (
          <View style={styles.reviewContainer}>
            <Text style={styles.heading}>Review</Text>
            <View style={styles.carouselContainer}>
              <CustomCarousel listReview={reviewData?.data} />
            </View>
          </View>
        ) : (
          <View style={styles.noReviewContainer}>
            <Text style={styles.heading}>Review</Text>
            <Text style={styles.noReview}>Không có đánh giá nào !</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  noReview: {
    margin: 'auto',
  },
  noReviewContainer: {
    marginTop: 40,
    gap: 20,
  },
  carouselContainer: {
    marginLeft: -20,
  },
  scrollContainer: {
    padding: 32,
  },
  reviewContainer: {
    height: 300,
    marginTop: 40,
    gap: 20,
  },
  img: {
    width: imgSize,
    height: imgSize,
  },
  ratingNum: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    color: '#9292A2',
  },
  ratingContainer: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 12,
  },
  desc: {
    fontFamily: 'Poppins-Light',
    fontSize: 14,
    color: '#6A6A8B',
    lineHeight: 19,
  },
  descContainer: {
    marginTop: 12,
  },
  heading: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: colors.neutralBlue,
    lineHeight: 21,
  },
  summaryContainer: {
    marginTop: 32,
    gap: 12,
  },
  readButtonLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#4838D1',
  },
  readButton: {
    width: 148,
    height: 53,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4838D1',
  },
  playButtonLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#fff',
  },
  playButton: {
    width: 148,
    height: 53,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    borderRadius: 8,
    backgroundColor: '#4838D1',
  },
  actButtonGroup: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 29,
  },
  type: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#6A6A8B',
  },
  typeItem: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#6A6A8B',
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  author: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#9292A2',
  },
  authorContainer: {
    marginTop: 4,
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    color: '#010104',
  },
  nameContainer: {
    marginTop: 28,
  },

  imgContainer: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
