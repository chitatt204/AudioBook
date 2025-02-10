import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import HeaderBar from '../../components/HeaderBar';
import InputBox from '../../components/InputBox';
import colors from '../../common/colors';
import textStyle from '../../common/customText';
import {getBooksByGenreIdAPI} from '../../store/apis/Book';
import {searchGenresAPI} from '../../store/apis/Genre';

const {width} = Dimensions.get('window');
const topicItemWidth = (width - 60) / 2;

const AllGenre = props => {
  const {navigation, route} = props;
  const genreList = props.route?.params?.data;

  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [search, setSearch] = useState('');
  const [genreIdSelected, setGenreIdSelected] = useState('');
  const [genreNameSelected, setGenreNameSelected] = useState('');
  const [isNavigate, setIsNavigate] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const dispatch = useDispatch();

  const {bookOfGenreData, fetchBookOfGenreStatus} = useSelector(
    state => state.bookOfGenre,
  );
  const result = useSelector(state => state.searchGenre.searchGenreData?.data);

  const handlerSearch = () => {
    setLoading(true);
    if (search.trim()) {
      dispatch(searchGenresAPI(search)).finally(() => setLoading(false));
      setHasSearched(true);
    }
  };

  const handleInputChange = text => {
    setSearch(text);

    if (text.trim() === '') {
      setHasSearched(false);
    }
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
  }, [fetchBookOfGenreStatus, genreIdSelected]);

  const renderGenres = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.topicItem}
        key={item._id}
        onPress={() => {
          dispatch(getBooksByGenreIdAPI(item._id));
          setGenreIdSelected(item._id);
          setGenreNameSelected(item.name);
          setIsNavigate(true);
        }}>
        {item.icon && (
          <Image source={{uri: item.icon}} style={styles.topicIcon} />
        )}
        <Text style={textStyle.largerText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  const renderBeforeSearch = () => {
    return (
      <View style={styles.bodyContainer}>
        <Text style={styles.heading}>Categories</Text>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <FlatList
            data={genreList}
            renderItem={renderGenres}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={styles.row}
            style={styles.flastlistContainer}
          />
        )}
      </View>
    );
  };

  const renderSearchResults = () => {
    if (loading) {
      return <ActivityIndicator size="large" color={colors.primary} />;
    }

    if (!result || result.length === 0) {
      return (
        <View style={styles.noResultContainer}>
          <Text style={styles.heading}>Categories</Text>
          <Text style={styles.noResultText}>No results found</Text>
        </View>
      );
    }

    return (
      <View style={styles.bodyContainer}>
        <Text style={styles.heading}>Search Result</Text>
        <FlatList
          data={result}
          renderItem={renderGenres}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={styles.row}
          style={styles.flastlistContainer}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderBar />
      <View style={styles.mainContainer}>
        <InputBox
          placeholderText="Search genres of book..."
          value={search}
          onChange={text => handleInputChange(text)}
          onSubmit={handlerSearch}
        />
        {!hasSearched ? renderBeforeSearch() : renderSearchResults()}
      </View>
      <View style={styles.goBackContainer}>
        <TouchableOpacity
          onPressIn={() => setIsHover(true)}
          onPressOut={() => setIsHover(false)}
          onPress={() => navigation.navigate('Home')}
          style={[
            styles.goBackBtn,
            isHover && {
              borderColor: colors.primary,
              backgroundColor: colors.primary,
            },
          ]}>
          <Image
            source={require('../../../assets/img/ic_arrow-left.png')}
            style={isHover ? styles.icBack : styles.icBackHover}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AllGenre;

const styles = StyleSheet.create({
  icBack: {width: 30, height: 30},
  icBackHover: {width: 35, height: 35},
  goBackContainer: {
    alignItems: 'center',
  },
  goBackBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.neutralWhite,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.neutralGray,
  },
  noResultContainer: {
    marginTop: 50,
    gap: 20,
  },
  noResultText: {
    textAlign: 'center',
  },
  heading: {
    ...textStyle.titleSection,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    margin: 20,
  },
  bodyContainer: {
    marginTop: 30,
  },
  flastlistContainer: {
    marginTop: 20,
  },
  row: {
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
    marginBottom: 20,
  },
  topicIcon: {
    width: 24,
    height: 24,
  },
});
