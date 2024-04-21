/* eslint-disable prettier/prettier */
import React from 'react';
//import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import LogIn from '../screens/LogIn';
import ForgotPassword from '../screens/ForgotPassword';
import SignUp from '../screens/SignUp';
import Home from '../screens/UserPanel/Home';
import AddTeam from '../screens/UserPanel/AddTeam';
import ViewTeam from '../screens/UserPanel/ViewTeam';
import AddPlayer from '../screens/UserPanel/AddPlayer';
import ExpenseBreakdown from '../screens/UserPanel/ExpenseBreakdown';
import ExpenseHistory from '../screens/UserPanel/ExpenseHiistory';
import Chat from '../screens/UserPanel/Chat';
import Contribution from '../screens/UserPanel/Contributing';
import AddContribution from '../screens/UserPanel/AddContribution';
import TeamDetail from '../screens/UserPanel/TeamDetail';
import Setting from '../screens/UserPanel/Setting';
import JoinTeam from '../screens/ParentPanel/JoinTeam';
import TeamJoin from '../screens/ParentPanel/TeamJoin';
import ParentHome from '../screens/ParentPanel/ParentHome';
import Breakdown from '../screens/ParentPanel/BreakDown';
import ParentSetting from '../screens/ParentPanel/ParentSetting';
import AddExpense from '../screens/UserPanel/AddExpense';
import PlayerDetails from '../screens/ParentPanel/PlayerDetails';
import HistoryOfExpenses from '../screens/ParentPanel/HistoryOfExpenses';
import ParentExpenseBreakdown from '../screens/ParentPanel/ParentExpenseBreakdown';

const Stack = createNativeStackNavigator();

const StackNavigation = ({initialScreen}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Stack.Navigator
        initialRouteName={initialScreen}
        screenOptions={{
          headerShown: false,
          animation: 'none',
          gestureEnabled: false,
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddTeam"
          component={AddTeam}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewTeam"
          component={ViewTeam}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddPlayer"
          component={AddPlayer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ExpenseBreakdown"
          component={ExpenseBreakdown}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ParentExpenseBreakdown"
          component={ParentExpenseBreakdown}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ExpenseHistory"
          component={ExpenseHistory}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Contribution"
          component={Contribution}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddContribution"
          component={AddContribution}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TeamDetail"
          component={TeamDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Setting"
          component={Setting}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="JoinTeam"
          component={JoinTeam}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TeamJoin"
          component={TeamJoin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ParentHome"
          component={ParentHome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BreakDown"
          component={Breakdown}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ParentSetting"
          component={ParentSetting}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddExpense"
          component={AddExpense}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PlayerDetails"
          component={PlayerDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HistoryOfExpenses"
          component={HistoryOfExpenses}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};
export default StackNavigation;
