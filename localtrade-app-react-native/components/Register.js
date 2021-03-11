import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import APIservice from './services/APIService';
import Dashboard from './Dashboard';
import { Input, Button } from 'react-native-elements';
import { UserContext } from '../Context/Context'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
      <View style={styles.container}>
        <Input
          placeholder='First Name'
          name='firstName'
          value={user.firstName}
          onChangeText={(firstName) => setUser({ ...user, firstName: firstName })}
        />
        <Input
          placeholder='Last Name'
          name='lastName'
          value={user.lastName}
          onChangeText={(lastName) => setUser({ ...user, lastName: lastName })}
        />
        <Input
          placeholder='Email'
          name='email'
          value={user.email}
          onChangeText={(Email) => setUser({ ...user, email: Email })}
        />
        <Input
          placeholder='Password'
          secureTextEntry={true}
          name='password'
          value={user.password}
          onChangeText={(Password) => setUser({ ...user, password: Password })}
        />
        <Button
          onPress={onSignUp}
          title="Sign Up"
        />
        <Button title='Back home' onPress={() => navigation.navigate('Landing')} />
      </View>
    )
  } else {
    return (
      <Dashboard user={user} navigation={navigation}
      />
    )
  }
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
})
