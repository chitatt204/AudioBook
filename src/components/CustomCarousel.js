import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  Animated,
} from 'react-native';
import {Rating} from '@kolking/react-native-rating';
import colors from '../common/colors';

const {width} = Dimensions.get('window');
const avtSize = width * 0.128;

const CustomCarousel = ({listReview}) => {
  const scrollX = useRef(new Animated.Value(0)).current; // Giá trị để theo dõi vị trí trượt
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll logic
  useEffect(() => {
    const intervalId = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if ((nextIndex = listReview.length - 1)) {
        clearInterval(intervalId);
      }
      flatListRef.current.scrollToIndex({index: nextIndex, animated: true});
      setCurrentIndex(nextIndex);
    }, 3000);

    // Clear interval khi component bị unmount
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.userRow}>
          {!!item?.userId?.avt ? (
            <Image source={{uri: item?.userId?.avt}} style={styles.avtImg} />
          ) : (
            <Image
              source={require('../../assets/img/avt.jpg')}
              style={styles.avtImg}
            />
          )}
          <View style={styles.infBox}>
            <Text style={styles.name}>{item?.userId?.email}</Text>
            <Rating size={16} rating={item?.rating} />
          </View>
        </View>
        <View>
          <Text style={styles.desc} numberOfLines={3}>
            {item.comment}
          </Text>
        </View>
      </View>
    );
  };

  const renderDots = () => {
    return (
      <View style={styles.dotContainer}>
        {listReview?.map((_, index) => {
          return (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    currentIndex === index ? '#4838D1' : '#D5D5E3',
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={listReview}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item._id}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false, listener: handleScroll},
        )}
      />
      {renderDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  desc: {
    width: 250,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 21,
    color: colors.neutral60,
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 21,
    color: colors.neutralBlue,
  },
  infBox: {
    gap: 4,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },

  itemContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 16,
    gap: 16,
    marginLeft: 20,
    elevation: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  avtImg: {
    width: avtSize,
    height: avtSize,
    borderRadius: 8,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default CustomCarousel;
