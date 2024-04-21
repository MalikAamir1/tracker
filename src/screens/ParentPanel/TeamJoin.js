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
  Alert,
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
import JoinTeam from './JoinTeam';
import {useAuth} from '../../context/authContext';
import {localhostUrl} from '../../../Ip';

const TeamJoin = ({navigation}) => {
  const [code, setCode] = useState('');
  const {user} = useAuth();

  const JoinTeamHandler = () => {
    // Define the endpoint
    const endpoint = `${localhostUrl}player/team/${code}/join`;

    // Define the fetch options
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Assuming you have a token for authentication, replace 'your_token_here' with the actual token
        Authorization: `Bearer ${user.token}`,
      },
      // If you need to send data in the request body, you can include it here
      // body: JSON.stringify({}),
    };

    // Send the fetch request
    fetch(endpoint, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to join team');
        }
        return response.json();
      })
      .then(data => {
        console.log('Joined team successfully:', data);
        // Handle success response
        Alert.alert('Team joined successfully');
        navigation.navigate('ParentHome');
      })
      .catch(error => {
        Alert.alert('Sorry, Team cant be joined');
        console.error('Error joining team:', error.message);
        // Handle error
      });
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
            //width:responsiveWidth(20)
          }}>
          <Text
            style={{
              fontFamily: 'Inter-Regular',
              fontWeight: '400',
              fontSize: responsiveFontSize(2),
              color: '#FFFFFF',
              textAlign: 'justify',
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
            marginTop: responsiveHeight(8),
            marginLeft: responsiveWidth(5),
          }}>
          <View>
            <Text
              style={{
                fontFamily: 'Inter-Regular',
                fontWeight: '400',
                color: '#000000',
                fontSize: responsiveFontSize(1.6),
              }}>
              Team Code
            </Text>
          </View>
          <View
            style={{
              marginTop: responsiveHeight(1),
            }}>
            <Input
              value={code}
              setValue={setCode}
              placeholder="Enter Code"
              keyboardType="email-address"
              maxLength={50}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: 'transparent',
            marginTop: responsiveHeight(5),
          }}>
          <CustomButton
            text={'Save'}
            onPress={JoinTeamHandler}
            //onPress={()=>navigation.navigate('AddTeam')}
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
export default TeamJoin;
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
