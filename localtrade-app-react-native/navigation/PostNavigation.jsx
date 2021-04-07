import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
// import Dashboard from '../screens/Dashboard/Dashboard';
import Post from '../components/Post/Post';
import { COLORS } from '../globalStyles';
import { Image } from 'react-native';

const PostStack = createStackNavigator();

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
  <PostStack.Navigator
    initialRouteName='Feed'
    screenOptions={{
      headerTitle: props => <LogoTitle {...props} />,
      headerTitleStyle: { padding: 0, flex: 1, textAlign: 'center' },
      headerStyle: {
        backgroundColor: COLORS.green,
      },
    }}
  >
    <PostStack.Screen name='Post' component={Post} />
  </PostStack.Navigator>
);