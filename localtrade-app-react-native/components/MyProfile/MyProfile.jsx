import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/Context';
import { Card } from 'react-native-elements';
import APIservice from '../services/APIService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './MyProfile.styles';

const MyProfile = ({ route }) => {
  const [currentUser, setCurrentUser] = useState({ firstName: '', lastName: '', email: '' })
  const { setIsAuth, setUser, setIdOfUser, idOfUser } = useContext(UserContext)
  const initialState = {
    email: '',
    password: '',
  };

  // const {idOfUser} = route.params
  useEffect(() => {
    console.log(idOfUser)
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    const res = await APIservice.getUserById(idOfUser);
    console.log(idOfUser);
    if (res.error) {
      alert('problem getting user info');
    } else {
      const { firstName, lastName, email } = res;
      setCurrentUser({
        ...currentUser,
        firstName: firstName,
        lastName: lastName,
        email: email
      })
    };
  }
  const renderPage = () => {
    return (
      <Card key={currentUser.email} wrapperStyle={styles.infoCard}>
        <Card.Title style={styles.cardTitle}>My Info</Card.Title>
        <Card.Divider />
        <Text style={styles.cardText}>Name: {currentUser.firstName} {currentUser.lastName}</Text>
        <Card.Divider />
        <Text style={styles.cardText}>Email: {currentUser.email}</Text>
      </Card>
    )
  }

  const signOut = async () => {
    setIsAuth(false);
    try {
      await AsyncStorage.removeItem('accessToken');
    } catch (error) {
      console.log(error)
    }
    setUser(initialState);
    setIdOfUser(null);
  }

  // const editUser = async () => {
    
  // }

  return (
    <View style={styles.container}>
      {renderPage()}
      <TouchableOpacity onPress={() => signOut()} style={styles.buttons}>
        <Text style={styles.buttontext}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => signOut()} style={styles.buttons}>
        <Text style={styles.buttontext}>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MyProfile;
