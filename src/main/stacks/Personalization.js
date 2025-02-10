import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import FillButton from '../../components/FillButton';
import OutlineButton from '../../components/OutlineButton';
import textStyle from '../../common/customText';
import colors from '../../common/colors';
import {useSelector, useDispatch} from 'react-redux';
import {addTopicsAPI} from '../../store/apis/User';
import {AppContext} from '../../AppContext';
const Personalization = props => {
  const {navigation} = props;

  const dispatch = useDispatch();
  const {listGerneData, fetchListGerneStatus} = useSelector(
    state => state.listGenre,
  );
  const {userEmail} = useContext(AppContext);

  const [selectedItems, setSelectedItems] = useState([]);
  const [count, setCount] = useState(0);

  const handlerSelectItem = id => {
    if (selectedItems.includes(id)) {
      setCount(count - 1);
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setCount(count + 1);
      setSelectedItems([...selectedItems, id]);
    }
  };

  function renderCategories(data) {
    return (
      <View style={styles.cateContainer}>
        {data.map((item, index) => {
          const isSelected = selectedItems.includes(item._id);
          return (
            <TouchableOpacity
              onPress={() => {
                handlerSelectItem(item._id);
              }}
              style={[styles.cateItem, isSelected && styles.cateItemSelected]}
              key={index}>
              <Text
                style={[
                  styles.cateName,
                  isSelected && styles.cateNameSelected,
                ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  const onSubmit = () => {
    const body = {
      email: userEmail,
      genres: selectedItems,
    };
    dispatch(addTopicsAPI(body));
    navigation.navigate('Finish');
  };

  return (
    <ImageBackground
      source={require('../../../assets/img/bg_img.png')}
      style={styles.background}>
      <View style={styles.container}>
        <Text style={textStyle.heading}>Personalize Suggestion</Text>
        <Text style={[textStyle.normalText, styles.desc]}>
          Choose <Text style={textStyle.highLightText}>min 3 topic</Text>min. 3
          topic you like, we will give you more often that relate to it.
        </Text>
        <TextInput
          placeholder="Search Categories"
          placeholderTextColor={colors.neutralGray}
          style={styles.input}
        />
        {fetchListGerneStatus == 'succeeded' ? (
          renderCategories(listGerneData.data)
        ) : (
          <Text style={styles.loading}>Loading....</Text>
        )}
        <View style={[styles.btnStyle, count < 3 && {opacity: 0.5}]}>
          <FillButton
            label={'Submit'}
            handlerButton={onSubmit}
            isDisable={count < 3 ? true : false}
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

export default Personalization;

const styles = StyleSheet.create({
  loading: {
    marginTop: 20,
    textAlign: 'center',
  },
  cateItemSelected: {
    backgroundColor: colors.primary,
  },
  cateNameSelected: {
    color: '#fff',
  },
  cateName: {
    ...textStyle.primaryText,
  },
  cateItem: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 24,
    borderColor: colors.primary,
  },
  cateContainer: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  input: {
    width: '100%',
    height: 53,
    backgroundColor: colors.neutralWhite,
    borderRadius: 8,
    paddingHorizontal: 24,
  },
  desc: {
    marginBottom: 40,
    marginTop: 12,
  },
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'center',
  },
  btnStyle: {
    marginTop: 72,
    marginBottom: 16,
  },
});
