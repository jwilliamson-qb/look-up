import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persister } from './store';
import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import BusinessDetail from './screens/BusinessDetail';
import LocationProvider from './hooks/LocationProvider';
import Colors from './constants/Colors';

const Stack = createStackNavigator();

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <LocationProvider>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
            <NavigationContainer linking={LinkingConfiguration}>
              <Stack.Navigator
                screenOptions={{
                  headerStyle: {
                    backgroundColor: Colors.black,
                    shadowColor: 'transparent',
                    shadowRadius: 0,
                    shadowOffset: {
                      height: 0,
                    },
                    height: 120,
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    fontFamily: 'Gill Sans',
                  },
                }}
              >
                <Stack.Screen name="Root" component={BottomTabNavigator} />
                <Stack.Screen name="Detail" component={BusinessDetail} />
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </LocationProvider>
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
