import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react';
import { Card } from 'react-native-elements';
import APIservice from '../services/APIService';


const myprofile = ({ route }) => {
  const [currentUser, setCurrentUser] = useState({ firstName: '', lastName: '', email: '' })

  const {idOfUser} = route.params
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
      <Card key={currentUser.email}>
        <Card.Title>User Info</Card.Title>
        <Card.Divider />
        <Text>Name: {currentUser.firstName} {currentUser.lastName}</Text>
        <Card.Divider />
        <Text>Email: {currentUser.email}</Text>
      </Card>
    )
  }

  return (
    <View>
      {renderPage()}
    </View>
  )
}

export default myprofile
