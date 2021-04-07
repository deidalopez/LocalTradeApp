import { StyleSheet } from 'react-native';
import { COLORS } from '../../globalStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttoncontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: '#fff',
    fontSize: 50,
    marginBottom:30,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center'
  },

  image: {
    // flex: 1,
    // resizeMode: 'cover', 
    width: '100%', 
    height: '100%',
    // opacity: 0.75
  },

  logo: {
    width: 250,
    height: 250
  },

  namelogocontainer: {
    width: 180,
    height: 55,
    justifyContent: 'center',
  },

  namelogo: {
    width: null,
    resizeMode: 'contain'
  },

  formcontainer: {
    marginTop: 10,
    alignItems: 'center'
  },

  input: {
    height: 40,
    width: 270,
    margin: 5,
    fontSize: 18,
    paddingLeft: 10,
    borderWidth: 2,
    borderRadius: 7,
    borderColor: COLORS.darkblue
  },

  buttons: {
    margin: 5,
    backgroundColor: COLORS.secondary,
    borderRadius: 7,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: 130
  },

  buttontext: {
    color: 'white',
    fontFamily: Platform.OS === 'ios' ? 'Avenir Next' : 'Roboto',
    fontSize: 18,
    fontWeight:'700'
  }
})