import React, {useEffect} from 'react'; 
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../../navigation/Dashboard.navigation'
import { COLORS } from '../../globalStyles';
import { AntDesign, Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons';


export default function BottomTabs() {
  const Tab = createBottomTabNavigator(); 


  return (
    <Tab.Navigator 
    initialRouteName='Dashboard'
    tabBarOptions={{
      activeTintColor: COLORS.palegreen, 
      inactiveTintColor: COLORS.darkblue,
      style: {
        backgroundColor: COLORS.sage,
      }
    }}
  >
    <Tab.Screen
      name='Dashboard'
      component = {Dashboard}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo
              name='home'
              color={color}
              size={26}
            />
          ),
        }}
      />
    <Tab.Screen
      name='Post'
      component = {Dashboard}
      />


  </Tab.Navigator>
  ); 
}