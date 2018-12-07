import React from 'react';
import Home from './Home';
import About from './About';
import { View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const MyApp = createStackNavigator({
  Home: { screen: Home },
  About: { screen: About },
});
const RootStack = createStackNavigator({
  Home: {
    screen: Home,
  },
  About: {
    screen: About,
  },
});

const App = createAppContainer(RootStack);
export default App;
