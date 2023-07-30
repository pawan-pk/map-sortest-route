import {
  AddressesData,
  LatLongRequestResponse,
  Location,
  Prediction,
} from './types';
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Fragment, useState} from 'react';
import {addIcon, backIcon, locationIcon} from '../../assets/images';

import AddressField from './AddressField';
import {AddressLatLng} from '../MapScreen/types';
import {AppStackScreenProps} from '../../navigation/types';
import styles from './styles';

type RouteScreenProps = AppStackScreenProps<'RouteScreen'>;
type ModalStateType = {
  visible: boolean;
  title: string;
  for: 'origin' | 'destination' | undefined;
};
const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';

let timeout: NodeJS.Timeout | null = null;

const RouteScreen = (props: RouteScreenProps) => {
  const {navigation} = props;
  const [modal, setModal] = useState<ModalStateType>({
    visible: false,
    title: '',
    for: undefined,
  });
  const [addresses, setAddresses] = useState<Prediction[]>([]);
  const [origin, setOrigin] = useState<AddressLatLng>();
  const [destination, setDestination] = useState<AddressLatLng>();

  const showModal = (title: string, forValue: 'origin' | 'destination') => {
    setAddresses([]);
    setModal({
      visible: true,
      title,
      for: forValue,
    });
  };

  const addressChangeText = (text: string) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(async () => {
      const adds = await searchAddresses(text);
      setAddresses(adds ?? []);
    }, 500);
  };

  const renderAddresses = ({
    item,
    index,
  }: {
    item: Prediction;
    index: number;
  }) => {
    let border = addresses.length - 1 === index ? 0 : 1;
    return (
      <TouchableOpacity
        key={item.place_id}
        onPress={() => {
          (async () => {
            const address = await getLatLongByPlaceId(item.place_id);
            if (address) {
              if (modal.for === 'origin') {
                setOrigin({
                  latitude: address.lat,
                  longitude: address.lng,
                  title: item.description,
                });
              } else {
                setDestination({
                  latitude: address.lat,
                  longitude: address.lng,
                  title: item.description,
                });
              }
            }
          })();

          setModal({
            visible: false,
            title: '',
            for: undefined,
          });
        }}
        style={styles.rowView}>
        <Image source={locationIcon} style={styles.placeMarker} />
        <View style={[styles.rowsWithline, {borderBottomWidth: border}]}>
          <Text numberOfLines={2} style={styles.placeName}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const gotoMapScreen = () => {
    if (origin !== undefined && destination !== undefined) {
      navigation.navigate('MapScreen', {origin, destination});
    }
  };

  const opacity = origin !== undefined && destination !== undefined ? 1 : 0.5;
  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor="#0E1C22" />
      <SafeAreaView style={styles.safe0} />
      <SafeAreaView style={styles.body}>
        <View style={styles.header}>
          <Image source={backIcon} style={styles.back} />
          <Text style={styles.title}>Fixed daily routes</Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.route}>
              <Text style={styles.routetitle}>Route 1</Text>
              <TouchableOpacity>
                <Text style={styles.edit}>Edit</Text>
              </TouchableOpacity>
            </View>
            <AddressField
              title="From"
              onPress={title => {
                showModal(title, 'origin');
              }}
              value={origin?.title ?? 'To'}
            />
            <AddressField
              title="To"
              onPress={title => {
                showModal(title, 'destination');
              }}
              value={destination?.title ?? 'From'}
            />
            <View style={styles.route}>
              <Text style={styles.routetitle}>Route 1</Text>
              <TouchableOpacity>
                <Image source={addIcon} />
              </TouchableOpacity>
            </View>
          </ScrollView>
          <TouchableOpacity
            disabled={origin === undefined || destination === undefined}
            style={[
              styles.continue,
              {
                opacity,
              },
            ]}
            onPress={gotoMapScreen}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <Modal visible={modal.visible} animationType="slide" transparent={true}>
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() =>
                    setModal({
                      visible: false,
                      title: '',
                      for: undefined,
                    })
                  }>
                  <Image source={backIcon} style={styles.back} />
                </TouchableOpacity>
                <Text style={styles.title}>
                  {modal.for === 'origin'
                    ? 'Search pickup address'
                    : 'Search destination address'}
                </Text>
              </View>
              <View style={styles.fieldStyle}>
                <Image source={locationIcon} style={styles.locationStyle} />
                <TextInput
                  onChangeText={addressChangeText}
                  placeholder={modal.title}
                  style={styles.inputStyle}
                  placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                />
              </View>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}>
                <FlatList
                  data={addresses}
                  keyExtractor={item => item.place_id}
                  renderItem={renderAddresses}
                />
              </KeyboardAvoidingView>
            </View>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
      <SafeAreaView style={styles.safe0} />
    </Fragment>
  );
};

const searchAddresses = async (
  keyword = '',
): Promise<Prediction[] | undefined> => {
  if (keyword === '') {
    return;
  }
  let url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
  try {
    const response = await fetch(
      url +
        '?' +
        new URLSearchParams({
          input: keyword,
          key: apiKey,
        }),
    );
    const data: AddressesData = await response.json();
    if (data.status === 'OK') {
      return data.predictions;
    } else {
      Alert.alert('API Error', data.error_message);
    }
  } catch (err) {
    let error = err as Error;
    Alert.alert('Error', error.message);
  }
  return;
};

const getLatLongByPlaceId = async (
  placeid: string,
): Promise<Location | undefined> => {
  let url = 'https://maps.googleapis.com/maps/api/geocode/json';
  try {
    const response = await fetch(
      url +
        '?' +
        new URLSearchParams({
          place_id: placeid,
          region: 'sg',
          key: apiKey,
        }),
    );
    const data: LatLongRequestResponse = await response.json();
    if (data.status === 'OK') {
      return data.results[0].geometry.location;
    } else {
      Alert.alert('API Error', data.error_message);
    }
  } catch (err) {
    let error = err as Error;
    Alert.alert('Error', error.message);
    throw error;
  }
  return;
};

export default RouteScreen;
