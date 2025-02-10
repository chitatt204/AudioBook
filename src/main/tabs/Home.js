import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderBar from '../../components/HeaderBar';
import {useDispatch, useSelector} from 'react-redux';
import textStyle from '../../common/customText';
import BookItem from '../../components/BookItem';
import {Rating} from '@kolking/react-native-rating';
import {getBooksByGenreIdAPI} from '../../store/apis/Book';

const {width, height} = Dimensions.get('window');
const recommendedBookWidth = width * 0.53;
const recommendedBookHeight = height * 0.369;
const trendingBookSize = width * 0.32;

const Home = props => {
  const {navigation} = props;

  const dispatch = useDispatch();
  const [genreNameSelected, setGenreNameSelected] = useState('');
  const [isNavigate, setIsNavigate] = useState(false);
  const [loading, setLoading] = useState(false);

  const {listGerneData, fetchListGerneStatus} = useSelector(
    state => state.listGenre,
  );
  const {recommendedBookData, getRecommendedBookStatus} = useSelector(
    state => state.recommendedBooks,
  );

  const {trendingBookData, getTrendingBookStatus} = useSelector(
    state => state.topTrendingBooks,
  );
  const {newReleaseBookData, getNewReleaseBookStatus} = useSelector(
    state => state.newReleaseBooks,
  );
  const {bookOfGenreData, fetchBookOfGenreStatus} = useSelector(
    state => state.bookOfGenre,
  );

  const renderItemCategory = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(getBooksByGenreIdAPI(item._id));
          setGenreNameSelected(item.name);
          setIsNavigate(true);
        }}>
        <View style={styles.categoryItem}>
          <Text style={textStyle.largerText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (fetchBookOfGenreStatus === 'succeeded' && isNavigate) {
      setLoading(false);
      setIsNavigate(false);
      navigation.navigate('SectionMore', {
        data: bookOfGenreData?.data,
        type: genreNameSelected,
      });
    } else if (fetchBookOfGenreStatus === 'loading') {
      setLoading(true);
    } else {
      setLoading(false);
      setIsNavigate(false);
    }
  }, [fetchBookOfGenreStatus]);
  const renderItemRecommended = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Detail', {item: item});
        }}>
        <View style={styles.bookItem}>
          <Image
            source={{uri: item.coverImage}}
            style={styles.recommendedImage}
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
    );
  };
  const renderItemTrending = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Detail', {item: item});
        }}>
        <View style={styles.itemContainer}>
          <Image
            source={{uri: item.coverImage}}
            style={styles.trendingImage}
            resizeMode="cover"
          />
          <View style={styles.infContainer}>
            <Text style={textStyle.titleSection}>{item.title}</Text>
            <Text style={textStyle.subTextItem}>{item.author}</Text>
            <View style={styles.itemRating}>
              <Rating size={24} rating={item.rating} />
            </View>
            <Text style={textStyle.subTextItem}>{item.views} Views</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <HeaderBar />
        <View style={[styles.partContainer, styles.categoryPart]}>
          <View style={styles.partHeader}>
            <Text style={styles.heading}>Categories</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ListGenre', {data: listGerneData?.data});
              }}>
              <Text style={styles.moreLink}>See more</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={listGerneData?.data}
            renderItem={renderItemCategory}
            keyExtractor={item => item._id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.partContainer}>
          <View style={styles.partHeader}>
            <Text style={styles.heading}>Recommended For You</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SectionMore', {
                  data: recommendedBookData.data,
                  type: 'Recommended For You',
                });
              }}>
              <Text style={styles.moreLink}>See more</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recommendedBookData?.data}
            renderItem={renderItemRecommended}
            keyExtractor={item => item._id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.partContainer}>
          <View style={styles.partHeader}>
            <Text style={styles.heading}>Top Trending</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SectionMore', {
                  data: trendingBookData.data,
                  type: 'Top Trending',
                });
              }}>
              <Text style={styles.moreLink}>See more</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={trendingBookData?.data}
            renderItem={renderItemTrending}
            keyExtractor={item => item._id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.partContainer}>
          <View style={styles.partHeader}>
            <Text style={styles.heading}>New Release</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SectionMore', {
                  data: newReleaseBookData.data,
                  type: 'New Release',
                })
              }>
              <Text style={styles.moreLink}>See more</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={newReleaseBookData?.data}
            renderItem={({item}) => <BookItem nav={navigation} item={item} />}
            keyExtractor={item => item._id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loadingView}
          />
        ) : (
          ''
        )}
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  loadingView: {
    position: 'absolute',
    top: '45%',
    left: '45%',
  },
  categoryPart: {
    marginTop: 10,
  },

  recommendedImage: {
    width: recommendedBookWidth,
    height: recommendedBookHeight,
  },
  trendingImage: {
    width: trendingBookSize,
    height: trendingBookSize,
  },
  itemRating: {
    marginTop: 20,
  },
  infContainer: {
    gap: 4,
  },
  itemContainer: {
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#F5F5FA',
    flexDirection: 'row',
    gap: 16,
    marginRight: 16,
  },
  bookItem: {
    marginRight: 16,
  },

  partHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 24,
  },
  heading: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#010104',
  },
  moreLink: {
    ...textStyle.primaryNormalText,
  },
  partContainer: {
    marginTop: 20,
    gap: 16,
    paddingLeft: 24,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    gap: 32,
    paddingBottom: 42,
  },

  categoryItem: {
    marginRight: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F5F5FA',
    borderRadius: 12,
  },
});
