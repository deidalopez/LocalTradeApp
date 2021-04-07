import { StyleSheet } from 'react-native';
import { COLORS } from '../../globalStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputContainer: {
    marginTop: 10,
    alignItems: 'center',
  },

  buttoncontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: COLORS.green,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom:20,
    alignItems: 'center',
    justifyContent: 'center'
  },

  logo: {
    width: 500,
    height: 120
  },

  input: {
    height: 40,
    width: 270,
    margin: 5,
    fontSize: 18,
    paddingLeft: 10,
    borderWidth: 2,
    borderRadius: 7,
    backgroundColor: '#fff',
    borderColor: COLORS.gray
  },

  buttons: {
    margin: 5,
    backgroundColor: COLORS.redbrown,
    borderRadius: 7,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150
  },

  buttontext: {
    color: 'white',
    fontFamily: Platform.OS === 'ios' ? 'Avenir Next' : 'Roboto',
    fontSize: 20,
  }
})