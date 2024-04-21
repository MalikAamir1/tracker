/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import BottomTabNavigation from '../../Navigation/BottomTabNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../../context/authContext';
const Setting = ({navigation}) => {
  const {logout} = useAuth();

  const clearUserInfo = async () => {
    try {
      // Clear the 'userInfo' key
      await AsyncStorage.removeItem('userInfo');
      //   navigation.navigate('LogIn');
      logout();
    } catch (error) {
      console.error('Error clearing user info:', error);
    }
  };
  return (
    <View
      style={{
        width: responsiveWidth(100),
        height: responsiveHeight(100),
        backgroundColor: '#fff',
      }}>
      <StatusBar
        backgroundColor="#0B1E47" // Set the background color to purple
        barStyle="light-content" // Set the text color to white
      />

      <View
        style={{
          backgroundColor: '#0B1E47',
          width: responsiveWidth(100),
          height: responsiveHeight(35),
        }}>
        <View
          style={{
            marginLeft: responsiveWidth(5),
            // marginTop:responsiveHeight(2),
            marginLeft: responsiveWidth(38),
            marginTop: responsiveHeight(5),
          }}>
          <Text
            style={{
              fontFamily: 'Inter-Bold',
              fontWeight: '700',
              fontSize: responsiveFontSize(3),
              color: '#FFFFFF',
            }}>
            Setting
          </Text>
        </View>
        <View
          style={{
            marginLeft: responsiveWidth(23),
            marginTop: responsiveHeight(2),
            alignItems: 'center',
            justifyContent: 'center',
            width: responsiveWidth(55),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Inter-Regular',
              fontWeight: '400',
              fontSize: responsiveFontSize(2),
              color: '#FFFFFF',
              textAlign: 'center',
            }}>
            Lorem Ipsum is simply dummy text
          </Text>
        </View>
      </View>
      <View
        style={{
          width: responsiveWidth(100),
          height: responsiveHeight(65),
          borderTopLeftRadius: responsiveWidth(5),
          borderTopRightRadius: responsiveWidth(5),
          marginTop: responsiveHeight(-12),
          backgroundColor: '#fff',
        }}>
        <View>
          <View>
            <TouchableOpacity>
              <View
                style={{
                  marginLeft: responsiveWidth(5),
                  marginTop: responsiveHeight(8),
                }}>
                <Text
                  style={{
                    fontFamily: 'Mulish-Medium',
                    fontWeight: '500',
                    color: '#1E1E1E',
                    fontSize: responsiveFontSize(1.8),
                  }}>
                  Profile
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <View
                style={{
                  marginLeft: responsiveWidth(5),
                  marginTop: responsiveHeight(3),
                }}>
                <Text
                  style={{
                    fontFamily: 'Mulish-Medium',
                    fontWeight: '500',
                    color: '#1E1E1E',
                    fontSize: responsiveFontSize(1.8),
                  }}>
                  About
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <View
                style={{
                  marginLeft: responsiveWidth(5),
                  marginTop: responsiveHeight(3),
                }}>
                <Text
                  style={{
                    fontFamily: 'Mulish-Medium',
                    fontWeight: '500',
                    color: '#1E1E1E',
                    fontSize: responsiveFontSize(1.8),
                  }}>
                  Terms and Privacy
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={clearUserInfo}>
              <View
                style={{
                  marginLeft: responsiveWidth(5),
                  marginTop: responsiveHeight(3),
                }}>
                <Text
                  style={{
                    fontFamily: 'Mulish-Medium',
                    fontWeight: '500',
                    color: '#1E1E1E',
                    fontSize: responsiveFontSize(1.8),
                  }}>
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{marginTop: responsiveHeight(4)}}>
        <BottomTabNavigation />
      </View>
    </View>
  );
};
export default Setting;
