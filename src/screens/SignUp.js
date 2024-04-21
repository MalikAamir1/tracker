/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import CustomInput from '../Components/CustomInput';
import CheckBox from '@react-native-community/checkbox';
import CustomBtn from '../Components/Custombtn';
import {localhostUrl} from '../../Ip';

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState('');
  const [isCheckeduser, setIsCheckedUser] = useState('');
  const [isloading, setIsLoading] = useState(false);

  const registerUser = async () => {
    if (!name || !email || !password) {
      Alert.alert('Please enter your name, email and password');
      return;
    }
    if (!isChecked) {
      Alert.alert('Please agree with Term and Policies');
      return;
    }
    if (!isCheckeduser) {
      Alert.alert('Select either admin or user');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${localhostUrl}users/register-user`, {
        method: 'POST', // Specify the request method
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          textinput: email, // Assuming 'textinput' is used for email in your backend API
          password: password,
          role: isCheckeduser,
        }),
      });
      // Check if the request was successful
      if (!response.ok) {
        const data = await response.json();
        Alert.alert(data.error);
        throw new Error('User Already Exist');
      }

      // Handle success response
      const responseData = await response.json(); //
      Alert.alert('Registered', 'User Registered Successfully');
      navigation.navigate('LogIn'); // Navigate to Login screen
    } catch (error) {
      setIsLoading(false);
      console.error('Error registering user:', error);
    }
  };

  return (
    <ScrollView
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

        {/* Loading Indicator */}
        {isloading && (
          <View
            style={{
              ...StyleSheet.absoluteFill,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
            }}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={{color: '#fff', marginTop: 10}}>Signing Up...</Text>
          </View>
        )}
        <View
          style={{
            //alignItems:'center',
            justifyContent: 'center',
            marginTop: responsiveHeight(12),
            marginLeft: responsiveWidth(5),
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontWeight: '600',
              fontSize: responsiveFontSize(3),
              color: '#CACACA',
            }}>
            Welcome To Tracker
          </Text>
        </View>
        <View
          style={{
            marginTop: responsiveHeight(1),
            marginLeft: responsiveWidth(5),
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              fontWeight: '500',
              color: '#CACACA',
              fontSize: responsiveFontSize(1.8),
            }}>
            Create new account
          </Text>
        </View>
        <View
          style={{
            marginTop: responsiveHeight(4),
            marginLeft: responsiveWidth(3),
          }}>
          <CustomInput
            value={name}
            setValue={setName}
            placeholder="Name"
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
        {/* <Spinner visible={isloading} /> */}
        <View
          style={{
            marginTop: responsiveHeight(3),
            backgroundColor: '#0B1E47',
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'center',
            justifyContent: 'space-around',
            height: responsiveHeight(5),
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: responsiveWidth(50),
              height: responsiveHeight(5),
              marginTop: responsiveHeight(1),
            }}>
            <CheckBox
              tintColors={{true: '#fff', false: '#fff'}}
              boxType="circle"
              value={isCheckeduser === 'admin'}
              onValueChange={() => setIsCheckedUser('admin')}
              style={{marginLeft: responsiveWidth(2), elevation: 5}}
            />
            <Text
              style={{
                color: '#fff',
                marginTop: responsiveHeight(0.5),
                fontSize: responsiveFontSize(1.8),
                fontWeight: '600',
                marginLeft: responsiveWidth(1),
                marginRight: responsiveWidth(-2),
              }}>
              Admin
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: responsiveWidth(50),
              height: responsiveHeight(5),
              marginTop: responsiveHeight(1),
              marginLeft: responsiveWidth(-15),
            }}>
            <CheckBox
              tintColors={{true: '#fff', false: '#fff'}}
              boxType="circle"
              value={isCheckeduser === 'user'}
              onValueChange={() => setIsCheckedUser('user')}
              style={{marginLeft: responsiveWidth(3), elevation: 10}}
            />
            <Text
              style={{
                color: '#fff',
                marginTop: responsiveHeight(0.5),
                fontSize: responsiveFontSize(1.8),
                fontWeight: '600',
                marginLeft: responsiveWidth(1),
                marginRight: responsiveWidth(-2),
              }}>
              User
            </Text>
          </View>
        </View>
        <View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                width: responsiveWidth(100),
                height: responsiveHeight(10),
                marginTop: responsiveHeight(4),
              }}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: responsiveWidth(50),
                    height: responsiveHeight(10),
                    marginTop: responsiveHeight(1),
                    marginLeft: responsiveWidth(2),
                    //backgroundColor:'#4e3'
                  }}>
                  <CheckBox
                    tintColors={{true: '#BFBFBF', false: '#BFBFBF'}}
                    boxType="circle"
                    value={isChecked === 'Agree'}
                    onValueChange={() =>
                      setIsChecked(isChecked === 'Agree' ? '' : 'Agree')
                    }
                    style={{marginLeft: responsiveWidth(4), elevation: 5}}
                  />

                  <View
                    style={{
                      //backgroundColor:'#e34',
                      width: responsiveWidth(63),
                    }}>
                    <Text
                      style={{
                        color: '#FFFFFF',
                        marginTop: responsiveHeight(0.1),
                        fontSize: responsiveFontSize(1.7),
                        fontWeight: '400',
                        marginLeft: responsiveWidth(1),
                        marginRight: responsiveWidth(-2),
                        fontFamily: 'Inter-Regular',
                      }}>
                      By creating an account your agree to our Term and
                      Condtions.
                    </Text>
                    {/* <View
                      style={{
                        marginLeft: responsiveWidth(13),
                        width: responsiveWidth(100),
                        marginTop: responsiveHeight(-2.9),
                      }}>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontSize: responsiveFontSize(1.8),
                          fontWeight: '700',
                          fontFamily: 'Inter-Bold',
                        }}>

                      </Text>
                    </View> */}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View>
          <CustomBtn text={'Sign Up'} onPress={registerUser} />
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
              Have an account?
            </Text>
          </View>
          <View
            style={{
              marginLeft: responsiveWidth(2.5),
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
              <Text
                style={{
                  fontFamily: 'Inter-ExtraBold',
                  fontWeight: '700',
                  fontSize: responsiveFontSize(1.8),
                  color: '#fff',
                }}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default SignUp;
