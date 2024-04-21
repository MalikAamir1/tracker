import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
const CustomBtn = ({text, onPress}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        marginTop: responsiveHeight(5),
      }}>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            width: responsiveWidth(90),
            height: responsiveHeight(6),
            backgroundColor: '#fff',
            borderRadius: responsiveWidth(4),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Inter-Medium',
              fontWeight: '500',
              color: '#0B1E47',
              fontSize: responsiveFontSize(1.8),
            }}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default CustomBtn;
export const CustomButton = ({text, onPress}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        marginTop: responsiveHeight(-1),
        backgroundColor: 'transparent',
        width: responsiveWidth(70),
        marginLeft: responsiveWidth(15),
      }}>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            width: responsiveWidth(70),
            height: responsiveHeight(7),
            backgroundColor: '#0B1E47',
            borderRadius: responsiveWidth(2),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Inter-Regular',
              fontWeight: '400',
              color: '#fff',
              fontSize: responsiveFontSize(1.9),
            }}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export const ButtonViewAllTeam = ({text, onPress}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        marginTop: responsiveHeight(5),
        backgroundColor: '#fff',
        borderRadius: responsiveWidth(2),
        width: responsiveWidth(70),
        marginLeft: responsiveWidth(15),
      }}>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            width: responsiveWidth(70),
            height: responsiveHeight(7),
            backgroundColor: '#fff',
            borderRadius: responsiveWidth(2),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Inter-Regular',
              fontWeight: '400',
              color: '#0B1E47',
              fontSize: responsiveFontSize(1.9),
            }}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export const Button = ({text, onPress}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        marginTop: responsiveHeight(-1),
        backgroundColor: 'transparent',
        width: responsiveWidth(70),
        marginLeft: responsiveWidth(15),
      }}>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            width: responsiveWidth(90),
            height: responsiveHeight(7),
            backgroundColor: '#0B1E47',
            borderRadius: responsiveWidth(1),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Inter-Regular',
              fontWeight: '400',
              color: '#fff',
              fontSize: responsiveFontSize(2.3),
            }}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export const CancelButton = ({text, onPress}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        marginTop: responsiveHeight(-1),
        backgroundColor: 'transparent',
        width: responsiveWidth(70),
        marginLeft: responsiveWidth(15),
      }}>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            width: responsiveWidth(90),
            height: responsiveHeight(7),
            backgroundColor: '#F1F6FF',
            borderRadius: responsiveWidth(1),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Inter-Regular',
              fontWeight: '400',
              color: '#000000',
              fontSize: responsiveFontSize(1.5),
            }}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
