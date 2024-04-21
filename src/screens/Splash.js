import React, {useEffect} from 'react';
import {View, Text, StatusBar, ImageBackground, Image} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Splash = ({navigation}) => {
  useEffect(() => {
    // const timeout = setTimeout(() => {
    //     navigation.replace('LogIn');
    // }, 2000); // 2 seconds

    checkUserInStorage();

    // return () => clearTimeout(timeout); // Cleanup function to clear timeout
  }, [navigation]);
  const checkUserInStorage = async () => {
    try {
      const userInfo = await AsyncStorage.getItem('userInfo');

      if (userInfo !== null) {
        // Parse the stored user information (assuming it's in JSON format)
        const user = JSON.parse(userInfo);
        if (user && user.role === 'admin') {
          // User has customerinfo.S_Id, navigate to HomeSeller
          navigation.navigate('Home');
        }
        if (user && user.role === 'user') {
          // User has customerinfo.S_Id, navigate to HomeSeller
          navigation.navigate('ParentHome');
        }
      } else {
        // No user information, navigate to the SignIn screen
        navigation.navigate('LogIn');
      }
    } catch (error) {
      console.log('Error checking user in storage:', error);
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
      <ImageBackground
        source={require('../../images/background.png')}
        resizeMode="cover"
        style={{
          width: responsiveWidth(100),
          height: responsiveHeight(100),
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: responsiveHeight(15),
          }}>
          <Image
            source={require('../../images/splashicon.png')}
            style={{
              resizeMode: 'contain',
              width: responsiveWidth(80),
              height: responsiveHeight(60),
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
};
export default Splash;
