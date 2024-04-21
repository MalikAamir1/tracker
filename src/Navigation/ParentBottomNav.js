import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const ParentBottomTabNav = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: responsiveWidth(100),
        height: responsiveHeight(8),
        backgroundColor: '#0B1E47',
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View
          style={{
            marginLeft: responsiveWidth(30),
            marginTop: responsiveHeight(1),
          }}>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('ParentHome')}>
              <Image
                source={require('../../images/team.png')}
                style={{
                  resizeMode: 'contain',
                  width: responsiveWidth(5),
                  height: responsiveHeight(4),
                }}
              />
              <View
                style={{
                  marginLeft: responsiveWidth(-1.5),
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontWeight: '600',
                    color: '#fff',
                    fontSize: responsiveFontSize(1.5),
                  }}>
                  Team
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginLeft: responsiveWidth(13),
            marginTop: responsiveHeight(1),
          }}>
          {/* <View style={{
            marginLeft:responsiveWidth(5)
        }}>
            <TouchableOpacity
            onPress={()=>navigation.navigate('BreakDown')}
            >
        <Image
        source={require('../../images/expense.png')}
        style={{
            resizeMode:'contain',
            width:responsiveWidth(5),
            height:responsiveHeight(4),
            marginLeft:responsiveWidth(2)
        }}
        />
        <View style={{
            marginLeft:responsiveWidth(-1.5)
        }}>
            <Text style={{
                fontFamily:'Poppins-SemiBold',
                fontWeight:'600',
                color:'#fff',
                fontSize:responsiveFontSize(1.5)
            }}>
            Expense
            </Text>
        </View>
        </TouchableOpacity>
        </View> */}
          {/* <View style={{
            marginLeft:responsiveWidth(33),
            marginTop:responsiveHeight(-6.3)
        }}>
            <TouchableOpacity
            onPress={()=>navigation.navigate('Chat')}
            >
        <Image
        source={require('../../images/chat.png')}
        style={{
            resizeMode:'contain',
            width:responsiveWidth(5),
            height:responsiveHeight(4),
            marginTop:responsiveHeight(-.5),
            marginLeft:responsiveWidth(-.9)
        }}
        />
        <View style={{
            marginLeft:responsiveWidth(-1.5),
            marginTop:responsiveHeight(.5)
        }}>
            <Text style={{
                fontFamily:'Poppins-SemiBold',
                fontWeight:'600',
                color:'#fff',
                fontSize:responsiveFontSize(1.5)
            }}>
            Chat
            </Text>
        </View>
        </TouchableOpacity>
        </View> */}

          <View
            style={{
              marginLeft: responsiveWidth(10),
              marginTop: responsiveHeight(0.2),
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ParentSetting')}>
              <Image
                source={require('../../images/settings.png')}
                style={{
                  resizeMode: 'contain',
                  width: responsiveWidth(5),
                  height: responsiveHeight(4),
                  marginTop: responsiveHeight(-0.5),
                  marginLeft: responsiveWidth(1),
                }}
              />
              <View
                style={{
                  marginLeft: responsiveWidth(-1.5),
                  marginTop: responsiveHeight(0.5),
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontWeight: '600',
                    color: '#fff',
                    fontSize: responsiveFontSize(1.5),
                  }}>
                  Setting
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default ParentBottomTabNav;
