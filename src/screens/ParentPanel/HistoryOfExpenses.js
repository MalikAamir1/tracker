/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import BottomTabNavigation from '../../Navigation/BottomTabNavigation';
import {localhostUrl} from '../../../Ip';
import ParentBottomTabNav from '../../Navigation/ParentBottomNav';

const HistoryOfExpenses = ({route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [team, setTeam] = useState([]);
  const [data, setData] = useState([]);

  const teamId = route.params; // Replace 'your_team_id' with the actual team ID

  const getAllExpensesOfTeam = async () => {
    try {
      const response = await fetch(`${localhostUrl}expense/team/${teamId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }
      const expenses = await response.json();
      setData(expenses);

      // Calculate total budget and spent amount

      return expenses;
    } catch (error) {
      console.error('Error fetching expenses:', error);
      throw error;
    }
  };

  useEffect(() => {
    getAllExpensesOfTeam();
  }, []);

  const renderItem = ({item}) => (
    <View
      style={{
        width: responsiveWidth(90),
        height: responsiveHeight(13),
        borderRadius: responsiveWidth(2),
        elevation: 1,
        marginLeft: responsiveWidth(5),
        marginTop: responsiveHeight(1),
        marginBottom: responsiveHeight(1),
        backgroundColor: '#fff',
      }}>
      <TouchableOpacity
        onPress={() => {
          setSelectedExpense(item);
          setModalVisible(true);
        }}>
        <View
          style={{
            width: responsiveWidth(90),
            height: responsiveHeight(13),
            borderRadius: responsiveWidth(6),
            // elevation:1,
            marginLeft: responsiveWidth(2),
          }}>
          <View
            style={{
              backgroundColor: '#0B1E47',
              width: responsiveWidth(10),
              height: responsiveHeight(5),
              //alignItems:'center',
              justifyContent: 'center',
              borderRadius: responsiveWidth(2),
              marginLeft: responsiveWidth(5),
              marginTop: responsiveHeight(3),
            }}>
            <Image
              source={require('../../../images/arrowdown.png')}
              style={{
                resizeMode: 'contain',
                width: responsiveWidth(4),
                marginLeft: responsiveWidth(2.5),
              }}
            />
          </View>
          <View
            style={{
              marginLeft: responsiveWidth(19),
              marginTop: responsiveHeight(-5.5),
            }}>
            <Text
              style={{
                color: '#0B1E47',
                fontWeight: '700',
                fontFamily: 'Roboto-Medium',
                fontSize: responsiveFontSize(1.7),
              }}>
              {item.expensename}
            </Text>
          </View>
          <View
            style={{
              marginLeft: responsiveWidth(19),
              marginTop: responsiveHeight(1),
            }}>
            <Text
              style={{
                color: '#999999',
                fontWeight: '400',
                fontFamily: 'Roboto-Regular',
                fontSize: responsiveFontSize(1.6),
              }}>
              {item.description.length > 15
                ? item.description.substring(0, 15) + '...'
                : item.description}
            </Text>
          </View>
          <View
            style={{
              marginLeft: responsiveWidth(68),
              marginTop: responsiveHeight(-6),
            }}>
            <Text
              style={{
                color: '#0B1E47',
                fontWeight: '700',
                fontFamily: 'Roboto-Medium',
                fontSize: responsiveFontSize(1.7),
              }}>
              {item.amount}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
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
              fontSize: responsiveFontSize(3),
              color: '#FFFFFF',
            }}>
            Expense History
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
            Track and manage your team's funds with confidence.
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
            marginTop: responsiveHeight(2),
            height: responsiveHeight(65),
          }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item._id.toString()}
          />
        </View>
      </View>
      <View
        style={{
          marginTop: responsiveHeight(-6),
        }}>
        <ParentBottomTabNav />
      </View>
      {/* Modal for displaying expense details */}
      <View>
        {modalVisible ? (
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                padding: responsiveWidth(2),
                borderRadius: responsiveWidth(4),
                width: '80%',
                height: responsiveHeight(60),
              }}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    marginLeft: responsiveWidth(63),
                    marginTop: responsiveHeight(2),
                  }}>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Image
                      source={require('../../../images/close.png')}
                      style={{
                        width: responsiveWidth(10),
                        height: responsiveHeight(5),
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: responsiveHeight(2),
                }}>
                <Text
                  style={{
                    color: '#000000',
                    fontFamily: 'Roboto-Bold',
                    fontWeight: '700',
                    fontSize: responsiveFontSize(2.8),
                  }}>
                  Expense Details
                </Text>
              </View>
              {/* Display expense details */}
              {selectedExpense && (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: responsiveHeight(3),
                      marginLeft: responsiveWidth(3),
                    }}>
                    <View style={{}}>
                      <Text
                        style={{
                          fontFamily: 'Roboto-Medium',
                          fontWeight: '700',
                          color: '#000000',
                          fontSize: responsiveFontSize(1.7),
                        }}>
                        Expense Name
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontFamily: 'Roboto-Medium',
                          fontWeight: '400',
                          color: '#000000',
                          fontSize: responsiveFontSize(1.7),
                          marginLeft: responsiveWidth(11),
                          flex: 1,
                        }}>
                        {selectedExpense.expensename}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: responsiveWidth(3),
                      marginTop: responsiveHeight(2),
                    }}>
                    <View>
                      <Text
                        style={{
                          fontFamily: 'Roboto-Bold',
                          fontWeight: '700',
                          color: '#000000',
                          fontSize: responsiveFontSize(1.7),
                        }}>
                        Amount
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontFamily: 'Roboto-Regular',
                          fontWeight: '400',
                          color: '#000000',
                          fontSize: responsiveFontSize(1.7),
                          marginLeft: responsiveWidth(23),
                        }}>
                        {selectedExpense.amount}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: responsiveHeight(4),
                      marginLeft: responsiveWidth(3),
                    }}>
                    <View>
                      <Text
                        style={{
                          fontFamily: 'Roboto-Bold',
                          fontWeight: '700',
                          color: '#000000',
                          fontSize: responsiveFontSize(1.7),
                        }}>
                        Description
                      </Text>
                    </View>
                    <View
                      style={{
                        marginTop: responsiveHeight(1),
                        width: responsiveWidth(70),
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Roboto-Regular',
                          fontWeight: '400',
                          color: '#000000',
                          fontSize: responsiveFontSize(1.6),
                          lineHeight: 25,
                          //marginLeft:responsiveWidth(24)
                        }}>
                        {selectedExpense.description}
                      </Text>
                    </View>
                  </View>

                  {/* You can add more details here */}
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};
export default HistoryOfExpenses;
