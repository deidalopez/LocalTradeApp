import React, { useContext, useState } from 'react';
import APIservice from '../services/APIService';
import Dashboard from '../Dashboard/Dashboard';
import { Platform, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
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
  const { setUser, setIsAuth } = useContext(UserContext)
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    location: null
  });


  const onSignUp = async () => {
    const { firstName, lastName, email, password } = registerForm;
    console.log(firstName)
    console.log(email)
    setUser(registerForm);
    const input = { firstName, lastName, email, password };
    const res = await APIservice.register(input);
    console.log(res)
    if (res.error) {
      alert(`${res.message}`);
      setUser(initialState)
    } else {
      const { accessToken } = res;
      const stringedToken = JSON.stringify(accessToken)
      await AsyncStorage.setItem('accessToken', stringedToken)
      setIsAuth(true)
    }
  }
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.container}>
        <View>
          <Image source={require('../../assets/LetsGetStarted.png')}
            style={styles.logo}
          />
        </View>
        <TextInput
          placeholder='First Name'
          name='firstName'
          // value={user.firstName}
          style={styles.input}
          onChangeText={(firstName) => setRegisterForm({ ...registerForm, firstName: firstName })}
        />
        <TextInput
          placeholder='Last Name'
          name='lastName'
          // value={user.lastName}
          style={styles.input}
          onChangeText={(lastName) => setRegisterForm({ ...registerForm, lastName: lastName })}
        />
        <TextInput
          placeholder='Email'
          name='email'
          // value={user.email}
          style={styles.input}
          onChangeText={(Email) => setRegisterForm({ ...registerForm, email: Email })}
        />
        <TextInput
          placeholder='Password'
          secureTextEntry={true}
          name='password'
          // value={user.password}
          style={styles.input}
          onChangeText={(Password) => setRegisterForm({ ...registerForm, password: Password })}
        />

        <TouchableOpacity onPress={onSignUp} style={styles.buttons}>
          <Text style={styles.buttontext}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Register;
