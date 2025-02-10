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
import React, {useState, useEffect, useContext, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import HeaderBar from '../../components/HeaderBar';
import InputBox from '../../components/InputBox';
import textStyle from '../../common/customText';
import colors from '../../common/colors';
import {
  getBookSearchAPI,
  getSavedBookAPI,
  searchSavedBooksAPI,
} from '../../store/apis/Book';
import {AppContext} from '../../AppContext';
import BookItem from '../../components/BookItem';

const Library = ({navigation}) => {
  const {userEmail} = useContext(AppContext);

  const [search, setSearch] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const savedBookData = useSelector(
    state => state.savedBook?.savedBookData?.data,
  );
  const savedBookChangeData = useSelector(
    state => state.toggleSavedBook.savedBookChangeData?.data,
  );
  const result = useSelector(
    state => state.savedBookSearch.savedBookSearchData?.data,
  );

  useEffect(() => {
    dispatch(getSavedBookAPI(userEmail));
  }, [savedBookChangeData, userEmail]);

  const handlerSearch = useCallback(() => {
    setIsLoading(true);
    if (search.trim()) {
      dispatch(
        searchSavedBooksAPI({savedBookList: savedBookData, subString: search}),
      ).finally(() => setIsLoading(false));
      setHasSearched(true);
    }
  });

  const handleInputChange = text => {
    setSearch(text);
    if (text.trim() === '') {
      setHasSearched(false);
    }
  };
  const renderBeforeSearch = () => {
    if (savedBookData?.length == 0) {
      return <Text style={styles.noResultText}>Library is empty!</Text>;
    }
    return (
      <FlatList
        data={savedBookData}
        renderItem={({item}) => (
          <BookItem
            nav={navigation}
            item={item}
            showAuthor={true}
            isHorizontal={true}
          />
        )}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        style={styles.flatlistContainer}
      />
    );
  };

  const renderSearchResults = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color={colors.primary} />;
    }

    if (!result || result.length === 0) {
      return <Text style={styles.noResultText}>No results found</Text>;
    }

    return (
      <FlatList
        data={result}
        renderItem={({item}) => (
          <BookItem
            nav={navigation}
            item={item}
            showAuthor={true}
            isHorizontal={true}
          />
        )}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
      />
    );
  };

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
            onSubmit={handlerSearch}
          />
        </View>
        <View style={styles.bodyContainer}>
          {!hasSearched ? renderBeforeSearch() : renderSearchResults()}
        </View>
      </View>
    </View>
  );
};

export default Library;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  mainContainer: {margin: 20},
  sectionContainer: {gap: 16},
  bodyContainer: {marginTop: 16, marginBottom: 50},
  noResultText: {
    textAlign: 'center',
    marginTop: 50,
    color: colors.gray,
    fontSize: 16,
  },
});
