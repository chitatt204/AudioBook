import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useCallback} from 'react';
import {Rating} from '@kolking/react-native-rating';
const Star = () => {
  const [starRating, setStarRating] = useState(0);

  const handleChange = useCallback(
    value => setStarRating(Math.round((starRating + value) * 5) / 10),
    [starRating],
  );
  return (
    <View style={styles.root}>
      <Rating size={30} rating={starRating} onChange={handleChange} />
      <Text style={styles.text}>Rated {starRating} out of 5</Text>
    </View>
  );
};

export default Star;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 17,
    marginTop: 20,
  },
});
