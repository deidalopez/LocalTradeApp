import React, { useContext } from 'react';
import { View, } from 'react-native';
import APIservice from './services/APIService';
import Dashboard from './Dashboard';
import { Input, Button } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { UserContext } from '../Context/Context';
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
      <View style={styles.container}>
        <Input
          placeholder='Email'
          name='email'
          value={user.email}
          onChangeText={(email) => setUser({ ...user, email: email })}
        />
        <Input
          placeholder='Password'
          secureTextEntry={true}
          name='password'
          value={user.password}
          onChangeText={(password) => setUser({ ...user, password: password })}
        />

        <Button
          onPress={onLogIn}
          title="Sign in"
        />
        <Button title='Back home' onPress={() => navigation.navigate('Landing')} />
      </View>
    );
  } else {
    return (
      <Dashboard user={user} navigation={navigation}
      />
    );
  }
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
