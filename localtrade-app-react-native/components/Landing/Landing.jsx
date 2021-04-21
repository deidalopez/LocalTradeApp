import React from 'react'
import { Text } from 'react-native-elements';
import { Platform, View, ImageBackground, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import * as Animatable from 'react-native-animatable';

import styles from './Landing.styles'

export default function Landing({ navigation }) {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
    <ImageBackground source={require('../../assets/veg.png')} style={styles.image}>
        <View style={styles.container}>
          <Animatable.Image animation="bounceIn" source={require('../../assets/LOGO.png')}
          style={styles.logo} 
        />
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

