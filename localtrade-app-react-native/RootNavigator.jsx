import React, { useContext} from 'react';
import { StyleSheet,  View, Image, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import BottomTabs from './components/BottomTabs/BottomTabs';
import { COLORS } from './globalStyles';
import {UserContext} from './context/Context';

export default function RootNavigator() {
  const AuthStack = createStackNavigator();

  const {isAuth} = useContext(UserContext);

  const AuthStackScreen = () => (
    <AuthStack.Navigator
      initialRouteName='Landing'
      screenOptions={{
        headerTitle: '',
        headerStyle: {
          backgroundColor: COLORS.green,
        },
      }}
    >
      <AuthStack.Screen name='Landing' component={Landing} 
        screenOptions={{
          headerShown: false
        }}/>
      <AuthStack.Screen name='Login' component={Login} />
      <AuthStack.Screen name='Register' component={Register} />
    </AuthStack.Navigator>
  );

  return (
    <NavigationContainer>
      {isAuth ? (
          <BottomTabs />
      ) : (
        <AuthStackScreen />
      )}
    </NavigationContainer>
  );
}