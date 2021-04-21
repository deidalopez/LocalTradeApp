import React, { useContext, useState } from 'react';
import APIservice from '../services/APIService';
import { Platform, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import styles from './Login.styles';
import { UserContext } from '../../context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Animatable from 'react-native-animatable';

const initialState = {
  email: '',
  password: '',
};

const Login = ({ navigation }) => {
  const { setUser, setIsAuth } = useContext(UserContext);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const onLogIn = async () => {
    const { email, password } = loginForm;
    setUser(loginForm);
    const input = { email, password };
    const res = await APIservice.login(input);
    if (res.error) {
      alert('wrong email or password');
      setUser(initialState);
      setIsAuth(false);
    } else {
      const { accessToken } = res;
      const stringedToken = JSON.stringify(accessToken)
      await AsyncStorage.setItem('accessToken', stringedToken)
      setIsAuth(true);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container} >
      <Animatable.View
        animation="fadeInDown">
        <Image source={require('../../assets/WelcomeBack.png')}
          style={styles.logo}
        />
      </Animatable.View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email'
          name='email'
          style={styles.input}
          onChangeText={text => setLoginForm({ ...loginForm, email: text })}
        />
        <TextInput
          placeholder='Password'
          secureTextEntry={true}
          name='password'
          style={styles.input}
          onChangeText={text => setLoginForm({ ...loginForm, password: text })}
        />
        <TouchableOpacity onPress={onLogIn} style={styles.buttons}>
          <Text style={styles.buttontext}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
export default Login;