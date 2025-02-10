import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import colors from '../common/colors';
import textStyle from '../common/customText';
import FillButton from '../components/FillButton';
import {useDispatch, useSelector} from 'react-redux';
import {AppContext} from '../AppContext';
import {getAllGenreAPI, getUserGenresAPI} from '../store/apis/Genre';
import {loginAPI} from '../store/apis/User';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '729662327890-q0bhcg4ciclqng9hd1k7g0h35tc4ugik.apps.googleusercontent.com',
});
const {width, height} = Dimensions.get('window');
const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const {loginData, fetchLoginStatus} = useSelector(state => state.login);

  const {setIsLogin} = useContext(AppContext);
  const {setUserEmail} = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const onLogin = async () => {
    if (!email || !password) {
      Alert.alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    const body = {
      email: email,
      password: password,
    };
    dispatch(loginAPI(body));
  };
  useEffect(() => {
    try {
      if (fetchLoginStatus == 'succeeded') {
        setLoading(false);
        if (loginData?.status == true) {
          setUserEmail(email);
          dispatch(getUserGenresAPI(email));
          dispatch(getAllGenreAPI());
          setIsLogin(true);
          Alert.alert('Đăng nhập thành công');

          // setUser(response.user);
        } else {
          Alert.alert(loginData.msg);
        }
      } else if (fetchLoginStatus == 'loading') {
        setLoading(true);
      }
    } catch (error) {
      console.log('Lỗi đăng nhập >>>>', error);
      Alert.alert('Lỗi: ', error);
    }
  }, [fetchLoginStatus]);

  async function onGoogleButtonPress() {
    try {
      // Kiểm tra dịch vụ Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      // Lấy kết quả đăng nhập Google
      const signInResult = await GoogleSignin.signIn();
      console.log('Google Sign-In Result:', signInResult);

      // Kiểm tra idToken trong kết quả
      const idToken = signInResult.data.idToken;
      if (!idToken) {
        throw new Error('Không thể lấy được ID token từ Google Sign-In.');
      }

      // Tạo Google credential từ idToken
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Đăng nhập Firebase với credential
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      console.log('Google Sign-In thành công:', userCredential);

      // Đặt trạng thái đăng nhập thành công
      setIsLogin(true);
      Alert.alert('Đăng nhập thành công với Google!');
    } catch (error) {
      // Xử lý lỗi
      console.error('Lỗi khi đăng nhập với Google:', error.message);
      Alert.alert('Đăng nhập thất bại:', error.message);
    }
  }

  const goToRegister = () => {
    navigation.navigate('Register');
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
            <Text style={textStyle.titleAuthen}>Login to Your Account</Text>
            <TextInput
              style={styles.input}
              placeholder="Emaill"
              placeholderTextColor={'#B8B8C7'}
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <View>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={'#B8B8C7'}
                value={password}
                onChangeText={text => setPassword(text)}
              />

              {!!err && (
                <View style={styles.errContainer}>
                  <Text style={styles.err}>{err}</Text>
                </View>
              )}
            </View>

            <View style={styles.rememberContainer}>
              <TouchableOpacity
                style={styles.checkBox}
                onPress={() => setIsChecked(!isChecked)}>
                <Image source={require('../../assets/img/square.png')} />
                {isChecked ? (
                  <Image
                    source={require('../../assets/img/ic_check.png')}
                    style={styles.checkIcon}
                  />
                ) : (
                  ''
                )}
              </TouchableOpacity>

              <Text style={textStyle.normalText}>Remember me</Text>
            </View>

            <FillButton label={'Login'} handlerButton={onLogin} />
            <View style={styles.forgotPwContainer}>
              <Text style={styles.highLightText}>Forget Password ?</Text>
            </View>
          </View>

          <View style={styles.footerContainer}>
            <Text style={styles.normalText}>Or login with</Text>
            <View style={styles.mediaContainer}>
              <TouchableOpacity
                style={styles.mediaItem}
                onPress={() =>
                  onGoogleButtonPress().then(() => {
                    console.log('Signed in with Google!'), setIsLogin(true);
                  })
                }>
                <Image source={require('../../assets/img/gg.png')} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.mediaItem}>
                <Image source={require('../../assets/img/fb.png')} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.mediaItem}>
                <Image source={require('../../assets/img/twitter.png')} />
              </TouchableOpacity>
            </View>
            {/* call to action */}
            <View style={styles.ctaContainer}>
              <Text style={styles.normalText}>Don’t have an accoun’t ?</Text>
              <TouchableOpacity onPress={goToRegister}>
                <Text style={styles.highLightText}>Register</Text>
              </TouchableOpacity>
            </View>
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

export default Login;

const styles = StyleSheet.create({
  loadingView: {
    position: 'absolute',
    top: '45%',
    left: '45%',
  },
  container: {
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  mainContainer: {
    marginTop: 24,
    gap: 16,
  },
  footerContainer: {
    marginTop: 32,
    gap: 20,
    alignItems: 'center',
  },
  forgotPwContainer: {
    alignSelf: 'flex-end',
  },
  ctaContainer: {
    marginTop: 4,
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  normalText: {
    ...textStyle.normalText,
  },
  highLightText: {
    ...textStyle.accentText,
  },
  mediaItem: {
    width: width * 0.232,
    height: height * 0.069,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.primary,
  },
  mediaContainer: {
    minWidth: '100%',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rememberContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  err: {
    ...textStyle.errText,
  },
  errContainer: {
    marginTop: 10,
  },

  imgContainer: {
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: 24,
  },

  input: {
    ...textStyle.inputText,
    minWidth: '100%',
    height: 53,
    backgroundColor: '#F5F5FA',
    borderRadius: 8,
    paddingHorizontal: 24,
  },
});
