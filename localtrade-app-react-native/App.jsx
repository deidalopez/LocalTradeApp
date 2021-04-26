import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from './context/Context'
import RootNavigator from './RootNavigator';
import { Provider as PaperProvider } from 'react-native-paper';

// const Stack = createStackNavigator();
const App = () => {
  return (
    <Provider>
      <PaperProvider>
        <RootNavigator />
      </PaperProvider>
    </Provider>
  );
    // <Provider>
    //   <NavigationContainer>
    //     <Stack.Navigator initialRouteName='Landing'>
    //       <RootNavigator />
    //       {/* <Stack.Screen name='Landing' component={LandingPage} options={{ headerShown: false }} />
    //       <Stack.Screen name='Register' component={Register} />
    //       <Stack.Screen name='Login' component={Login} />
    //       <Stack.Screen name='Feed' component={Feed} />
    //       <Stack.Screen name='Dashboard' component={Dashboard} />
    //       <Stack.Screen name='Post' component={Post} />
    //       <Stack.Screen name='Profile' component={MyProfile} /> */}
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </Provider>
}

export default App;
