/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Input} from '../../Components/CustomInput';
import {Button, CancelButton} from '../../Components/Custombtn';
import {localhostUrl} from '../../../Ip';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTeam = ({navigation}) => {
  const [adminInfo, setAdminInfo] = useState({});
  const [teamname, setTeamName] = useState('');
  const [sporttyp, setSportType] = useState('');
  const [code, setCode] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const checkUserInStorage = async () => {
      try {
        const userInfoString = await AsyncStorage.getItem('userInfo');
        if (userInfoString !== null) {
          // Parse userInfoString to an object
          const userInfo = JSON.parse(userInfoString);
          // User information exists, set it to adminInfo state
          setAdminInfo(userInfo);
        }
      } catch (error) {
        console.log('Error checking user in storage:', error);
      }
    };

    checkUserInStorage();
  }, []);

  const handleSubmit = async () => {
    if (!teamname || !sporttyp || !code) {
      Alert.alert('Sorry', 'Please enter all values');
      return;
    }
    try {
      const response = await fetch(`${localhostUrl}team/createteam`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminInfo.token}`, // Include the token in the Authorization header
          // You may need to include additional headers here, such as authorization headers
        },
        body: JSON.stringify({
          teamname: teamname,
          sporttype: sporttyp,
          teamcode: code,
        }),
      });

      if (!response.ok) {
        // Handle the case where the request was not successful
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      Alert.alert('Registered!', 'Team Created Successfully');
      navigation.navigate('Home');
      setCode(''), setSportType('');
      setTeamName('');
      console.log('Team created:', data);
      // Handle successful response here, such as showing a success message or navigating to another screen
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Team Code have already been used');
      // Handle any errors that occurred during the fetch
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
            height: responsiveHeight(45),
          }}>
          <View
            style={{
              justifyContent: 'center',
              backgroundColor: 'transparent',
              width: responsiveWidth(10),
              alignItems: 'center',
              height: responsiveHeight(10),
              marginTop: responsiveHeight(5),
              marginLeft: responsiveWidth(44),
            }}>
            <Image
              source={require('../../../images/splashicon.png')}
              style={{
                resizeMode: 'contain',
                width: responsiveWidth(35),
                height: responsiveHeight(30),
              }}
            />
          </View>
          <View
            style={{
              marginLeft: responsiveWidth(5),
              marginTop: responsiveHeight(2),
              marginLeft: responsiveWidth(23),
            }}>
            <Text
              style={{
                fontFamily: 'Inter-Bold',
                fontWeight: '700',
                fontSize: responsiveFontSize(3),
                color: '#FFFFFF',
              }}>
              Team Registration
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
              Simplify team registration for managers
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
          <ScrollView>
            <View
              style={{
                marginTop: responsiveHeight(6),
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
                  Team Name
                </Text>
              </View>
              <View
                style={{
                  marginTop: responsiveHeight(2),
                }}>
                <Input
                  value={teamname}
                  setValue={setTeamName}
                  placeholder="Enter Name"
                  keyboardType="email-address"
                  maxLength={50}
                />
              </View>
            </View>
            <View
              style={{
                marginTop: responsiveHeight(2),
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
                  Sport Type
                </Text>
              </View>
              <View
                style={{
                  marginTop: responsiveHeight(2),
                }}>
                <Input
                  value={sporttyp}
                  setValue={setSportType}
                  placeholder="Enter Sport Type"
                  keyboardType="email-address"
                  maxLength={50}
                />
              </View>
            </View>
            <View
              style={{
                marginTop: responsiveHeight(1),
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
                  placeholder="Team Code"
                  keyboardType="email-address"
                  maxLength={50}
                />
              </View>
            </View>

            <View
              style={{
                marginTop: responsiveHeight(3),
              }}>
              <Button text={'Save'} onPress={handleSubmit} />
            </View>
            <View
              style={{
                marginTop: responsiveHeight(3),
              }}>
              <CancelButton
                text={'Cancel'}
                onPress={() => navigation.navigate('Home')}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};
export default AddTeam;
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
