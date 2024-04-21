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
  Modal,
  RefreshControl,
  BackHandler,
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
import {useNavigation} from '@react-navigation/native';
import {localhostUrl} from '../../../Ip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../../context/authContext';
import {useFocusEffect} from '@react-navigation/native';
const ParentHome = () => {
  const navigation = useNavigation();
  const [adminInfo, setAdminInfo] = useState('');
  const {user} = useAuth();
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllTeams = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${localhostUrl}player/getallteams`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const teams = await response.json();

      if (teams.length === 0) {
        navigation.navigate('JoinTeam');
      }

      setLoading(false);
      console.log('Fetched teams:', teams); // Log the fetched data
      setTeam(teams); // Set fetched data into the team state
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
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
  // getAllTeams();

  useEffect(() => {
    getAllTeams();
  }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const onBackPress = () => {
  //       // Your logic to conditionally prevent navigation
  //       return true;
  //     };

  //     // Add listener for hardware back press event
  //     BackHandler.addEventListener('hardwareBackPress', onBackPress);

  //     // Clean up the listener when the component is unmounted
  //     return () => {
  //       BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  //     };
  //   }, []),
  // );

  const renderTeamItem = ({item}) => (
    <View style={styles.teamContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('PlayerDetails', item.teamId)}>
        <Text style={styles.teamName}>{item.teamName}</Text>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: '#fff',
          width: responsiveWidth(10),
          marginLeft: responsiveWidth(40),
          marginTop: responsiveHeight(-2.5),
          flexDirection: 'row',
        }}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('BreakDown', item)}>
            <Image
              source={require('../../../images/wallet.png')}
              style={{
                resizeMode: 'contain',
                width: responsiveWidth(5),
                height: responsiveHeight(4),
                marginLeft: responsiveWidth(10),
              }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: 'transparent',
            width: responsiveWidth(10),
            marginLeft: responsiveWidth(5),
            //marginTop:responsiveHeight(-3)
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Chat', item.teamId)}>
            <Image
              source={require('../../../images/message.png')}
              style={{
                resizeMode: 'contain',
                width: responsiveWidth(5),
                height: responsiveHeight(4),
                //marginLeft:responsiveWidth(10)
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: 'transparent',
            width: responsiveWidth(10),
            marginLeft: responsiveWidth(1),
            //marginTop:responsiveHeight(-3)
          }}>
          <TouchableOpacity>
            <Image
              source={require('../../../images/eye.png')}
              style={{
                resizeMode: 'contain',
                width: responsiveWidth(7),
                height: responsiveHeight(4),
                //marginLeft:responsiveWidth(10)
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

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
          }}>
          <Text
            style={{
              fontFamily: 'Inter-SemiBold',
              fontWeight: '600',
              fontSize: responsiveFontSize(3.5),
              color: '#FFFFFF',
            }}>
            Hi, {adminInfo.name}
          </Text>
        </View>
        <View
          style={{
            marginLeft: responsiveWidth(5),
            marginTop: responsiveHeight(2),
          }}>
          <Text
            style={{
              fontFamily: 'Inter-Regular',
              fontWeight: '400',
              fontSize: responsiveFontSize(2),
              color: '#FFFFFF',
            }}>
            Your team details here
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
            height: responsiveHeight(45),
            marginBottom: responsiveHeight(2),
            marginTop: responsiveHeight(3),
          }}>
          <FlatList
            data={team}
            renderItem={renderTeamItem}
            keyExtractor={item => item.playerId}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={getAllTeams} />
            }
          />
        </View>

        {team ? null : (
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
        )}
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
export default ParentHome;
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
