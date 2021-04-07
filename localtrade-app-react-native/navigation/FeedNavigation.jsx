import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
// import Dashboard from '../screens/Dashboard/Dashboard';
import Feed from '../components/Feed/Feed';
import { COLORS } from '../globalStyles';
import OtherProfile from '../components/Feed/OtherProfile';
import { Image } from 'react-native';

const FeedStack = createStackNavigator();

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
  <FeedStack.Navigator
    initialRouteName='Feed'
    screenOptions={{
      headerTitle: props => <LogoTitle {...props} />,
      headerTitleStyle: { padding: 0, flex: 1, textAlign: 'center' },
      headerStyle: {
        backgroundColor: COLORS.green,
      },
    }}
  >
    <FeedStack.Screen name='Feed' component={Feed} />
    <FeedStack.Screen name='OtherProfile' component={OtherProfile}/>
  </FeedStack.Navigator>
);