import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import get from 'lodash/get';

import { store, persister } from './store';
import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import BusinessDetail from './screens/BusinessDetail';
import Colors from './constants/Colors';
import CustomHeader from './components/CustomHeader';

const Stack = createStackNavigator();

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
          <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator
              mode="modal"
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
                  fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : '',
                },
              }}
            >
              <Stack.Screen name="Root" component={BottomTabNavigator} />
              <Stack.Screen
                name="Detail"
                component={BusinessDetail}
                options={{
                  header: ({ scene, navigation }) => {
                    return (
                      <CustomHeader
                        onClose={() => navigation.pop()}
                        indexControl={get(scene, 'route.params.index', 0)}
                        backgroundURI={get(scene, 'route.params.detail.18.value', '')}
                      />
                    );
                  },
                }}
              />
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
