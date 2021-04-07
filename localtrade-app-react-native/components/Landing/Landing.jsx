import React from 'react'
import { Button, Header, Text } from 'react-native-elements';
import { Platform, Alert, View, Image, ImageBackground, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import styles from './Landing.styles'

export default function Landing({ navigation }) {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
    <ImageBackground source={require('../../assets/veg.png')} style={styles.image}>
        <View style={styles.container}>
        <Image source={require('../../assets/LOGO.png')}
          style={styles.logo} 
        />
          {/* <Text style={styles.title}>LocalTrade</Text> */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttons} onPress={() => navigation.push('Login')}>
              <Text style={styles.buttontext}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons} onPress={() => navigation.push('Register')}>
              <Text style={styles.buttontext}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
    </ImageBackground>
   </KeyboardAvoidingView>
  )
}

