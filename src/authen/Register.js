import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../common/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import FillButton from '../components/FillButton';
import OutlineButton from '../components/OutlineButton';
import textStyle from '../common/customText';
import {useDispatch, useSelector} from 'react-redux';
import {AppContext} from '../AppContext';
import {registerAPI} from '../store/apis/User';

const Register = ({navigation}) => {
  const dispatch = useDispatch();
  const {registerData, fetchRegisterStatus} = useSelector(
    state => state.register,
  );

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [err, setErr] = useState('');

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };
  const onChange = ({type}, selectedDate) => {
    if (type == 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS == 'android') {
        toggleDatePicker();
        setDateOfBirth(
          currentDate.getDate() +
            '-' +
            (currentDate.getMonth() + 1) +
            '-' +
            currentDate.getFullYear(),
        );
      }
    } else {
      toggleDatePicker();
    }
  };

  const confirmIOSDate = () => {
    setDateOfBirth(currentDate.toDateString());
    toggleDatePicker();
  };

  const emailRegex = /^[a-z0-9._%+-]+@gmail.com$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+-]).{8,}$/;

  const onRegister = async () => {
    if (!email || !password || !date) {
      setErr('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    let isValidEmail = emailRegex.test(email);
    if (!isValidEmail) {
      setErr('Email không hợp lệ');
      return;
    }
    let isValidPassword = passwordRegex.test(password);
    if (!isValidPassword) {
      setErr(
        'Mật khẩu phải ít nhất 8 kí tự, gồm số , chữ cái in hoa, chữ cái thường và kí tự đặc biệt!',
      );
      return;
    }

    const body = {
      email: email,
      password: password,
      date_of_birth: dateOfBirth,
    };
    dispatch(registerAPI(body));
  };

  useEffect(() => {
    try {
      if (fetchRegisterStatus == 'succeeded') {
        setLoading(false);
        if (registerData.status == true) {
          Alert.alert('Đăng ký thành công');
          navigation.navigate('Login');
        } else {
          Alert.alert(registerData.msg);
        }
      } else if (fetchRegisterStatus == 'loading') {
        setLoading(true);
      }
    } catch (error) {
      console.log('Lỗi đăng kí >>>>', error);
      Alert.alert('Lỗi: ', error);
    }
  });
  const onCancel = () => {
    navigation.navigate('Login');
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[
        styles.container,
        loading ? {backgroundColor: 'rgba(0, 0, 0, 0.5)'} : '',
      ]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.bodyContainer}>
          <View style={styles.imgContainer}>
            <Image source={require('../../assets/img/logo.png')} />
          </View>
          <View style={styles.mainContainer}>
            <Text style={textStyle.titleAuthen}>Register</Text>
            <TextInput
              style={styles.input}
              placeholder="Emaill"
              placeholderTextColor={'#B8B8C7'}
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={'#B8B8C7'}
              value={password}
              onChangeText={text => setPassword(text)}
            />
            <View>
              {showPicker && (
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  value={date}
                  onChange={onChange}
                  style={styles.datePicker}
                />
              )}
              {showPicker && Platform.OS == 'ios' && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity onPress={toggleDatePicker}>
                    Cancel
                  </TouchableOpacity>
                  <TouchableOpacity onPress={confirmIOSDate}>
                    Confirm
                  </TouchableOpacity>
                </View>
              )}

              {!showPicker && (
                <Pressable onPress={toggleDatePicker}>
                  <TextInput
                    style={styles.input}
                    placeholder="Date of Birth"
                    placeholderTextColor={'#B8B8C7'}
                    value={dateOfBirth}
                    onChangeText={text => setDateOfBirth(text)}
                    editable={false}
                    onPressIn={toggleDatePicker}
                  />
                </Pressable>
              )}
              {!!err && (
                <View style={styles.errContainer}>
                  <Text style={textStyle.errText}>{err}</Text>
                </View>
              )}
            </View>

            <Text style={textStyle.normalText}>
              By signing up, you agree to our{' '}
              <Text style={textStyle.accentText}>Terms</Text>,
              <Text style={textStyle.accentText}> Data Policy</Text> and
              <Text style={textStyle.accentText}> Cookies Policy</Text>.
            </Text>

            <FillButton label={'Register'} handlerButton={onRegister} />
            <OutlineButton label={'Cancel'} handlerButton={onCancel} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loadingView}
        />
      ) : (
        ''
      )}
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  loadingView: {
    position: 'absolute',
    top: '45%',
    left: '45%',
  },
  datePicker: {
    height: 120,
    marginTop: -10,
  },
  mainContainer: {
    marginTop: 24,
    gap: 16,
  },
  imgContainer: {
    alignItems: 'center',
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  errContainer: {
    marginTop: 10,
  },
  input: {
    ...textStyle.inputText,
    width: '100%',
    height: 53,
    backgroundColor: '#F5F5FA',
    borderRadius: 8,
    paddingHorizontal: 24,
  },
});
