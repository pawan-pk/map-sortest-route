import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {
  Callout,
  LatLng,
  Marker,
  PROVIDER_GOOGLE,
  Polyline,
} from 'react-native-maps';
import React, {Fragment, useEffect, useState} from 'react';
import {backIcon, check, endLocation, startLocation} from '../../assets/images';
import styles, {mapStyle} from './styles';

import {AppStackScreenProps} from '../../navigation/types';
import {DirectionRoute} from './types';
import PolylineDecoder from '@mapbox/polyline';

type MapScreenProps = AppStackScreenProps<'MapScreen'>;

const MapScreen = (props: MapScreenProps) => {
  const [routes, setRoutes] = useState<LatLng[][]>([]);
  const [zIndex, setzIndex] = useState<number | undefined>(0);
  const [summareis, setSummareis] = useState<string[]>();
  const {origin, destination} = props.route.params;

  useEffect(() => {
    const fetchDirections = async () => {
      const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${apiKey}&alternatives=true`;

      try {
        const response = await fetch(url);
        const data: DirectionRoute = await response.json();

        if (data.routes && data.routes.length > 0) {
          /**
           *  Use to sort distance by time
           *  @note `duration` to `distance` for distance sorting
           */
          data.routes.sort(
            (a, b) => a.legs[0].duration.value - b.legs[0].duration.value,
          );
          const decodedRoutes = data.routes.map(route => {
            const points: number[][] = PolylineDecoder.decode(
              route.overview_polyline.points,
            );
            return points.map(point => ({
              latitude: point[0],
              longitude: point[1],
            })) as LatLng[];
          });
          setSummareis(data.routes.map(item => item.summary));
          setRoutes(decodedRoutes);
        } else {
          Alert.alert(
            'No routes found',
            'No routes available between the selected addresses.',
          );
        }
      } catch (error) {
        Alert.alert(
          'Error',
          'An error occurred while fetching directions. Please try again later.',
        );
      }
    };
    fetchDirections();
  }, [
    destination.latitude,
    destination.longitude,
    origin.latitude,
    origin.longitude,
  ]);

  const getRouteColor = (index: number): string | undefined => {
    const colors = ['#72CA37', '#A8A9A8', '#756C69'];
    if (zIndex === undefined) {
      return colors[0];
    } else if (index === zIndex) {
      return colors[0];
    } else if (index < 2) {
      return colors[1];
    } else {
      return colors[2];
    }
  };

  const onCheck = (index?: number | undefined) => {
    setzIndex(index);
  };

  const {navigation} = props;
  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor="#0E1C22" />
      <SafeAreaView style={styles.safe0} />
      <SafeAreaView style={styles.body}>
        <View style={styles.header}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Image source={backIcon} style={styles.back} />
          </TouchableOpacity>
          <Text style={styles.title}>Select your route</Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.map}>
              <MapView
                style={styles.mapView}
                provider={PROVIDER_GOOGLE}
                customMapStyle={mapStyle}
                initialRegion={{
                  ...origin,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.1421,
                }}>
                {routes.map((route, index) => (
                  <Polyline
                    key={index}
                    coordinates={route}
                    zIndex={index === zIndex ? 1 : -index}
                    strokeWidth={5}
                    strokeColor={getRouteColor(index)}
                  />
                ))}
                <Marker
                  coordinate={origin}
                  title="Origin"
                  image={startLocation}>
                  <Tooltip address={origin.title} />
                </Marker>
                <Marker
                  coordinate={destination}
                  image={endLocation}
                  anchor={{x: 0.5, y: 0.65}}
                  title="Destination">
                  <Tooltip address={destination.title} />
                </Marker>
              </MapView>
            </View>
            {summareis?.map((item, index) => (
              <OptionsView
                key={index.toString()}
                title={`Option ${index + 1}`}
                checked={zIndex === index}
                high={index === 0}
                summary={item}
                onCheck={() => onCheck(index)}
              />
            ))}
            {(summareis?.length ?? 0) > 1 && (
              <OptionsView
                key={'all'}
                title="Available to travel all routes"
                checked={zIndex === undefined}
                high={false}
                onCheck={() => onCheck()}
              />
            )}
          </ScrollView>
          <TouchableOpacity style={styles.continue}>
            <Text style={styles.continueText}>Confirm</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <SafeAreaView style={styles.safe0} />
    </Fragment>
  );
};

const Tooltip = ({address}: {address: string}) => (
  <Callout tooltip pointerEvents="box-only">
    <View style={styles.tooltip}>
      <Text style={styles.tooltipText}>{address}</Text>
    </View>
  </Callout>
);

type OptionsViewProps = {
  title: string;
  checked: boolean;
  summary?: string | undefined;
  high: boolean;
  onCheck?: () => void;
};
const OptionsView = ({
  title,
  checked,
  summary,
  high,
  onCheck,
}: OptionsViewProps) => (
  <View style={styles.options}>
    <TouchableOpacity onPress={onCheck} style={styles.checkbox}>
      {checked && <Image source={check} />}
    </TouchableOpacity>
    <View style={styles.titleSummary}>
      <Text style={styles.optionTitle}>{title}</Text>
      <Text style={styles.optionSummary}>{summary}</Text>
    </View>
    {high && <Text style={styles.highText}>Highest earning potential</Text>}
  </View>
);

export default MapScreen;
