import React, {useEffect, useContext} from 'react'; 
import {UserContext} from '../../context/Context'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashboardNavigator from '../../navigation/DashboardNavigator'
import MyProfileNavigation from '../../navigation/MyProfileNavigation'
import PostNavigation from '../../navigation/PostNavigation'
import Feed from '../Feed/Feed'
import MyProfile from '../MyProfile/MyProfile'
import Post from '../Post/Post'
import { COLORS } from '../../globalStyles';
import { Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import FeedNavigation from '../../navigation/FeedNavigation';


export default function BottomTabs() {
  const Tab = createBottomTabNavigator(); 
  const { idOfUser } = useContext(UserContext)


  return (
    <Tab.Navigator 
    initialRouteName='Dashboard'
    tabBarOptions={{
      activeTintColor: COLORS.background, 
      inactiveTintColor: COLORS.lighYellow,
      style: {
        backgroundColor: COLORS.green,
      }
    }}
    >
    <Tab.Screen
      name='Dashboard'
        component={DashboardNavigator}
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
      name='My Feed'
        component={FeedNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name='dynamic-feed'
              color={color}
              size={26}
            />
          ),
        }}
      />
    <Tab.Screen
        name='New Post'
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name='post-add'
              color={color}
              size={26}
            />
          ),
        }}
      >
        {() => <PostNavigation idOfUser={idOfUser} />}
      </Tab.Screen>
    <Tab.Screen
        name='My Page'
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name='user-circle'
              color={color}
              size={26}
            />
          ),
        }}
      >
        {() => <MyProfileNavigation idOfUser={idOfUser}/>}
      </Tab.Screen>


  </Tab.Navigator>
  ); 
}