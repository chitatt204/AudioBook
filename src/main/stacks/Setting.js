import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import HeaderComponent from '../../components/HeaderComponent';
import colors from '../../common/colors';
import textStyle from '../../common/customText';
import {getUserInfAPI} from '../../store/apis/User';
import {AppContext} from '../../AppContext';

const {width} = Dimensions.get('window');
const avtSize = width * 0.192;

const Setting = ({navigation}) => {
  const {userEmail, setIsLogin} = useContext(AppContext);

  const dispatch = useDispatch();

  const handleViewProfile = () => {
    navigation.navigate('Profile');
    dispatch(getUserInfAPI(userEmail));
  };
  const {userData, fetchUserStatus} = useSelector(state => state.userInf);
  // useEffect(() => {
  //   console.log(userData, fetchUserStatus);
  // }, [fetchUserStatus]);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <HeaderComponent title={'Settings'} />
        <TouchableOpacity style={styles.row}>
          <Image
            source={require('../../../assets/img/avt.jpg')}
            style={styles.avt}
          />
          <View>
            <Text style={styles.name}>Jone Doe</Text>
            <TouchableOpacity
              onPress={handleViewProfile}
              style={styles.linkContainer}>
              <Text style={styles.linkText}>View profile</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContainer}>
        <View>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.tagText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.tagText}>Data and Storages</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.tagText}>Subscription</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.tagText}>Linked Account</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.tagText}>About Audibooks</Text>
          </TouchableOpacity>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => {
                setIsLogin(false);
              }}>
              <Text style={styles.btnLabel}>Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutralWhite,
    gap: 28,
  },
  bodyContainer: {
    gap: 28,
  },
  headerContainer: {
    backgroundColor: 'white',
    gap: 12,
  },
  footerContainer: {
    // flex: 1,
    backgroundColor: 'white',
  },
  row: {
    backgroundColor: 'white',
    paddingHorizontal: 32,
    flexDirection: 'row',
    gap: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.neutralWhite,
    paddingVertical: 16,
    alignItems: 'center',
  },
  tagText: {
    ...textStyle.normalText,
  },
  footer: {
    padding: 28,
    height: '100%',
  },
  btnLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.accent,
    lineHeight: 24,
    paddingVertical: 16,
  },
  btnContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.neutralBlue,
    lineHeight: 24,
  },
  linkContainer: {
    marginTop: 4,
  },
  linkText: {
    ...textStyle.primarySubText,
  },
  avt: {
    width: avtSize,
    height: avtSize,
    borderRadius: avtSize / 2,
  },
});
