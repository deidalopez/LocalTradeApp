import React, { useContext } from 'react';
import APIservice from '../services/APIService';
import Dashboard from '../Dashboard/Dashboard';
import { Platform, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { UserContext } from '../../context/Context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from './Register.style'
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  location: null
};

const Register = ({ navigation }) => {
  const { user, setUser, isAuth, setIsAuth } = useContext(UserContext)

  const onSignUp = async () => {
    const { firstName, lastName, email, password } = user;
    const inputuser = { firstName, lastName, email, password };
    const res = await APIservice.register(inputuser);
    if (res.error) {
      alert(`${res.message}`);
      setUser(initialState)
    } else {
      const { accessToken } = res;
      AsyncStorage.setItem = ('accessToken', accessToken.toString());
      setIsAuth(true)
    }
  }

  if (!isAuth) {
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>

        <View style={styles.container}>
          <TextInput
            placeholder='First Name'
            name='firstName'
            value={user.firstName}
            style={styles.input}
            onChangeText={(firstName) => setUser({ ...user, firstName: firstName })}
          />
          <TextInput
            placeholder='Last Name'
            name='lastName'
            value={user.lastName}
            style={styles.input}
            onChangeText={(lastName) => setUser({ ...user, lastName: lastName })}
          />
          <TextInput
            placeholder='Email'
            name='email'
            value={user.email}
            style={styles.input}
            onChangeText={(Email) => setUser({ ...user, email: Email })}
          />
          <TextInput
            placeholder='Password'
            secureTextEntry={true}
            name='password'
            value={user.password}
            style={styles.input}
            onChangeText={(Password) => setUser({ ...user, password: Password })}
          />

          <TouchableOpacity onPress={onSignUp} style={styles.buttons}>
            <Text style={styles.buttontext}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Landing')} style={styles.buttons} >
            <Text style={styles.buttontext}>Back</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  } else {
    return (
      <Dashboard user={user} navigation={navigation}
      />
    )
  }
}

export default Register;
