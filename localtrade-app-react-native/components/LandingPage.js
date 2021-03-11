import React from 'react'
import { View } from 'react-native';
import { Button, Header, Text } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { ImageBackground } from 'react-native';

export default function LandingPage({ navigation }) {
  return (
    <ImageBackground source={require('../assets/veg.png')} style={{ width: '100%', height: '100%' }}>
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
          style={styles.header}
        />
        <Text h1 style={styles.title}>
      LocalTrade</Text>
        <Button
          title='Register'
          style={styles.buttons}
          onPress={() => navigation.navigate('Register')} />
        <Button type="outline" raised
          title='Login'
          onPress={() => navigation.navigate('Login')} />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#f8faf0',
    fontSize: 30,
    fontWeight: 'bold',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'

  },
  image: {
    flex: 1,
    resizeMode: 'cover'
  }
})
