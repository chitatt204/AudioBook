import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import HeaderComponent from '../../components/HeaderComponent';
import BookItem from '../../components/BookItem';

const SectionMore = props => {
  const {navigation, route} = props;
  const data = props.route?.params?.data;
  const type = props.route?.params?.type;
useEffect(()=>{
  console.log(data);
  
},[])
  return (
    <View style={styles.container}>
      <HeaderComponent title={type} />
      <FlatList
        data={data}
        renderItem={({item}) => (
          <BookItem nav={navigation} item={item} showAuthor={true} />
        )}
        keyExtractor={item => item._id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        style={styles.bodyContainer}
      />
    </View>
  );
};

export default SectionMore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bodyContainer: {
    padding: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
});
