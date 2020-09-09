import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ContactListScreen from './src/screens/ContactListScreen';
import {createStackNavigator} from '@react-navigation/stack';
import ContactDetailScreen from './src/screens/ContactDetailScreen';
import {Provider} from 'react-redux';
import {store} from './src/redux';
import CreateEditContactScreen from './src/screens/CreateEditContactScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator headerMode={'none'}>
          <Stack.Screen name="ContactList" component={ContactListScreen} />
          <Stack.Screen name="ContactDetail" component={ContactDetailScreen} />
          <Stack.Screen
            name="CreateEditContact"
            component={CreateEditContactScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
