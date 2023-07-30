import {AddressLatLng} from '../screens/MapScreen/types';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type NavigationParamList = keyof AppStackParamList;

export type AppStackParamList = {
  RouteScreen: undefined;
  MapScreen: {origin: AddressLatLng; destination: AddressLatLng};
};

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;
