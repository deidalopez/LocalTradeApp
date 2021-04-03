import React from 'react'
import { Button, Header, Text } from 'react-native-elements';
import { ImageBackground, Touchable } from 'react-native';
import { Platform, Alert, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import styles from './Landing.styles'

export default function LandingPage({ navigation }) {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
      <ImageBackground source={require('../../assets/veg.png')} style={styles.image}>
        <View style={styles.container}>
          <Text style={styles.title}>LocalTrade</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.buttontext}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.buttontext}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

