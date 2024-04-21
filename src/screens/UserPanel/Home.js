/* eslint-disable react-native/no-inline-styles */
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
  Alert,
  RefreshControl,
  ActivityIndicator,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {localhostUrl} from '../../../Ip';

const Home = ({navigation}) => {
  const [team, setTeam] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [adminInfo, setAdminInfo] = useState({});
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamname, setTeamName] = useState('');
  const [sporttyp, setSportType] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedTeam) {
      setTeamName(selectedTeam.teamname);
      setSportType(selectedTeam.sporttype);
      setCode(selectedTeam.teamcode);
    }
  }, [selectedTeam]);
  console.log('data----', team);
  const openModal = ({item}) => {
    setSelectedTeam(item);
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

  const renderTeamItem = ({item}) => (
    <View style={styles.teamContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('TeamDetail', item)}>
        <Text style={styles.teamName}>{item.teamname}</Text>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: '#fff',
          width: responsiveWidth(10),
          marginLeft: responsiveWidth(36),
          marginTop: responsiveHeight(-3),
          flexDirection: 'row',
        }}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('ExpenseBreakdown', item)}>
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
          <TouchableOpacity onPress={() => navigation.navigate('Chat', item._id)}>
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
          <TouchableOpacity onPress={() => openModal({item})}>
            <Image
              source={require('../../../images/edit.png')}
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
          <TouchableOpacity onPress={() => deleteTeam({item})}>
            <Image
              source={require('../../../images/delete.png')}
              style={{
                resizeMode: 'contain',
                width: responsiveWidth(5),
                height: responsiveHeight(4),
                //marginLeft:responsiveWidth(10)
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  const getAllTeams = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${localhostUrl}team/allteams`, {
        method: 'GET', // Assuming you're making a GET request
        headers: {
          Authorization: `Bearer ${adminInfo.token}`, // Include the token in the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(response.status);
      const teams = await response.json();

      setLoading(false);
      console.log(teams); // Log the fetched data
      setTeam(teams || []); // Set fetched data into the team state
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (adminInfo.token && !loading) {
      getAllTeams();
    }
  }, [adminInfo]);
  console.log('teamssssssssss', team);
  // Usage

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${localhostUrl}team/editteam/${selectedTeam._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            teamname: teamname,
            sporttype: sporttyp,
            teamcode: code,
          }),
        },
      );
      if (!response.ok) {
        Alert.alert('Sorry', 'User Not Found');
        closeModal();
        // throw new Error('Network response was not ok');
      }

      const updatedTeam = await response.json();
      closeModal();
      Alert.alert('Updated!', 'Team Updated Successfully');
      console.log('Updated team:', updatedTeam);
    } catch (error) {
      console.error('Error updating team:', error);
    }
  };

  const deleteTeam = async ({item}) => {
    try {
      const response = await fetch(
        `${localhostUrl}team/deleteteam/${item._id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        Alert.alert('Sorry', 'User Not Found');
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      Alert.alert('Success', 'Deleted Successful');
      return data; // You can handle the response data as needed
    } catch (error) {
      console.error('Error deleting team:', error);
      throw error;
    }
  };

  console.log(adminInfo);
  console.log('selected-----', selectedTeam);
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
            {console.log('Uesr Name', adminInfo.name)}
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
            View your team list here
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
          {team ? (
            <FlatList
              data={team.slice(0, 5)}
              renderItem={({item}) => renderTeamItem({item})}
              keyExtractor={item => item._id.toString()} // Ensure _id is a string and unique
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={getAllTeams} />
              }
            />
          ) : (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
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
        <View
          style={{
            backgroundColor: 'transparent',
            marginTop: responsiveHeight(1),
          }}>
          <CustomButton
            text={'Add Team'}
            onPress={() => navigation.navigate('AddTeam')}
          />
        </View>
        {team ? (
          <View
            style={{
              backgroundColor: 'transparent',
              marginTop: responsiveHeight(-3),
            }}>
            <ButtonViewAllTeam
              text={'View All Teams'}
              onPress={() => navigation.navigate('ViewTeam')}
            />
          </View>
        ) : null}
      </View>
      <View
        style={{
          backgroundColor: '#4e3',
          marginTop: responsiveHeight(-13),
        }}>
        <BottomTabNavigation />
      </View>
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        {isModalVisible ? (
          <StatusBar
            backgroundColor="rgba(0, 0, 0, 0.5)" // Set the background color to purple
            barStyle="dark-content" // Set the text color to white
          />
        ) : (
          <StatusBar
            backgroundColor="#0B1E47" // Set the background color to purple
            barStyle="light-content" // Set the text color to white
          />
        )}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}>
          <View
            style={{
              width: responsiveWidth(85),
              backgroundColor: '#FFF',
              borderRadius: responsiveWidth(2),
              padding: responsiveWidth(2),
              height: responsiveHeight(65),
              //alignItems:'center',
              // justifyContent:'center',
              marginLeft: responsiveWidth(8),
              marginTop: responsiveHeight(20),
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: responsiveHeight(3),
              }}>
              <Text
                style={{
                  fontFamily: 'Inter-Regular',
                  fontWeight: '400',
                  color: '#000000',
                  fontSize: responsiveFontSize(3),
                }}>
                Team Details
              </Text>
            </View>
            <View
              style={{
                marginLeft: responsiveWidth(3),
              }}>
              <View
                style={{
                  marginTop: responsiveHeight(3),
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
                    marginTop: responsiveHeight(1),
                  }}>
                  <PopInput
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
                  marginTop: responsiveHeight(1),
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
                    marginTop: responsiveHeight(1),
                  }}>
                  <PopInput
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
                  <PopInput
                    value={code}
                    setValue={setCode}
                    placeholder="Enter Code"
                    keyboardType="email-address"
                    maxLength={50}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                marginLeft: responsiveWidth(-9),
                marginTop: responsiveHeight(3),
              }}>
              <CustomButton text={'Update'} onPress={handleSubmit} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: responsiveHeight(2),
              }}>
              <View>
                <Text
                  style={{
                    fontFamily: 'Inter-Regular',
                    fontWeight: '400',
                    color: '#16284F',
                  }}>
                  Do you want to Add Player?
                </Text>
              </View>
              <View style={{marginLeft: responsiveWidth(2)}}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('AddPlayer', {selectedTeam})
                  }>
                  <Text
                    style={{
                      fontFamily: 'Inter-Bold',
                      fontWeight: '700',
                      color: '#16284F',
                      textDecorationLine: 'underline',
                    }}>
                    Click Here
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default Home;
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
    height: responsiveHeight(3),
  },
});
