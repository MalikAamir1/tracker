/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import CustomBtn, {
  Button,
  ButtonViewAllTeam,
  CustomButton,
} from '../../Components/Custombtn';
import {Input, PopInput} from '../../Components/CustomInput';
import BottomTabNavigation from '../../Navigation/BottomTabNavigation';
import ParentBottomTabNav from '../../Navigation/ParentBottomNav';

const JoinTeam = ({navigation}) => {
  const [teamname, setTeamName] = useState('');
  const [sporttyp, setSportType] = useState('');
  const [code, setCode] = useState('');

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
            justifyContent: 'center',
            marginTop: responsiveHeight(5),
            marginLeft: responsiveWidth(5),
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Inter-SemiBold',
              fontWeight: '600',
              fontSize: responsiveFontSize(3.5),
              color: '#FFFFFF',
            }}>
            Join Team
          </Text>
        </View>
        <View
          style={{
            marginLeft: responsiveWidth(5),
            marginTop: responsiveHeight(2),
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Inter-Regular',
              fontWeight: '400',
              fontSize: responsiveFontSize(2),
              color: '#FFFFFF',
            }}>
            Lorem Ipsum is simply dummy text
          </Text>
        </View>
      </View>
      <View
        style={{
          width: responsiveWidth(100),
          height: responsiveHeight(80),
          borderTopLeftRadius: responsiveWidth(5),
          borderTopRightRadius: responsiveWidth(5),
          marginTop: responsiveHeight(-10),
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: responsiveHeight(1),
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../../../images/layer.png')}
              style={{
                resizeMode: 'contain',
                width: responsiveWidth(40),
              }}
            />
          </View>
          <View
            style={{
              marginTop: responsiveHeight(-7),
            }}>
            <Text
              style={{
                fontFamily: 'Inter-Regular',
                fontWeight: '400',
                color: '#000000',
                fontSize: responsiveFontSize(2.5),
              }}>
              You don't have any team
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: 'transparent',
            marginTop: responsiveHeight(5),
          }}>
          <CustomButton
            text={'Join Team'}
            onPress={() => navigation.navigate('TeamJoin')}
          />
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#4e3',
          marginTop: responsiveHeight(-13),
        }}>
        <ParentBottomTabNav />
      </View>
    </View>
  );
};
export default JoinTeam;
const styles = StyleSheet.create({
  teamContainer: {
    width: responsiveWidth(90),
    height: responsiveHeight(10),
    marginLeft: responsiveWidth(5),
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
    marginTop: responsiveHeight(-1),
  },
  teamName: {
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
    color: '#0B1E47',
    fontFamily: 'Poppins-Bold',
    marginTop: responsiveHeight(2),
  },
});
