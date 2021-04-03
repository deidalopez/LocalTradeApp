import React, { useContext } from 'react';
import APIservice from '../services/APIService';
import Dashboard from '../Dashboard/Dashboard';
import { Input, Button } from 'react-native-elements';
import { Platform, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import styles from './Login.styles';
import { UserContext } from '../../context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState = {
  email: '',
  password: '',
};

const Login = ({ navigation }) => {
  const { user, setUser, isAuth, setIsAuth } = useContext(UserContext);
  console.log('user ' + user);
  const onLogIn = async () => {
    const { email, password } = user;
    const input = { email, password };
    const res = await APIservice.login(input);
    if (res.error) {
      alert('wrong email or password');
      setUser(initialState);
      setIsAuth(false);
    } else {
      const { accessToken } = res;
      AsyncStorage.setItem = ('accessToken', accessToken.toString());
      setIsAuth(true);
    }
  };
  if (!isAuth) {
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container} >
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Email'
            name='email'
            value={user.email}
            style={styles.input}
            onChangeText={(email) => setUser({ ...user, email: email })}
          />
          <TextInput
            placeholder='Password'
            secureTextEntry={true}
            name='password'
            value={user.password} 
            style={styles.input}
            onChangeText={(password) => setUser({ ...user, password: password })}
          />

      
          <TouchableOpacity onPress={onLogIn} style={styles.buttons}>
            <Text style={styles.buttontext}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Landing')} style={styles.buttons}>
            <Text style={styles.buttontext}>Back</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  } else {
    return (
      <Dashboard user={user} navigation={navigation}
      />
    );
  }
};

export default Login;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });
