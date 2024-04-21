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
  KeyboardAvoidingView,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Input} from '../../Components/CustomInput';
import {Button, CancelButton} from '../../Components/Custombtn';
import {localhostUrl} from '../../../Ip';

const AddExpense = ({route, navigation}) => {
  useEffect(() => {
    const team = route.params; // Replace 'your_team_id' with the actual team ID
    setTeam(team._id);

    //getAllExpensesOfTeam(teamId);
  }, []);
  const [expensename, setExpenseName] = useState('');
  const [amount, setAmount] = useState('');
  const [expenseBudget, setExpenseBudget] = useState('');
  const [description, setDescription] = useState('');
  const [team, setTeam] = useState({});

  // const handleSubmit = async () => {
  //     if (!expensename || !amount|| !description) {
  //         Alert.alert('Error', 'Please enter all values');
  //         return;
  //       }
  //     try {
  //         const response = await fetch(`${localhostUrl}expense/create`, {
  //             method: 'POST',
  //             headers: {
  //                 'Content-Type': 'application/json',
  //                 // You may need to include additional headers here, such as authorization headers
  //             },
  //             body: JSON.stringify({
  //                 team:team,
  //                 expensename: expensename,
  //                 amount: amount,
  //                 description: description,
  //             }),
  //         });

  //         if (!response.ok) {
  //             // Handle the case where the request was not successful
  //             throw new Error('Network response was not ok');
  //         }

  //         const data = await response.json();
  //         Alert.alert('Registered!', 'Team Created Successfully');
  //         navigation.navigate('Home')
  //         setCode(''),
  //         setSportType('')
  //         setTeamName('')
  //         console.log('Team created:', data);
  //         // Handle successful response here, such as showing a success message or navigating to another screen
  //     } catch (error) {
  //         console.error('Error:', error);
  //         // Handle any errors that occurred during the fetch
  //     }
  // };

  const createExpense = async teamId => {
    console.log('====================================');
    console.log('TEAM', team);
    console.log('====================================');
    try {
      const response = await fetch(`${localhostUrl}expense/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          expensename: expensename,
          amount: amount,
          description: description,
          team: team,
          budget: expenseBudget,
        }),
      });

      if (!response.ok) {
        const data = await response.json();

        Alert.alert('Sorry', data.error);
        throw new Error(data.error);
      }

      const expense = await response.json();
      Alert.alert('Added', 'Expense Added Successsful');
      navigation.navigate('ExpenseBreakdown');
      return expense;
    } catch (error) {
      console.error('Error creating expense:', error);
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
      <StatusBar
        backgroundColor="#0B1E47" // Set the background color to purple
        barStyle="light-content" // Set the text color to white
      />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View
            style={{
              backgroundColor: '#0B1E47',
              width: responsiveWidth(100),
              height: responsiveHeight(45),
            }}>
            <View
              style={{
                justifyContent: 'center',
                backgroundColor: 'transparent',
                width: responsiveWidth(10),
                alignItems: 'center',
                height: responsiveHeight(10),
                marginTop: responsiveHeight(1),
                marginLeft: responsiveWidth(44),
              }}>
              <Image
                source={require('../../../images/splashicon.png')}
                style={{
                  resizeMode: 'contain',
                  width: responsiveWidth(30),
                  height: responsiveHeight(25),
                }}
              />
            </View>
            <View
              style={{
                marginLeft: responsiveWidth(5),
                marginTop: responsiveHeight(-1),
                marginLeft: responsiveWidth(28),
              }}>
              <Text
                style={{
                  fontFamily: 'Inter-Bold',
                  fontWeight: '700',
                  fontSize: responsiveFontSize(3),
                  color: '#FFFFFF',
                }}>
                Add Expense
              </Text>
            </View>
            <View
              style={{
                marginLeft: responsiveWidth(23),
                marginTop: responsiveHeight(1),
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
                Simplify team registration for managers
              </Text>
            </View>
          </View>
          <View
            style={{
              width: responsiveWidth(100),
              height: responsiveHeight(100),
              borderTopLeftRadius: responsiveWidth(5),
              borderTopRightRadius: responsiveWidth(5),
              marginTop: responsiveHeight(-21),
              backgroundColor: '#fff',
            }}>
            <View
              style={{
                marginTop: responsiveHeight(6),
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
                  Expense Name
                </Text>
              </View>
              <View
                style={{
                  marginTop: responsiveHeight(2),
                }}>
                <Input
                  value={expensename}
                  setValue={setExpenseName}
                  placeholder="Enter Expense"
                  keyboardType="email-address"
                  maxLength={50}
                />
              </View>
            </View>
            <View
              style={{
                marginTop: responsiveHeight(-0.5),
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
                  marginTop: responsiveHeight(2),
                }}>
                <Input
                  value={amount}
                  setValue={setAmount}
                  placeholder="Enter Amount"
                  keyboardType="numeric"
                  maxLength={50}
                />
              </View>
            </View>

            <View
              style={{
                marginTop: responsiveHeight(-0.5),
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
                  Description
                </Text>
              </View>
              <View
                style={{
                  marginTop: responsiveHeight(1),
                  height: responsiveHeight(15),
                }}>
                <Input
                  value={description}
                  setValue={setDescription}
                  placeholder="Enter Descrioption"
                  keyboardType="email-address"
                  maxLength={50}
                />
              </View>
            </View>
            <View
              style={{
                marginTop: responsiveHeight(-2),
              }}>
              <Button text={'Save'} onPress={createExpense} />
            </View>
            <View
              style={{
                marginTop: responsiveHeight(3),
              }}>
              <CancelButton
                text={'Cancel'}
                onPress={() => navigation.navigate('Home')}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
export default AddExpense;
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
