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
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import ParentBottomTabNav from '../../Navigation/ParentBottomNav';
import {localhostUrl} from '../../../Ip';

const PlayerDetails = ({route, navigation}) => {
  const data = route?.params;

  const [team, setTeam] = useState({});
  const [player, setPlayer] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPlayers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${localhostUrl}player/team/${data}/players`,
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
    if (data) {
      getPlayers();
    }
  }, [data]);

  console.log('Player-----', team);
  const renderTeamItem = ({item}) => {
    return (
      <View style={styles.teamContainer}>
        <Text style={styles.teamName}>{item.playername}</Text>

        {/* <View
            style={{
              backgroundColor: '#fff',
              width: responsiveWidth(10),
              marginLeft: responsiveWidth(60),
              marginTop: responsiveHeight(-2.5),
              flexDirection: 'row',
            }}>
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
          </View> */}
      </View>
    );
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
export default PlayerDetails;
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
    height: responsiveHeight(40),
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
