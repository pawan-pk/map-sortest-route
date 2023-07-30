import * as React from 'react';

import {AppStackParamList} from './types';
import MapScreen from '../screens/MapScreen';
import type {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import RouteScreen from '../screens/RouteScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const options: NativeStackNavigationOptions = {
  headerShown: false,
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName="RouteScreen" screenOptions={options}>
      <Stack.Screen name="RouteScreen" component={RouteScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
