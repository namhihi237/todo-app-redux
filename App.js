import React, {Component} from 'react';
import {View, Text} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Landing, Login, Register, Todo} from './src/components';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import {storeData, getData} from './src/utils';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

class C2 extends Component {
  render() {
    return (
      <View>
        <Text>HS</Text>
      </View>
    );
  }
}

class C3 extends Component {
  render() {
    return (
      <View>
        <Text>COmpany</Text>
      </View>
    );
  }
}

class tabBarForStudent extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Todos" component={Todo} />
        <Tab.Screen name="Settings" component={C2} />
      </Tab.Navigator>
    );
  }
}

class tabBarForCompany extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Todos" component={Todo} />
        <Tab.Screen name="Settings" component={C3} />
      </Tab.Navigator>
    );
  }
}

class App extends Component {
  checkLogin = async () => {
    const token = await getData('token');

    if (token === '' || token === null || token === undefined) {
      return false;
    }
    return true;
  };

  clear = async () => {
    await storeData('token', '');
  };

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Loading" // check day
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Loading" component={Landing} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="MainStudent" component={tabBarForStudent} />
            <Stack.Screen name="MainCompany" component={tabBarForCompany} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
