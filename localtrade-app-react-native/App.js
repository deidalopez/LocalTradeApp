import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './Components/LandingPage';
import Register from './Components/Register';
import Login from './Components/Login';
import Feed from './Components/Feed';
import Dashboard from './Components/Dashboard';
import Post from './Components/Post';
import myprofile from './Components/myprofile';
import { Provider } from './Context/Context'

const Stack = createStackNavigator();
const App = () => {
  return (

    <Provider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Landing'>
          <Stack.Screen name='Landing' component={LandingPage} options={{ headerShown: false }} />
          <Stack.Screen name='Register' component={Register} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Feed' component={Feed} />
          <Stack.Screen name='Dashboard' component={Dashboard} />
          <Stack.Screen name='Post' component={Post} />
          <Stack.Screen name='Profile' component={myprofile} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
