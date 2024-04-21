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

const AddContribution = ({route, navigation}) => {
  useEffect(() => {
    if (route.params) {
      const {team, player} = route.params;

      // Check if 'team' or 'player' object is present
      if (team) {
        setTeamData(team);
        console.log('Team:----------------', team);
      }

      if (player) {
        setPlayerData(player);
        console.log('Player:----------------', player);
      }
    }
  }, [route.params]);

  const [amount, setAmount] = useState('');
  const [playerdata, setPlayerData] = useState('');
  const [teamdata, setTeamData] = useState('');

  console.log('Player:----------------', playerdata);
  const createContributor = async () => {
    const url = `${localhostUrl}contributor/createcontributor`; // Replace 'your_server_url' with the actual server URL

    const requestBody = {
      teamId: teamdata._id,
      playerId: playerdata._id,
      amount: amount,
      playercode: playerdata.playercode,
      teamcode: teamdata.teamcode,
      teamname: teamdata.teamname,
      playername: playerdata.playername,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        console.log('data sending to server', requestBody);
        console.log(response.status);
        Alert.alert('Sorry', 'Contribution not Added');
        navigation.navigate('TeamDetail');
      }

      const data = await response.json();
      Alert.alert('Added', 'Contribution Added Successsful');
      navigation.navigate('TeamDetail');
      console.log('Created contributor:', data);
      return data;
    } catch (error) {
      console.error('Error creating contributor:', error.message);
      throw error;
    }
  };

  return (
    <View
      style={{
        width: responsiveWidth(100),
        height: responsiveHeight(100),
        backgroundColor: '#fff',
      }}>
      <ScrollView
        style={{
          height: responsiveHeight(80),
          //backgroundColor:'#4e3'
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
              marginLeft: responsiveWidth(5),
              marginTop: responsiveHeight(2),
              marginLeft: responsiveWidth(23),
              marginTop: responsiveHeight(5),
            }}>
            <Text
              style={{
                fontFamily: 'Inter-Bold',
                fontWeight: '700',
                fontSize: responsiveFontSize(3),
                color: '#FFFFFF',
              }}>
              Add Contribution
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
              Lorem Ipsum is simply dummy text
            </Text>
          </View>
        </View>
        <View
          style={{
            width: responsiveWidth(100),
            height: responsiveHeight(75),
            borderTopLeftRadius: responsiveWidth(5),
            borderTopRightRadius: responsiveWidth(5),
            marginTop: responsiveHeight(-12),
            backgroundColor: '#fff',
          }}>
          <View
            style={{
              marginTop: responsiveHeight(5),
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
                Amount
              </Text>
            </View>
            <View
              style={{
                marginTop: responsiveHeight(1),
              }}>
              <Input
                value={amount}
                setValue={setAmount}
                placeholder="Enter Amount"
                keyboardType="phone-pad"
                maxLength={50}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: responsiveHeight(1),
            }}>
            <Button text={'Save'} onPress={createContributor} />
          </View>
          <View
            style={{
              marginTop: responsiveHeight(3),
            }}>
            <CancelButton
              text={'Cancel'}
              onPress={() => navigation.navigate('Contribution')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default AddContribution;
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
