/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
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
import {localhostUrl} from '../../../Ip';

const TeamDetail = ({route, navigation}) => {
  useEffect(() => {
    if (route.params) {
      const data = route.params;
      setTeam(data);
      console.log(data);
    }
  }, [route.params]);
  const [team, setTeam] = useState('');
  console.log(team);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playername, setPlayerName] = useState('');
  const [fund, setFund] = useState('');
  const [player, setPlayer] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (selectedPlayer) {
      setPlayerName(selectedPlayer.playername);
    }
  }, [selectedPlayer]);
  console.log('select player--', selectedPlayer);

  const openModal = ({item}) => {
    setSelectedPlayer(item);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedPlayer(null);
    setIsModalVisible(false);
  };

  console.log('select ', selectedPlayer);
  const renderTeamItem = ({item}) => (
    <View style={styles.teamContainer}>
      <Text style={styles.teamName}>{item.playername}</Text>
      <View
        style={{
          backgroundColor: '#fff',
          width: responsiveWidth(10),
          marginLeft: responsiveWidth(36),
          marginTop: responsiveHeight(-3),
          flexDirection: 'row',
        }}>
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
          <TouchableOpacity onPress={() => deletePlayer(item._id)}>
            <Image
              source={require('../../../images/delete.png')}
              style={{
                resizeMode: 'contain',
                width: responsiveWidth(5),
                height: responsiveHeight(4),
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginBottom: responsiveWidth(1),
            //marginTop:responsiveHeight(-1)
          }}>
          <View
            style={{
              backgroundColor:
                item.fundstatus === 'paid' ? '#94FF9E' : '#FF7878',
              width: responsiveWidth(23),
              height: responsiveHeight(4),
              borderRadius: responsiveWidth(2),
              marginBottom: responsiveWidth(1),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#343434',
                fontFamily: 'Poppins-Bold',
                fontWeight: '700',
                fontSize: responsiveFontSize(1.4),
              }}>
              {item.fundstatus}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          marginLeft: responsiveWidth(57),
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#0B1E47',
            width: responsiveWidth(25),
            height: responsiveHeight(4),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: responsiveWidth(2),
            padding: responsiveWidth(1),
          }}
          onPress={() => {
            setSelectedPlayer(item);
            navigation.navigate('AddContribution', {
              team: team,
              player: selectedPlayer,
            });
            console.log('-----------', selectedPlayer);
            console.log('-----------', item);
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: responsiveFontSize(1.3),
            }}>
            Add Contribution
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const getPlayers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${localhostUrl}player/team/${team._id}/players`,
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const players = await response.json();
      setPlayer(players);
      setLoading(false);
      return players;
    } catch (error) {
      setLoading(false);
      console.error('Error fetching players:', error);
      throw error;
    }
  };
  useEffect(() => {
    getPlayers();
  }, []);
  console.log(player);
  const editPlayer = async () => {
    const updatedStatus = fund ? 'paid' : 'Unpaid'; // Set fundstatus based on the fund amount
    console.log('selected player id-----', selectedPlayer._id);
    try {
      const response = await fetch(
        `${localhostUrl}player/editplayer/${selectedPlayer._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            playername: playername,
            fundstatus: updatedStatus,
            fund: Number(fund),
            playercode: selectedPlayer.playercode,
            teamId: team._id,
          }),
        },
      );

      if (!response.ok) {
        // Handle the case where the request was not successful
        Alert.alert('Sorry', 'User Not Found');
        setFund('');
        closeModal();
        throw new Error('Network response was not ok');
      }

      const updatedPlayer = await response.json();
      Alert.alert('Updated', 'Player Updated Successfully');
      console.log('Updated player:', updatedPlayer);
      setFund('');
      closeModal();
      return updatedPlayer;
    } catch (error) {
      console.error('Error updating player:', error);
      throw error;
    }
  };
  const deletePlayer = async playerId => {
    try {
      console.log('player id-----------', playerId);
      const response = await fetch(
        `${localhostUrl}player/deleteplayer/${playerId}`,
        {
          method: 'DELETE',
        },
      );
      console.log(response.status);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      Alert.alert('Deleted', 'Record Deleted Successfully');
      getPlayers();
      console.log(data.message); // Log the response message

      // Handle any additional logic after successfully deleting the player
    } catch (error) {
      console.error('Error deleting player:', error);
      // Handle error scenarios
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
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            justifyContent: 'center',
            marginTop: responsiveHeight(-7),
            marginLeft: responsiveWidth(5),
          }}>
          <Text
            style={{
              fontFamily: 'Inter-SemiBold',
              fontWeight: '600',
              fontSize: responsiveFontSize(3.5),
              color: '#FFFFFF',
            }}>
            Team Details
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
            height: responsiveHeight(45),
            marginBottom: responsiveHeight(2),
            marginTop: responsiveHeight(3),
            backgroundColor: '#fff',
          }}>
          <FlatList
            data={player}
            renderItem={renderTeamItem}
            keyExtractor={item => item._id.toString()}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={getPlayers} />
            }
          />
        </View>

        <View
          style={{
            backgroundColor: 'transparent',
            marginTop: responsiveHeight(3),
          }}>
          <CustomButton
            text={'Add Player'}
            onPress={() => navigation.navigate('AddPlayer', {team})}
          />
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#4e3',
          marginTop: responsiveHeight(-13),
        }}>
        <BottomTabNavigation />
      </View>
      <View style={styles.container}>
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
        {/* Your existing code */}
        {/* Modal for editing player */}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Islamabadian</Text>
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
                    Player Name
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: responsiveHeight(2),
                  }}>
                  <PopInput
                    value={playername}
                    setValue={setPlayerName}
                    placeholder="Enter Player Name"
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
                    Fund amount
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: responsiveHeight(2),
                  }}>
                  <PopInput
                    value={fund}
                    setValue={setFund}
                    placeholder="Enter Fund"
                    keyboardType="numeric"
                    maxLength={50}
                  />
                </View>
              </View>

              <View
                style={{
                  marginLeft: responsiveWidth(-13),
                  marginTop: responsiveHeight(2),
                }}>
                <CustomButton text={'Save'} onPress={editPlayer} />
              </View>
              <View
                style={{
                  marginLeft: responsiveWidth(1),
                  marginTop: responsiveHeight(2),
                }}>
                <TouchableOpacity
                  style={{
                    width: responsiveWidth(70),
                    height: responsiveHeight(6),
                    backgroundColor: '#F1F6FF',
                    borderRadius: responsiveWidth(2),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={closeModal}>
                  <Text
                    style={{
                      color: '#000000',
                      fontFamily: 'Inter-Medium',
                      fontWeight: '600',
                      fontSize: responsiveFontSize(1.7),
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};
export default TeamDetail;
const styles = StyleSheet.create({
  teamContainer: {
    width: responsiveWidth(90),
    height: responsiveHeight(15),
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
    marginTop: responsiveHeight(1.7),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: responsiveWidth(2),
    padding: responsiveWidth(2),
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(60),
  },
  modalTitle: {
    fontSize: responsiveFontSize(2),
    fontWeight: '400',
    marginBottom: responsiveHeight(2),
    color: '#000000',
    fontFamily: 'Inter-Regular',
  },
  toggleButton: {},
  toggleButtonText: {
    color: '#FF0000',
    fontSize: responsiveFontSize(1.4),
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
  },
});
