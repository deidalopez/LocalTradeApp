import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { UserContext } from '../../context/Context'
import APIservice from '../services/APIService';
import AsyncStorage from '@react-native-async-storage/async-storage'
import LandingPage from '../Landing/LandingPage';
import styles from './Dashboard.styles'

const Dashboard = ({ navigation, accessToken }) => {
  const initialState = {
    email: '',
    password: '',
  };

  const { user, setUser, setIdOfUser, idOfUser, isAuth, setIsAuth } = useContext(UserContext)
  const [name, setName] = useState('');

  useEffect(() => {
    getInfo(user.email);
  }, [])

  const getInfo = async (email) => {
    const res = await APIservice.getUserByEmail(email);
    console.log(email)
    if (res.error) {
      alert('problem getting user info');
    } else {
      const { firstName, id } = res;
      console.log('userId', id)
      setName(firstName);
      setIdOfUser(id);
    };
  };

  const signout = () => {
    setIsAuth(false);
    AsyncStorage.removeItem(accessToken, () => { console.log('signed out') });
    setUser(initialState);
    setIdOfUser(0);
  }

  if (isAuth) {
    return (
      <View style={[styles.container]}  >
        <Text style={[styles.welcomeMessage]}>Welcome, {name}</Text>
        <TouchableOpacity onPress={() => navigation.push('Feed')} style={styles.buttons}>
          <Text style={styles.buttontext}>See local offers</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Post', { idOfUser: idOfUser })} style={styles.buttons}>
          <Text style={styles.buttontext}>New post</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile', { idOfUser: idOfUser })} style={styles.buttons}>
          <Text style={styles.buttontext}>My profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => signout()} style={styles.buttons}>
          <Text style={styles.buttontext}>Sign out</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    <LandingPage />
  }
};

export default Dashboard;

