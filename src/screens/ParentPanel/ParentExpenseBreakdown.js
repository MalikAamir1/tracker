import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {PieChart} from 'react-native-svg-charts';
import BottomTabNavigation from '../../Navigation/BottomTabNavigation';
import {localhostUrl} from '../../../Ip';

const ParentExpenseBreakdown = ({route, navigation}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const widthAndHeight = 250;
  const [loading, setLoading] = useState(false);
  const [team, setTeam] = useState([]);
  const [data, setData] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState();

  const expenseColors = ['#FF5733', '#33FF86', '#3366FF', '#FF33FF', '#FFFF33'];
  useEffect(() => {
    const teamId = route.params; // Replace 'your_team_id' with the actual team ID
    setTeam(teamId);
    console.log(teamId);
    getAllExpensesOfTeam(); // Pass team._id to getAllExpensesOfTeam function
    fetchtotal();
  }, [team]);
  const getAllBudgetOfTeam = async () => {
    const teamId = team._id; // Replace 'your_team_id' with the actual team ID
    const url = `${localhostUrl}expense/team/${team._id}/budget`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }

      const expenses = await response.json();
      setTotalBudget(expenses.totalBudget);
      console.log('total budget-------', totalBudget);
      console.log('expenses-----', expenses);
      return expenses;
    } catch (error) {
      console.error('Error fetching expenses:', error.message);
      throw error;
    }
  };

  const getAllExpensesOfTeam = async () => {
    try {
      const response = await fetch(`${localhostUrl}expense/team/${team._id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }
      const expenses = await response.json();
      setData(expenses);

      // Calculate total budget and spent amount
      let budget = 0;
      let spent = 0;
      data.map(item => {
        budget = 200000;

        spent += parseInt(item.amount); // Add the current item's amount to spent
        console.log('Current spent value:', spent);
      });
      console.log(setTotalSpent(spent));
      setTotalSpent(spent);

      return expenses;
    } catch (error) {
      console.error('Error fetching expenses:', error);
      throw error;
    }
  };

  useEffect(() => {
    getAllExpensesOfTeam();
    getAllBudgetOfTeam();
    console.log(totalSpent);
  }, []);
  const fetchtotal = () => {
    totalSpent;
  };

  const ExpenseLineIndicator = ({spent, budget}) => {
    // Calculate the percentage spent relative to the budget
    const spentAmount = Number(spent);
    const percentage = (spent / budget) * 100;
    const remainingPercentage = (100 - percentage).toFixed(1);

    // Calculate the width of the line indicator
    const indicatorWidth = `${percentage.toFixed(2)}%`;

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>Your spend this Month is </Text>
          <Text
            style={[
              styles.text,
              {
                marginLeft: responsiveWidth(18),
                marginTop: responsiveHeight(-4),
                fontFamily: 'Roboto-Bold',
                fontWeight: '800',
              },
            ]}>
            ${totalSpent}
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: '#999999',
              fontWeight: '400',
              fontFamily: 'Roboto-Regular',
              marginLeft: responsiveWidth(64),
              marginTop: responsiveHeight(-7.5),
              marginBottom: responsiveHeight(2),
              fontSize: responsiveFontSize(1.6),
            }}>
            March, 2024
          </Text>
        </View>
        <View style={styles.indicatorContainer}>
          <View style={styles.backgroundIndicator}>
            <View>
              {indicatorWidth > 80 ? (
                <Text
                  style={{
                    color: '#312F33',
                    marginTop: responsiveHeight(1),
                    marginLeft: responsiveWidth(80),
                  }}>
                  {remainingPercentage}%
                </Text>
              ) : (
                <View
                  style={{
                    backgroundColor: '#4e3',
                  }}>
                  <Text
                    style={{
                      color: '#312F33',
                      marginTop: responsiveHeight(-3),
                      marginLeft: responsiveWidth(80),
                    }}>
                    {remainingPercentage}%
                  </Text>
                </View>
              )}
            </View>

            <View
              style={[
                styles.indicator,
                {
                  width: indicatorWidth,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <Text>{indicatorWidth}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const getNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentDate(nextMonth);
  };

  const getPreviousMonth = () => {
    const previousMonth = new Date(currentDate);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    setCurrentDate(previousMonth);
  };
  const SelectedDate = date => {
    const selectedDateTime = new Date(date);
    selectedDateTime.setHours(currentDate.getHours());
    selectedDateTime.setMinutes(currentDate.getMinutes());
    selectedDateTime.setSeconds(currentDate.getSeconds());
    setSelectedDate(selectedDateTime);
  };

  const renderDates = () => {
    const dates = [];
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    ).getDate();
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i,
      );
      const isSelected = selectedDate && selectedDate.getDate() === i;

      dates.push(
        <View
          key={i}
          style={{
            alignItems: 'center',
            backgroundColor: '#fff',
            marginLeft: responsiveWidth(-1.5),
          }}>
          <TouchableOpacity
            onPress={() => SelectedDate(date)}
            style={{
              padding: 20,
              backgroundColor: '#fff',
              borderRadius: responsiveWidth(15),
              marginTop: responsiveHeight(-1),
              width: responsiveWidth(19),
              height: responsiveHeight(8),
            }}>
            <Text
              style={{
                color: '#312F33',
                fontFamily: 'Roboto-Medium',
                fontWeight: '700',
                marginLeft: responsiveWidth(2.5),
              }}>
              {i}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: isSelected ? '#000000' : '#999999',
              fontFamily: 'Roboto-Regular',
              fontWeight: isSelected ? '700' : '400',
            }}>
            {weekDays[date.getDay()]}
          </Text>
        </View>,
      );
    }
    return dates;
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const suffix = ordinalSuffix(day);
    return `${day}${suffix} ${month}, ${year}`;
  };

  const ordinalSuffix = day => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Test the formatDate function
  console.log(formatDate('2024-03-17')); // Output: 17th Mar, 2024

  // Update the expenseData with formatted date
  if (data && data.length > 0) {
    // Update the expenseData with formatted date
    data.forEach(item => {
      item.date = formatDate(item.date);
    });
  }

  // Check the updated expenseData with formatted dates

  console.log(selectedDate);

  const pieChartData =
    data && data.length > 0
      ? data.map((item, index) => ({
          value: item.amount,
          svg: {fill: expenseColors[index % expenseColors.length]}, // Use colors from the expenseColors array
          item: item,
          percentage: ((item.amount / totalBudget) * 100).toFixed(2),
          // Include the original item for reference
        }))
      : [];

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
            marginLeft: responsiveWidth(65),
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
    </View>
  );
  const handleRefresh = () => {
    // Set loading state to true to indicate refreshing
    setLoading(true);

    // Fetch the total spent amount and all expenses of the team
    fetchtotal();
    getAllExpensesOfTeam();
    getAllBudgetOfTeam();

    // After fetching, set loading state back to false
    setLoading(false);
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
            marginLeft: responsiveWidth(21),
          }}>
          <Text
            style={{
              fontFamily: 'Inter-Bold',
              fontWeight: '700',
              fontSize: responsiveFontSize(3),
              color: '#FFFFFF',
            }}>
            Expense Breakdown
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
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
          }>
          <View
            style={{
              width: responsiveWidth(90),
              marginLeft: responsiveWidth(5),
              backgroundColor: '#FFFFFF',
              paddingVertical: responsiveHeight(2),
              height: responsiveHeight(20),
              //width:responsiveWidth(90),
              borderRadius: responsiveWidth(2),
              elevation: 1,
              marginTop: responsiveHeight(2),
            }}>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                paddingVertical: responsiveHeight(2),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                //width:responsiveWidth(90),
              }}>
              <TouchableOpacity
                onPress={getPreviousMonth}
                style={{paddingHorizontal: 20}}>
                <View>
                  <Image
                    source={require('../../../images/iconleft.png')}
                    style={{
                      resizeMode: 'contain',
                      width: responsiveWidth(5),
                      height: responsiveHeight(2),
                    }}
                  />
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  color: '#312F33',
                  fontSize: responsiveFontSize(1.8),
                  fontFamily: 'Roboto-Medium',
                  fontWeight: '700',
                }}>
                {currentDate.toLocaleString('default', {
                  month: 'long',
                  year: 'numeric',
                })}
              </Text>
              <TouchableOpacity
                onPress={getNextMonth}
                style={{paddingHorizontal: 20}}>
                <View>
                  <Image
                    source={require('../../../images/iconright.png')}
                    style={{
                      resizeMode: 'contain',
                      width: responsiveWidth(5),
                      height: responsiveHeight(2),
                      marginTop: responsiveHeight(0.2),
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 20,
                paddingVertical: 1,
              }}
              style={{
                marginLeft: responsiveWidth(0.5),
                marginTop: responsiveHeight(-1),
                backgroundColor: '#fff',
                width: responsiveWidth(89),
              }}>
              {renderDates()}
            </ScrollView>
          </View>
          <View
            style={{
              width: responsiveWidth(90),
              backgroundColor: '#4ef',
              marginLeft: responsiveWidth(5),
              marginTop: responsiveHeight(1),
            }}>
            <ExpenseLineIndicator spent={totalSpent} budget={totalBudget} />
          </View>
          <View
            style={{
              backgroundColor: '#4e3',
              marginTop: responsiveHeight(5),
              width: responsiveWidth(90),
              height: responsiveHeight(30),
              marginLeft: responsiveWidth(5),
            }}>
            <View style={styles.Piecontainer}>
              <Text style={styles.title}>Analytics</Text>
              <PieChart
                style={{
                  height: responsiveHeight(20),
                  width: responsiveWidth(30),
                  marginTop: responsiveHeight(2),
                  marginLeft: responsiveWidth(-60),
                }}
                data={pieChartData}
                innerRadius={'85%'}>
                {pieChartData.map(
                  (item, index) =>
                    item.centroid && (
                      <Text
                        key={index}
                        x={item.centroid[0]}
                        y={item.centroid[1]}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={16}
                        fontWeight={'bold'}>
                        {item.item.name}
                      </Text>
                    ),
                )}
              </PieChart>
              <View style={{flex: 1, marginTop: responsiveHeight(-20)}}>
                <ScrollView>
                  <View
                    style={{
                      marginLeft: responsiveWidth(38),
                      marginBottom: responsiveHeight(1),
                      minHeight: responsiveHeight(40), // Ensure content exceeds available vertical space
                    }}>
                    <Text
                      style={{
                        color: '#737373',
                        fontWeight: '500',
                        fontFamily: 'Roboto-Medium',
                        fontSize: responsiveFontSize(1.2),
                      }}>
                      Expense Name {'\t\t\t\t\t\t\t'} $ {'\t\t\t\t\t\t\t'} %
                    </Text>
                    <View
                      style={{
                        height: responsiveHeight(0.1),
                        backgroundColor: '#D4D4D4',
                        width: responsiveWidth(52),
                        marginLeft: responsiveWidth(1),
                        marginTop: responsiveHeight(1),
                        marginBottom: responsiveHeight(1),
                      }}
                    />
                    {pieChartData.map((item, index) => (
                      <View
                        key={index}
                        style={{
                          width: responsiveWidth(80),
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginRight: responsiveWidth(2),
                          marginBottom: responsiveHeight(1),
                          marginLeft: responsiveWidth(35),
                        }}>
                        <View
                          style={{
                            width: responsiveWidth(2),
                            height: responsiveWidth(2),
                            backgroundColor:
                              expenseColors[index % expenseColors.length], // Use a specific color for each expense
                            borderRadius: responsiveWidth(2),
                            marginRight: responsiveWidth(1),
                            flexDirection: 'row',
                            marginLeft: responsiveWidth(-38),
                          }}
                        />
                        <Text
                          style={{
                            color: '#212121',
                            fontWeight: '400',
                            fontFamily: 'Roboto-Regular',
                            fontSize: responsiveFontSize(1.2),
                            flex: 1,
                          }}>
                          {item.item.expensename}:
                        </Text>
                        <Text
                          style={{
                            color: '#212121',
                            fontWeight: '400',
                            fontFamily: 'Roboto-Regular',
                            fontSize: responsiveFontSize(1.2),
                            flex: 1,
                            marginLeft: responsiveWidth(-46),
                          }}>
                          {' '}
                          ${item.item.amount}{' '}
                        </Text>
                        <Text
                          style={{
                            color: '#212121',
                            fontWeight: '400',
                            fontFamily: 'Roboto-Regular',
                            fontSize: responsiveFontSize(1.2),
                            flex: 1,
                            marginLeft: responsiveWidth(-55),
                          }}>
                          {item.percentage}%
                        </Text>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: responsiveWidth(90),
                marginLeft: responsiveWidth(4),
                marginTop: responsiveHeight(1),
                height: responsiveHeight(10),
              }}>
              <View>
                <Text
                  style={{
                    color: '#312F33',
                    fontFamily: 'Roboto-Medium',
                    fontWeight: '600',
                    fontSize: responsiveFontSize(2),
                  }}>
                  History
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#0B1E47',
                    width: responsiveWidth(35),
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: responsiveHeight(5),
                    borderRadius: responsiveWidth(3),
                  }}
                  onPress={() => navigation.navigate('AddExpense', team)}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Roboto-Regular',
                      fontWeight: '400',
                      fontSize: responsiveFontSize(1.5),
                      //marginTop:responsiveHeight(.6)
                    }}>
                    Add more Expense
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ExpenseHistory', team)}>
                  <Text
                    style={{
                      color: '#312F33',
                      fontFamily: 'Roboto-Regular',
                      fontWeight: '400',
                      fontSize: responsiveFontSize(1.5),
                      marginTop: responsiveHeight(0.6),
                    }}>
                    See all
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                marginTop: responsiveHeight(-4),
              }}>
              <FlatList
                data={data.slice(0, 2)}
                renderItem={renderItem}
                keyExtractor={item => item._id.toString()}
              />
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            //marginTop:responsiveHeight(8),
            marginBottom: responsiveHeight(-2),
          }}>
          <BottomTabNavigation />
        </View>
      </View>
    </View>
  );
};
export default ParentExpenseBreakdown;
const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(90),
    height: responsiveHeight(15),
    padding: 10,
    //marginLeft: responsiveWidth(1),
    backgroundColor: '#fff',
    //marginTop:responsiveHeight(1)
  },
  text: {
    marginBottom: 5,
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
    color: '#312F33',
    fontFamily: 'Roboto-Medium',
    width: responsiveWidth(40),
    lineHeight: 25,
  },
  indicatorContainer: {
    flexDirection: 'row',
    position: 'relative',
    width: responsiveWidth(80),
    marginLeft: responsiveWidth(-2),
    //backgroundColor:'',
    height: responsiveHeight(7),
    marginTop: responsiveHeight(2),
  },
  backgroundIndicator: {
    width: responsiveWidth(90),
    height: responsiveHeight(5),
    borderRadius: responsiveWidth(5),
    backgroundColor: '#F2F2F2',
    position: 'absolute',
    zIndex: -1,
  },
  indicator: {
    height: responsiveHeight(5),
    borderRadius: responsiveWidth(5),
    backgroundColor: '#0B1E47',
    position: 'absolute',
    //marginLeft:responsiveWidth(1)
    //width: responsiveWidth(0),
  },
  Piecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: responsiveWidth(95),
    height: responsiveHeight(30),
    marginLeft: responsiveWidth(-3),
    elevation: 1,
    borderRadius: responsiveWidth(2),
    //marginTop:responsiveHeight(-4)
  },
  title: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: '700',
    marginBottom: responsiveHeight(1),
    fontFamily: 'Roboto-Medium',
    color: '#312F33',
    marginTop: responsiveHeight(0.5),
  },
});
