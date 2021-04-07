import { StyleSheet } from 'react-native';
import { COLORS } from '../../globalStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
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
    color: COLORS.green,
    fontSize: 25,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollView: {
    marginHorizontal: 20,
    backgroundColor: '#DAE8EF'
  },
  input: {
    height: 50,
    width: 280,
    margin: 5,
    fontSize: 16,
    paddingLeft: 10,
    borderWidth: 2,
    borderRadius: 7,
    fontFamily: Platform.OS === 'ios' ? 'Avenir Next' : 'Roboto',
    borderColor: COLORS.lightGray
  },

  imgPlaceholder: {
    height: 300, 
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgPlaceholderText: {
    color: COLORS.gray
  },

  buttons: {
    margin: 5,
    marginTop: 20,
    backgroundColor: COLORS.secondary,
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