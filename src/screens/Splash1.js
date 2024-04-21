import React, {useEffect} from 'react';
import {View, Text, StatusBar, ImageBackground, Image} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Splash1 = ({navigation}) => {
  useEffect(() => {
    navigation.navigate('LogIn');
  }, []);

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
export default Splash1;
