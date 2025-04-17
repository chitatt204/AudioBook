// 1. Import thư viện bên ngoài
import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

// 2. Import các module cục bộ
import HeaderBar from '../../components/HeaderBar';
import InputBox from '../../components/InputBox';
import textStyle from '../../common/customText';
import colors from '../../common/colors';
import {getBookSearchAPI, getSearchHistoryAPI} from '../../store/apis/Book';
import {AppContext} from '../../AppContext';
import BookItem from '../../components/BookItem';

// 3. Constants
const {width} = Dimensions.get('window');
const topicItemWidth = (width - 60) / 2;

// 4. Tách các hàm render UI ra ngoài component chính
const viewBeforeSearch = (userGenres, searchHistoryData, navigation) => (
  <View style={styles.subContainer}>
    <View style={styles.sectionContainer}>
      <Text style={textStyle.titleSection}>Recommended Categories</Text>
      <View style={styles.topicContainer}>
        {userGenres?.map(item => (
          <TouchableOpacity style={styles.topicItem} key={item._id}>
            {item.icon && (
              <Image source={{uri: item.icon}} style={styles.topicIcon} />
            )}
            <Text style={textStyle.largerText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
    <View style={[{paddingRight: 0}, styles.sectionContainer]}>
      <Text style={textStyle.titleSection}>Latest Search</Text>
      <FlatList
        data={searchHistoryData?.data}
        renderItem={({item}) => <BookItem nav={navigation} item={item} />}
        keyExtractor={item => item._id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  </View>
);

const viewResultSearch = (isLoading, result, navigation) => {
  if (isLoading) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  if (!result || result.length === 0) {
    return <Text style={styles.noResultText}>No results found</Text>;
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={textStyle.titleSection}>Search Results</Text>
      <FlatList
        data={result}
        renderItem={({item}) => (
          <BookItem
            nav={navigation}
            item={item}
            showAuthor={true}
            isSearch={true}
          />
        )}
        keyExtractor={item => item._id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        style={styles.resultContainer}
      />
    </View>
  );
};

// 5. Component chính
const Search = ({navigation}) => {
  const {userEmail} = useContext(AppContext);

  // State và hooks
  const [search, setSearch] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  // Lấy dữ liệu từ Redux
  const userGenres = useSelector(
    state => state.genreOfUser?.userGenreData?.data,
  );
  console.log(userGenres);
  
  const addToHistoryData = useSelector(
    state => state.addToSearchHistory?.addToHistoryData,
  );
  const searchHistoryData = useSelector(
    state => state.searchHistory?.searchHistoryData,
  );
  const result = useSelector(state => state.bookSearch?.bookSearchData?.data);

  // Xử lý dữ liệu tìm kiếm
  const handleSearch = useCallback(() => {
    setIsLoading(true);
    if (search.trim()) {
      dispatch(getBookSearchAPI(search)).finally(() => setIsLoading(false));
      setHasSearched(true);
    }
  });

  const handleInputChange = text => {
    setSearch(text);
    if (text.trim() === '') {
      setHasSearched(false);
    }
  };

  useEffect(() => {
    dispatch(getSearchHistoryAPI(userEmail));
  }, [addToHistoryData]);

  // 6. Giao diện chính
  return (
    <View style={styles.container}>
      <HeaderBar />
      <View style={styles.mainContainer}>
        <View style={styles.sectionContainer}>
          <Text style={textStyle.heading}>Explore</Text>
          <InputBox
            placeholderText="Search Books or Author..."
            value={search}
            onChange={handleInputChange}
            onSubmit={handleSearch}
          />
        </View>
        {!hasSearched
          ? viewBeforeSearch(userGenres, searchHistoryData, navigation)
          : viewResultSearch(isLoading, result, navigation)}
      </View>
    </View>
  );
};

export default Search;

// 7. Styles
const styles = StyleSheet.create({
  noResultText: {
    textAlign: 'center',
    marginTop: 50,
  },
  resultContainer: {
    minHeight: '100%',
  },
  container: {flex: 1, backgroundColor: 'white'},
  mainContainer: {
    marginVertical: 20,
    gap: 32,
  },
  subContainer: {gap: 32},
  sectionContainer: {
    gap: 16,
    paddingHorizontal: 20,
  },
  topicContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'space-between',
  },
  topicItem: {
    width: topicItemWidth,
    paddingVertical: 12,
    backgroundColor: colors.neutralWhite,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topicIcon: {
    width: 24,
    height: 24,
  },
});
