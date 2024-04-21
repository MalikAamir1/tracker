/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './src/screens/Splash';
import StackNavigation from './src/Navigation/StacNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthProvider, useAuth} from './src/context/authContext';
import LogIn from './src/screens/LogIn';
import SignUp from './src/screens/SignUp';
import ForgotPassword from './src/screens/ForgotPassword';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash1 from './src/screens/Splash1';

const Stack = createNativeStackNavigator();

const App = () => {
  let token = useRef(null);
  const {user, login} = useAuth();

  useEffect(() => {
    async function getData() {
      const userInfo = await AsyncStorage.getItem('userInfo');
      if (userInfo !== null) {
        const data = JSON.parse(userInfo);
        token.current = data?.token;
        login(data);
      }
    }
    getData();
  }, []);

  const AuthStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'none',
        gestureEnabled: false,
      }}>
      <Stack.Screen
        name="LogIn"
        component={LogIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <NavigationContainer>
        {user ? (
          <StackNavigation
            initialScreen={
              user.role === 'admin'
                ? 'Home'
                : user.role === 'user'
                ? 'ParentHome'
                : null
            }
          />
        ) : (
          <AuthStack />
        )}
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    margin: 10,
  },
});

export default App;
