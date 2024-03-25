// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FormScreen from './screens/FormScreen';
import DisplayScreen from './screens/DisplayScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Form">
        <Stack.Screen name="Form" component={FormScreen} />
        <Stack.Screen name="Display" component={DisplayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
