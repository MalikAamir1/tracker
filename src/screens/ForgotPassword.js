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
  Modal,
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

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const forgotPasswordHandler = async () => {
    if (!email) {
      Alert.alert('Please enter your Email');
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(`${localhostUrl}users/get-reset-link`, {
        method: 'POST', // Specify the request method
        headers: {
          'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (response.status === 200 || response.status === 404) {
        alert(
          'An email for password reset will be dispatched if the account exists.',
        );
        navigation.navigate('LogIn');
      } else {
        // Internal server error, handle as needed
        const errorResponse = await response.text();
        alert(`An error occurred: ${errorResponse}`);
      }
    } catch (error) {
      console.log('ERROR: ForgotPasswordHandler', error);
      alert(
        'An error occurred while sending reset link. Please try again later.',
      );
    } finally {
      setIsLoading(false); // Set loading state to false after operation completes (whether success or failure)
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
        {isLoading && (
          <Modal transparent={true} statusBarTranslucent={true}>
            <View
              style={{
                ...StyleSheet.absoluteFill,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
              }}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={{color: '#fff', marginTop: 10}}>
                Sending link...
              </Text>
            </View>
          </Modal>
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
            Forgot Password
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
            Reset your password
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
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 5,
            marginTop: responsiveHeight(5),
          }}>
          <CustomBtn text={'Send Reset Link'} onPress={forgotPasswordHandler} />
        </View>
      </View>
    </ScrollView>
  );
};
export default ForgotPassword;
