import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import Feed from '../components/Feed/Feed';
import { COLORS } from '../globalStyles';
import MyProfile from '../components/MyProfile/MyProfile';
import Post from '../components/Post/Post';
import { Image } from 'react-native';


const DashboardStack = createStackNavigator();

function LogoTitle() {
  return (
    <Image
      source={require('../assets/LOCALTRADEtext.png')}
      style={{ width: 350, height: 200 }}
      resizeMode='contain'
    />
  );
}
export default () => (

  <DashboardStack.Navigator
    initialRouteName='Dashboard'
    screenOptions={{
      headerTitle: props => <LogoTitle {...props} />, 
      headerTitleStyle: { padding: 0, flex: 1, textAlign: 'center' },
      headerStyle: {
        backgroundColor: COLORS.green,
      },
    }}
  >
    <DashboardStack.Screen name='Dashboard' component={Dashboard} />
    {/* <DashboardStack.Screen name='Dashboard' component={Dashboard} options={{ headerTitle: props => <LogoTitle {...props} /> , headerTitleStyle: { padding: 0, flex: 1, textAlign: 'center' }}} /> */}
    <DashboardStack.Screen name='Feed' component={Feed} />
    <DashboardStack.Screen name='MyProfile' component={MyProfile} />
    <DashboardStack.Screen name='Post' component={Post} />
  </DashboardStack.Navigator>
);

