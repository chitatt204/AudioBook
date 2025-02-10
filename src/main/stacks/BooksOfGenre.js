import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const BooksOfGenre = props => {
  const {navigation, route} = props;
  const data = props.route?.params?.data;
  const genre = props.route?.params?.genre;

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

export default BooksOfGenre;

const styles = StyleSheet.create({});
