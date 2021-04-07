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

  infoCard: {
    width: 300
  },

  cardTitle: {
    fontSize:25,
    fontWeight: '700'
  },

  cardText: {
    fontSize: 18,
  },

  buttons: {
    margin: 5,
    marginTop:100,
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