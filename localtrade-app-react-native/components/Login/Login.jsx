import React, { useContext, useState } from 'react';
import APIservice from '../services/APIService';
// import Dashboard from '../Dashboard/Dashboard';
// import { Input, Button } from 'react-native-elements';
import { Platform, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import styles from './Login.styles';
import { UserContext } from '../../context/Context';
// import {AsyncStorage} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

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

  // const storeInStorage = async (value) => {
  //   try {
  //     await AsyncStorage.setItem('@storage_Key', value)
  //   } catch (err) {
  //     console.log({ "error": err })
  //   }
  // }

  const onLogIn = async () => {
    console.log('onlogin')
    const { email, password } = loginForm;
    setUser(loginForm);
    const input = { email, password };
    console.log(input.email)
    const res = await APIservice.login(input);
    if (res.error) {
      alert('wrong email or password');
      setUser(initialState);
      setIsAuth(false);
    } else {
      console.log('loggedin')
      const { accessToken } = res;
      const stringedToken = JSON.stringify(accessToken)
      await AsyncStorage.setItem('accessToken', stringedToken)
      setIsAuth(true);
    }
  };


  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container} >
      <View >

        <Image source={require('../../assets/WelcomeBack.png')}
          style={styles.logo}
        />
      </View>
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
        {/* <TouchableOpacity onPress={() => navigation.navigate('Landing')} style={styles.buttons}>
            <Text style={styles.buttontext}>Back</Text>
          </TouchableOpacity> */}
      </View>
    </KeyboardAvoidingView>
  );
}
// if (!isAuth) {
//   return (
//     <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container} >
//     <View>
//       <Text style={styles.title}>Welcome back!</Text>
//     </View>
//       <View style={styles.inputContainer}>
//         <TextInput
//           placeholder='Email'
//           name='email'
//           value={user.email}
//           style={styles.input}
//           onChangeText={(email) => setUser({ ...user, email: email })}
//         />
//         <TextInput
//           placeholder='Password'
//           secureTextEntry={true}
//           name='password'
//           value={user.password} 
//           style={styles.input}
//           onChangeText={(password) => setUser({ ...user, password: password })}
//         />


//         <TouchableOpacity onPress={onLogIn} style={styles.buttons}>
//           <Text style={styles.buttontext}>Sign in</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('Landing')} style={styles.buttons}>
//           <Text style={styles.buttontext}>Back</Text>
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// } else {
//   return (
//     <Dashboard user={user} navigation={navigation} accessToken={accessTkn}
//     />
//   );
// }

export default Login;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });
