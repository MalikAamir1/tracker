/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {SearchInput} from '../../Components/CustomInput';
import BottomTabNavigation from '../../Navigation/BottomTabNavigation';
import {localhostUrl} from '../../../Ip';
import {useAuth} from '../../context/authContext';

const Contribution = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [team, setTeam] = useState([]);
  const {user} = useAuth();
  const [playerdata, setPlayerData] = useState([]);
  const [filteredTeam, setFilteredTeam] = useState([]);

  const getAllContributors = async () => {
    const url = `${localhostUrl}contributor/allcontributors`; // Replace 'your_server_url' with the actual server URL

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user?.token}`, // Include the token in the Authorization header
          // You may need to include additional headers here, such as authorization headers
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch contributors');
      }

      const data = await response.json();
      setTeam(data);

      console.log('Fetched contributors:', data);
      return data;
    } catch (error) {
      console.error('Error fetching contributors:', error.message);
      throw error;
    }
  };

  useEffect(() => {
    getAllContributors();
  }, []);
  // Usage example

  console.log('player data-------', playerdata);
  const deleteContributor = async contributorId => {
    const url = `${localhostUrl}contributor/deletecontributor/${contributorId}`; // Adjust the endpoint URL accordingly

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete contributor');
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error deleting contributor:', error.message);
      throw error;
    }
  };
  useEffect(() => {
    // Filter the team based on the search input
    const filtered = team?.filter(
      item =>
        item?.teamname?.toLowerCase().includes(search.toLowerCase()) ||
        item?.playername?.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredTeam(filtered);
  }, [search, team]);

  const renderItem = ({item}) => {
    const handleDelete = async contributorId => {
      try {
        // Show an alert to confirm deletion
        Alert.alert(
          'Delete Contributor',
          'Are you sure you want to delete this contributor?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: async () => {
                try {
                  await deleteContributor(contributorId);
                  // Refresh the contributors list after deletion
                } catch (error) {
                  console.error('Error deleting contributor:', error.message);
                }
              },
            },
          ],
          {cancelable: false},
        );
      } catch (error) {
        console.error('Error handling delete:', error.message);
      }
    };
    return (
      <TouchableOpacity onPress={() => handleDelete(item._id)}>
        <View style={style.row}>
          <View style={{flex: 1, marginLeft: responsiveWidth(-0.5)}}>
            <Text
              style={[
                style.cell,
                {
                  fontFamily: 'Roboto-SemiBold',
                  fontWeight: '700',
                  color: '#0B1E47',
                  fontSize: responsiveFontSize(1.8),
                  //backgroundColor:'#fff',
                  width: responsiveWidth(40),
                },
              ]}>
              {item.teamName}
            </Text>
          </View>
          <View style={{flex: 1, marginLeft: responsiveWidth(15)}}>
            <Text
              style={[
                style.cell,
                {
                  fontFamily: 'Roboto-Regular',
                  fontWeight: '400',
                  color: '#0B1E47',
                  fontSize: responsiveFontSize(1.8),
                },
              ]}>
              {item.playerName}
            </Text>
          </View>
          <View style={{flex: 1, marginLeft: responsiveWidth(13)}}>
            <Text
              style={[
                style.cell,
                {
                  fontFamily: 'Roboto-SemiBold',
                  fontWeight: '700',
                  color: '#0B1E47',
                  fontSize: responsiveFontSize(1.8),
                },
              ]}>
              {item.fund}
            </Text>
          </View>

          <View
            style={{
              marginRight: responsiveWidth(4),
            }}>
            <Text
              style={[
                style.cell,
                {
                  fontFamily: 'Roboto-Regular',
                  fontWeight: '400',
                  color: '#0B1E47',
                  fontSize: responsiveFontSize(1.8),
                },
              ]}>
              {item.playerCode}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      // <View style={style.row}>
      //     <Text style={[style.cell,{
      //                 fontFamily:'Roboto-SemiBold',
      //                 fontWeight:'700',
      //                 fontSize:responsiveFontSize(1.8),
      //                 color:'#0B1E47'
      //             }]}>
      //         {item.teamname}
      //     </Text>
      //     <View style={[style.row,{backgroundColor:'#f4f',}]}>
      //                     <Text style={[style.cell,{
      //                     fontFamily:'Roboto-Regular',
      //                     fontWeight:'500',
      //                     color:'#0B1E47',
      //                     fontSize:responsiveFontSize(1.6)}]}>
      //                         {item.playername}
      //                     </Text>
      //                     <Text style={[style.cell,{marginLeft:responsiveWidth(8),
      //                         fontFamily:'Roboto-Medium',
      //                         fontWeight:'700',
      //                         color:'#0B1E47',
      //                         fontSize:responsiveFontSize(1.7)}]}>
      //                         {item.amount}
      //                     </Text>
      //                     <Text style={[style.cell,{marginLeft:responsiveWidth(2),
      //                     fontFamily:'Roboto-Regular',
      //                     fontWeight:'500',
      //                     color:'#0B1E47',
      //                     fontSize:responsiveFontSize(1.6)}]}>
      //                         {item.playercode}
      //                     </Text>
      //                 </View>
      //     {/* <View style={{
      //         backgroundColor:'#fff',
      //         width:responsiveWidth(75),
      //         height:responsiveHeight(20),
      //         marginTop:responsiveHeight(-2),
      //         marginLeft:responsiveWidth(-15)
      //     }}>
      //         <FlatList
      //             data={playerdata}
      //             renderItem={({ item }) => (
      //                 <View style={[style.row,{backgroundColor:'#fff',marginLeft:responsiveWidth(8)}]}>
      //                     <Text style={[style.cell,{marginLeft:responsiveWidth(2),
      //                     fontFamily:'Roboto-Regular',
      //                     fontWeight:'500',
      //                     color:'#0B1E47',
      //                     fontSize:responsiveFontSize(1.6)}]}>
      //                         {item.playername}
      //                     </Text>
      //                     <Text style={[style.cell,{marginLeft:responsiveWidth(8),
      //                         fontFamily:'Roboto-Medium',
      //                         fontWeight:'700',
      //                         color:'#0B1E47',
      //                         fontSize:responsiveFontSize(1.7)}]}>
      //                         {item.amount}
      //                     </Text>
      //                     <Text style={[style.cell,{marginLeft:responsiveWidth(2),
      //                     fontFamily:'Roboto-Regular',
      //                     fontWeight:'500',
      //                     color:'#0B1E47',
      //                     fontSize:responsiveFontSize(1.6)}]}>
      //                         {item.playercode}
      //                     </Text>
      //                 </View>
      //             )}
      //             // keyExtractor={(item) => (item._id ? item._id.toString() : item.key.toString())}

      //         />
      //     </View> */}

      // </View>
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
        }}>
        <View
          style={{
            marginLeft: responsiveWidth(5),
            marginTop: responsiveHeight(5),
            // marginLeft:responsiveWidth(21),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Inter-Bold',
              fontWeight: '700',
              fontSize: responsiveFontSize(3.5),
              color: '#FFFFFF',
            }}>
            Contribution Tracking
          </Text>
        </View>
        <View
          style={{
            marginLeft: responsiveWidth(20),
            marginTop: responsiveHeight(2),
            alignItems: 'center',
            justifyContent: 'center',
            width: responsiveWidth(65),
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
            Track contributions from each family, ensuring transparency and
            accountability
          </Text>
        </View>
      </View>
      <View
        style={{
          width: responsiveWidth(100),
          height: responsiveHeight(72),
          borderTopLeftRadius: responsiveWidth(5),
          borderTopRightRadius: responsiveWidth(5),
          marginTop: responsiveHeight(-12),
          backgroundColor: '#fff',
          marginBottom: responsiveHeight(3),
        }}>
        <View>
          <SearchInput
            value={search}
            setValue={setSearch}
            placeholder="Search"
            iconSource={require('../../../images/search.png')} // Specify your icon image source here
            keyboardType="email-address"
            maxLength={50}
          />
        </View>
        <View
          style={{
            height: responsiveHeight(50),
            backgroundColor: '#fff',
            marginTop: responsiveHeight(1),
          }}>
          <View style={style.header}>
            <View
              style={{
                marginLeft: responsiveWidth(-3),
              }}>
              <Text style={style.heading}>Team Name</Text>
            </View>

            <View>
              <Text style={[style.heading, {marginLeft: responsiveWidth(1)}]}>
                Player Name
              </Text>
            </View>

            <View>
              <Text style={[style.heading, {marginLeft: responsiveWidth(2)}]}>
                Fund
              </Text>
            </View>
            <View>
              <Text
                style={[style.heading, , {marginRight: responsiveWidth(3)}]}>
                Code
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: responsiveHeight(-5),
              backgroundColor: '#fff',
              height: responsiveHeight(50),
            }}>
            <FlatList
              data={team}
              keyExtractor={({item, index}) => index}
              renderItem={renderItem}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          marginTop: responsiveHeight(-6),
        }}>
        <BottomTabNavigation />
      </View>
    </View>
  );
};
export default Contribution;
const style = StyleSheet.create({
  header: {
    //flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    height: responsiveHeight(10),
    marginTop: responsiveHeight(3),
    marginLeft: responsiveWidth(3),
  },
  heading: {
    flex: 1,
    fontFamily: 'Roboto-Medium',
    fontWeight: '700',
    fontSize: responsiveFontSize(1.7),
    color: '#0B1E47',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //marginVertical:1,
    marginHorizontal: 2,
    borderColor: '#fff',
    padding: 10,
    backgroundColor: '#fff',
    marginTop: responsiveHeight(2),
    flex: 1,
    marginBottom: responsiveHeight(1),
  },
  cell: {
    fontFamily: 'Mulish-Regular',
    fontWeight: '400',
    fontSize: responsiveFontSize(1.4),
    color: '#49454FCC',
    flex: 1,
  },
});
