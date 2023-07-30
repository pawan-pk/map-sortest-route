import * as React from 'react';

import {
  Image,
  ImageStyle,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {locationIcon} from '../../assets/images';

interface AddressFieldProps {
  /**
   * Title for the field
   */
  title: string;
  /**
   * onPress action
   */
  onPress?: ((title: string) => void) | undefined;
  /**
   * value
   */
  value: string;
}

const AddressField = ({title, value, onPress}: AddressFieldProps) => {
  return (
    <View style={MainStyle}>
      <Text style={TitleStyle}>{title}</Text>
      <TouchableOpacity style={FieldStyle} onPress={() => onPress?.(title)}>
        <Image source={locationIcon} style={LocationStyle} />
        <Text numberOfLines={1} style={ValueStyle}>
          {value}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const MainStyle: StyleProp<ViewStyle> = {
  marginBottom: 20,
};

const FieldStyle: StyleProp<ViewStyle> = {
  borderRadius: 12,
  backgroundColor: '#9F9F9F1A',
  height: 54,
  alignItems: 'center',
  flexDirection: 'row',
  marginTop: 8,
};

const LocationStyle: StyleProp<ImageStyle> = {
  resizeMode: 'contain',
  height: 24,
  width: 24,
  marginHorizontal: 15,
};

const TitleStyle: StyleProp<TextStyle> = {
  color: '#FFFFFF',
  fontSize: 12,
  fontWeight: '400',
};

const ValueStyle: StyleProp<TextStyle> = {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: '400',
  flex: 1,
  marginRight: 10,
};

export default AddressField;
