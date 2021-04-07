import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MyProfile from '../components/MyProfile/MyProfile';
import { COLORS } from '../globalStyles';
import { Image } from 'react-native';

const MyProfileStack = createStackNavigator();

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
  <MyProfileStack.Navigator
    initialRouteName='Feed'
    screenOptions={{
      headerTitle: props => <LogoTitle {...props} />,
      headerTitleStyle: { padding: 0, flex: 1, textAlign: 'center' },
      headerStyle: {
        backgroundColor: COLORS.green,
      },
    }}
  >
    <MyProfileStack.Screen name='MyProfile' component={MyProfile} />
  </MyProfileStack.Navigator>
);