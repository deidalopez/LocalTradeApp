import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { UserContext } from '../Context/Context'
import APIservice from './services/APIService';
import AsyncStorage from '@react-native-async-storage/async-storage'
import LandingPage from './LandingPage';

const Dashboard = ({  navigation, accessToken }) => {
  const initialState = {
    email: '',
    password: '',
  };

  const { user, setUser, setIdOfUser, idOfUser, isAuth, setIsAuth } = useContext(UserContext)

  const [name, setName] = useState('');


  useEffect(() => {
    getInfo(user.email)
  }, [])


  //get user id by the provided email
  const getInfo = async (email) => {
    const res = await APIservice.getUserByEmail(email);
    if (res.error) {
      alert('problem getting user info');
    } else {
      const { firstName, id } = res;
      setName(firstName);
      setIdOfUser(id)
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
      <View style={[styles.screenContainer]}  >

        <Text style={[styles.welcomeMessage]}>Welcome, {name}</Text>
        <Button
          buttonStyle={[styles.buttonsContainer]}
          title='See local offers'
          onPress={() => navigation.navigate('Feed')}
        />
        <Button
          buttonStyle={[styles.buttonsContainer]}
          title='New post'
          navigation={navigation}
          // currentUser={currentUser}
          onPress={() => navigation.navigate('Post')}
        />
        <Button
          buttonStyle={[styles.buttonsContainer]}
          title='My profile'
          navigation={navigation}
          onPress={() => navigation.push('Profile', { user_id: idOfUser })}
        />
        <Button
          buttonStyle={[styles.buttonsContainer]}
          title='Sign out'
          onPress={() => signout()}
        />
      </View>
    );
  } else {
    <LandingPage />
  }
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16
  },
  welcomeMessage: {
    fontSize: 40,
    paddingBottom: 150,
    paddingLeft: 15,
  },
  buttonsContainer: {
    paddingVertical: 10,
    marginHorizontal: 15,
    paddingHorizontal: 12
  }
})

export default Dashboard;

