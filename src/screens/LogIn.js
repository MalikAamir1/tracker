import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CustomInput from '../Components/CustomInput';
import CustomBtn from '../Components/Custombtn';
import {localhostUrl} from '../../Ip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../context/authContext';

const LogIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const {login} = useAuth();
  const [password, setPassword] = useState('');
  const [isloading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const checkUserInStorage = async () => {
  //     try {
  //       const userInfo = await AsyncStorage.getItem('userInfo');
  //       if (userInfo !== null) {
  //         if (userInfo.role === 'admin') {
  //           navigation.navigate('Home');
  //           setIsLoading(false);
  //           setEmail('');
  //           setPassword('');
  //         } else if (userInfo.role === 'user') {
  //           navigation.navigate('ParentHome');
  //           setIsLoading(false);
  //           setEmail('');
  //           setPassword('');
  //         }
  //       }
  //     } catch (error) {
  //       console.log('Error checking user in storage:', error);
  //     }
  //   };

  //   checkUserInStorage();
  // }, []);
  const loginHandler = async () => {
    if (!email || !password) {
      Alert.alert('Please enter your email and password');
      return;
    }
    try {
      setIsLoading(true);

      const response = await fetch(`${localhostUrl}users/login-user`, {
        method: 'POST', // Specify the request method
        headers: {
          'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify({
          textinput: email,
          password: password,
        }),
      });

      if (response.status === 200) {
        // Successfully logged in
        const userInfo = await response.json();

        if (userInfo !== null) {
          // Store user information in AsyncStorage
          AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          if (userInfo.role === 'admin') {
            login({token: userInfo.token, role: 'admin'});

            // navigation.navigate('Home');
            setIsLoading(false);
            setEmail('');
            setPassword('');
          } else if (userInfo.role === 'user') {
            login({token: userInfo.token, role: 'user'});
            // navigation.navigate('ParentHome');
            setIsLoading(false);
            setEmail('');
            setPassword('');
          }
        } else {
          // User not found, handle as needed
          Alert.alert('Wrong email or password');
          setIsLoading(false);
        }
      } else if (response.status === 404) {
        // User not found, handle as needed
        Alert.alert('Wrong email or password');
        setIsLoading(false);
      } else {
        // Internal server error, handle as needed
        const errorResponse = await response.text();
        alert(`An error occurred: ${errorResponse}`);
        setIsLoading(false);
      }
    } catch (error) {
      console.log('ERROR: LoginHandler', error);
      alert('An error occurred while logging in. Please try again later.');
      setIsLoading(false);
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
      }}>
      <View
        style={{
          width: responsiveWidth(100),
          height: responsiveHeight(100),
          backgroundColor: '#0B1E47',
        }}>
        <StatusBar
          backgroundColor="#0B1E47" // Set the background color to purple
          barStyle="light-content" // Set the text color to white
        />
        {isloading && (
          <View
            style={{
              ...StyleSheet.absoluteFill,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
            }}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={{color: '#fff', marginTop: 10}}>Signing In...</Text>
          </View>
        )}

        <View
          style={{
            //alignItems:'center',
            justifyContent: 'center',
            marginTop: responsiveHeight(15),
            marginLeft: responsiveWidth(5),
          }}>
          <Text
            style={{
              fontFamily: 'Inter-SemiBold',
              fontWeight: '600',
              fontSize: responsiveFontSize(3),
              color: '#CACACA',
            }}>
            Welcome Back
          </Text>
        </View>
        <View
          style={{
            marginLeft: responsiveWidth(5),
          }}>
          <Text
            style={{
              fontFamily: 'Inter-Medium',
              fontWeight: '500',
              fontSize: responsiveFontSize(1.6),
              color: '#CACACA',
            }}>
            Hello there, sign in to continue
          </Text>
        </View>
        <View
          style={{
            marginTop: responsiveHeight(4),
            marginLeft: responsiveWidth(3),
          }}>
          <CustomInput
            value={email}
            setValue={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            maxLength={50}
          />
        </View>
        <View
          style={{
            marginTop: responsiveHeight(4),
            marginLeft: responsiveWidth(3),
          }}>
          <CustomInput
            value={password}
            setValue={setPassword}
            placeholder="Password"
            secureTextEntry={true}
            keyboardType="default"
            maxLength={50}
            password={true}
            toggleIconSource={require('../../images/hide.png')} // Specify your toggle icon image source here
          />
        </View>
        <View
          style={{
            marginTop: responsiveHeight(2),
            marginLeft: responsiveWidth(50),
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text
              style={{
                fontFamily: 'Inter-Medium',
                fontWeight: '500',
                fontSize: responsiveFontSize(1.9),
                color: '#CACACA',
              }}>
              Forgot your password ?
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 5,
            marginTop: responsiveHeight(5),
          }}>
          <CustomBtn text={'Sign in'} onPress={loginHandler} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: responsiveHeight(3),
          }}>
          <View style={{}}>
            <Text
              style={{
                fontFamily: 'Inter-Regular',
                fontWeight: '400',
                fontSize: responsiveFontSize(1.8),
                color: '#fff',
              }}>
              Don't have an account?
            </Text>
          </View>
          <View
            style={{
              marginLeft: responsiveWidth(2.5),
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text
                style={{
                  fontFamily: 'Inter-ExtraBold',
                  fontWeight: '700',
                  fontSize: responsiveFontSize(1.8),
                  color: '#fff',
                }}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default LogIn;
