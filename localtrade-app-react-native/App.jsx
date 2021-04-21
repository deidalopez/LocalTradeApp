import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import LandingPage from './components/Landing/LandingPage'
// import Register from './components/Register/Register';
// import Login from './components/Login/Login';
// import Feed from './components/Feed/Feed';
// import Dashboard from './components/Dashboard/Dashboard';
// import Post from './components/Post/Post';
// import MyProfile from './components/MyProfile/MyProfile';
import { Provider } from './context/Context'
import RootNavigator from './RootNavigator';
import { Provider as PaperProvider } from 'react-native-paper';

const App = () => {
  return (
    <Provider>
      <PaperProvider>
        <RootNavigator />
      </PaperProvider>
    </Provider>
  );
}

export default App;
