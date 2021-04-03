import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Dashboard from '../screens/Dashboard/Dashboard';
import Feed from '../components/Feed/Feed';
import { COLORS } from '../globalStyles';
import MyProfile from '../components/MyProfile/MyProfile';
import Post from '../components/Post/Post';

const DashboardStack = createStackNavigator();

export default () => (
  <DashboardStack.Navigator
    initialRouteName='Dashboard'
    screenOptions={{
      // setting headerTitle to empty string to not display anything
      headerTitle: '',
      headerStyle: {
        backgroundColor: COLORS.darkblue,
      },
    }}
  >
    <DashboardStack.Screen name='Dashboard' component={Dashboard} />
    <DashboardStack.Screen name='Feed' component={Feed} />
    <DashboardStack.Screen name='MyProfile' component={MyProfile} />
    <DashboardStack.Screen name='Post' component={Post} />
  </DashboardStack.Navigator>
);