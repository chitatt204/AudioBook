import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import HeaderComponent from '../../components/HeaderComponent';
import colors from '../../common/colors';
import textStyle from '../../common/customText';
import {updateUserInfAPI} from '../../store/apis/User';

const {width} = Dimensions.get('window');
const avtSize = width * 0.4267;

const Profile = () => {
  const {userData, fetchUserStatus} = useSelector(state => state.userInf);
  const userInf = userData?.data;
  const {updateUserData, fetchUpdateUserStatus} = useSelector(
    state => state.updateUserInf,
  );

  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState(userInf?.displayName);
  const [name, setName] = useState(userInf?.name);
  const [phone, setPhone] = useState(userInf?.phone);
  const [dayBirth, setDayBirth] = useState(userInf?.birthDay);
  const [loading, setLoading] = useState(false);
  const vnPhoneNumberRegex = /^((09|03|07|08|05)+([0-9]{8})\b)/g;
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/;
  const [isHandle, setIsHandle] = useState(false);

  const handleSaveChange = () => {
    setIsHandle(true);
    const isCheckPhone = vnPhoneNumberRegex.test(phone);
    const isCheckDate = dateRegex.test(dayBirth);
    if (isCheckPhone && isCheckDate) {
      const data = {
        email: userInf.email,
        displayName: displayName,
        name: name,
        phone: phone,
        dayBirth: dayBirth,
      };
      dispatch(updateUserInfAPI(data));
    } else {
      Alert.alert('Số điện thoại hoặc định dạng ngày không hợp lệ!');
    }
  };

  useEffect(() => {
    try {
      if (isHandle) {
        if (fetchUpdateUserStatus == 'succeeded') {
          if (updateUserData?.status == true) {
            setIsHandle(false);
            setLoading(false);
            Alert.alert('Cập nhật thành công');
          } else {
            setIsHandle(false);
            setLoading(false);
            Alert.alert('Cập nhật thất bại');
          }
        } else if (fetchUpdateUserStatus == 'loading') {
          setLoading(true);
        }
      }
    } catch (error) {
      console.log('Lỗi cập nhật thông tin >>>>', error);
      Alert.alert('Lỗi: ', error);
      setLoading(false);
    }
  }, [fetchUpdateUserStatus, isHandle]);
  return (
    <View style={styles.container}>
      <HeaderComponent
        title={'Profile'}
        isSave={true}
        handlerSave={() => handleSaveChange()}
      />
      {fetchUserStatus == 'succeeded' && (
        <View style={styles.mainContainer}>
          <View style={styles.avtContainer}>
            <Image source={{uri: userInf?.avt}} style={styles.avt} />
            <Image
              source={require('../../../assets/img/ic_edit.png')}
              style={styles.editBtn}
            />
          </View>
          <View style={styles.bodyContainer}>
            <View style={styles.row}>
              <Text style={styles.titleText}>Display name</Text>
              <TextInput
                placeholder="Display name"
                placeholderTextColor={colors.neutralGray}
                value={displayName}
                style={styles.contentText}
                onChangeText={text => setDisplayName(text)}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.titleText}>Username</Text>
              <TextInput
                placeholder="Username"
                placeholderTextColor={colors.neutralGray}
                value={name}
                style={styles.contentText}
                onChangeText={text => setName(text)}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.titleText}>Email</Text>
              <Text style={styles.contentText}>{userInf?.email}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.titleText}>Phone</Text>
              <TextInput
                placeholder="Phone"
                placeholderTextColor={colors.neutralGray}
                value={phone}
                style={styles.contentText}
                onChangeText={text => setPhone(text)}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.titleText}>Date birth</Text>
              <TextInput
                placeholder="dd-mm-yy"
                placeholderTextColor={colors.neutralGray}
                value={dayBirth}
                style={styles.contentText}
                onChangeText={text => setDayBirth(text)}
              />
            </View>
          </View>
        </View>
      )}
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
  );
};

export default Profile;

const styles = StyleSheet.create({
  loadingView: {
    position: 'absolute',
    top: '45%',
    left: '45%',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    paddingTop: 32,
    marginTop: 12,
    borderTopWidth: 1,
    borderColor: colors.neutralWhite,
  },
  avtContainer: {
    margin: 'auto',
    width: avtSize,
    height: avtSize,
  },
  avt: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  editBtn: {
    width: 30,
    height: 30,
    position: 'absolute',
    bottom: -10,
    right: -12,
  },
  bodyContainer: {
    marginTop: 56,
    borderTopWidth: 1,
    borderColor: colors.neutralWhite,
  },
  row: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderBottomWidth: 1,
    borderColor: colors.neutralWhite,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 28,
  },
  titleText: {
    ...textStyle.inputText,
    width: 120,
  },
  contentText: {
    ...textStyle.normalText,
    width: '100%',
  },
});
