import React,{useState,useEffect} from "react";
import { View,Text,StatusBar,Image, FlatList,StyleSheet, TouchableOpacity, ScrollView,Alert } from "react-native";
import { responsiveWidth,responsiveHeight,responsiveFontSize } from "react-native-responsive-dimensions";
import { Input } from "../../Components/CustomInput";
import { Button, CancelButton } from "../../Components/Custombtn";
import { localhostUrl } from "../../../Ip";

const AddPlayer=({route,navigation})=>{
    useEffect(() => {
        console.log("Team data:-----------", route.params);
        if (route.params && route.params.team) {
            const data = route.params.team;
            setTeamInfo(data);
            console.log(data);
        }
    }, [route.params]);
    
    
    const [teamInfo, setTeamInfo] = useState('');
    console.log('info------=-------------------',teamInfo._id)
    const [playername,setPlayerName]=useState('');
    const [playercode,setPlayerCode]=useState('');
    const [record,setRecord]=useState('');
    

  

    const addPlayer = async (playername) => {
        try {
            console.log('id---------',teamInfo._id)
          const response = await fetch(`${localhostUrl}player/addplayer`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                teamId:teamInfo._id,
              playername: playername,
              fund:0,
              playercode:playercode
            }),
          });
          if (!response.ok) {
            Alert.alert('Not Registered!', 'Not Registered Player');
            throw new Error('Network response was not ok');
            
          }
      
          const player = await response.json();
          Alert.alert('Registered!', 'Player Registered Successfully');
          navigation.navigate('TeamDetail');
          console.log(response.status)
          return player;
          
        } catch (error) {
          console.error('Error adding player:', error);
          throw error;
        }
      };
      

    return(
        <ScrollView style={{
            flex:1
        }}>
        <View style={{
            width:responsiveWidth(100),
            height:responsiveHeight(100),
            backgroundColor:'#fff'
        }}>
         
            <StatusBar
                    backgroundColor="#0B1E47" // Set the background color to purple
                    barStyle="light-content" // Set the text color to white

                />
                
                <View style={{
                    backgroundColor:'#0B1E47',
                    width:responsiveWidth(100),
                    height:responsiveHeight(45),
                    
                    
                }}>
                   
                    <View style={{
                        marginLeft:responsiveWidth(5),
                        marginTop:responsiveHeight(15),
                        marginLeft:responsiveWidth(30),
                        
                    }}>
                        <Text style={{
                            fontFamily:'Inter-Bold',
                            fontWeight:'700',
                            fontSize:responsiveFontSize(4),
                            color:'#FFFFFF',
                            
                        }}>
                        Add Player
                        </Text>
                    </View>
                    
                </View>
                <View style={{
                    width:responsiveWidth(100),
                    height:responsiveHeight(55),
                    borderTopLeftRadius:responsiveWidth(5),
                    borderTopRightRadius:responsiveWidth(5),
                    marginTop:responsiveHeight(-12),
                    backgroundColor:'#fff'
                }}>
                    
                    <View style={{
                        marginTop:responsiveHeight(10),
                        marginLeft:responsiveWidth(5)
                    }}>
                        <View>
                            <Text style={{
                                fontFamily:'Inter-Regular',
                                fontWeight:'400',
                                color:'#000000',
                                fontSize:responsiveFontSize(1.6)
                            }}>
                            Player Name
                            </Text>
                        </View>
                        <View style={{
                            marginTop:responsiveHeight(3)
                        }}>
                            <Input
                             value={playername}
                             setValue={setPlayerName}
                             placeholder="Enter Name"
                             keyboardType="email-address"
                             maxLength={50}
                            />
                        </View>
                    </View>
                   
                    <View style={{
                        marginTop:responsiveHeight(1),
                        marginLeft:responsiveWidth(5)
                    }}>
                        <View>
                            <Text style={{
                                fontFamily:'Inter-Regular',
                                fontWeight:'400',
                                color:'#000000',
                                fontSize:responsiveFontSize(1.6)
                            }}>
                            Player Code
                            </Text>
                        </View>
                        <View style={{
                            marginTop:responsiveHeight(3)
                        }}>
                            <Input
                             value={playercode}
                             setValue={setPlayerCode}
                             placeholder="Enter Code"
                             keyboardType="email-address"
                             maxLength={50}
                            />
                        </View>
                    </View>
                    <View style={{
                            marginTop:responsiveHeight(5)
                        }}>
                            <Button
                            text={'Save'}
                            onPress={()=>addPlayer(playername)}
                            />
                        </View>
                       
                    
                </View>
               
        </View>
        </ScrollView>
    )
}
export default AddPlayer
const styles = StyleSheet.create({
    teamContainer: {
        width:responsiveWidth(90),
        height:responsiveHeight(10),
        marginLeft:responsiveWidth(5),
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ECECEC',
      marginTop:responsiveHeight(-1)
    },
    teamName: {
      fontSize: responsiveFontSize(2),
      fontWeight: '700',
      color: '#0B1E47',
      fontFamily:'Poppins-Bold',
      marginTop:responsiveHeight(2)
    },
    
  });