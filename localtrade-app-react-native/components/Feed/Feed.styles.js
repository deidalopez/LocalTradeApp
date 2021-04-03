import { StyleSheet } from 'react-native';
import { COLORS } from '../../globalStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#fff',
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
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16
  },
  welcomeMessage: {
    fontSize: 40,
    paddingBottom: 150,
    paddingLeft: 15,
  },
  buttonsContainer: {
    paddingVertical: 10,
    marginHorizontal: 15,
    paddingHorizontal: 12
  },
  title: {
    color: 'black',
    fontSize: 30,
    marginBottom:10,
    // fontWeight: '',
    fontFamily: Platform.OS === 'ios' ? 'Avenir Next' : 'Roboto',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  scrollView: {
    marginHorizontal: 20,
    backgroundColor: '#DAE8EF'
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
  description: {
    fontFamily: Platform.OS === 'ios' ? 'Avenir Next' : 'Roboto',
  },
  buttons: {
    margin: 5,
    backgroundColor: COLORS.secondary,
    borderRadius: 7,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150
  },

  buttontext: {
    color: 'white',
    fontSize: 20,
  }
})