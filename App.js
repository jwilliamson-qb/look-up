import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import {
  Platform, StatusBar, StyleSheet, View, Alert,
} from 'react-native';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persister } from './store';
import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import queryBusinesses from './services/qbapi';
import { setBusinesses } from './stores/businesses';

const Stack = createStackNavigator();

export default function App() {
  const isLoadingComplete = useCachedResources();

  useEffect(() => {
    async function getBusinesses() {
      const response = await queryBusinesses();
      setBusinesses(response);
    }

    getBusinesses();
  });

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
          <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator>
              <Stack.Screen name="Root" component={BottomTabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
