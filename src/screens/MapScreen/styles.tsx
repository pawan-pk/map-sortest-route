import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  safe0: {
    flex: 0,
    backgroundColor: '#0E1C22',
  },
  body: {
    flex: 1,
    backgroundColor: '#0E1C22',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 48,
    height: 48,
  },
  back: {
    height: 32,
    width: 32,
    resizeMode: 'contain',
  },
  title: {
    color: '#FFFFFF',
    textAlign: 'center',
    flex: 1,
    fontWeight: '700',
    fontSize: 16,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  map: {
    height: 400,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 32,
  },
  mapView: {
    ...StyleSheet.absoluteFillObject,
  },
  customCallout: {
    paddingVertical: 0,
  },
  tooltip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    width: 170,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tooltipText: {
    color: '#0E1C22',
    fontWeight: '400',
    fontSize: 14,
    margin: 8,
    textAlign: 'center',
  },
  options: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  checkbox: {
    height: 37,
    width: 37,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleSummary: {
    marginHorizontal: 12,
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 5,
  },
  optionTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  optionSummary: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '400',
    fontSize: 12,
  },
  highText: {
    color: '#70C739',
    fontWeight: '700',
    fontSize: 13,
  },
  continue: {
    height: 54,
    backgroundColor: '#70C739',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    borderRadius: 10,
    marginVertical: 10,
  },
  continueText: {
    color: '#0E1C22',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default styles;

export const mapStyle = [
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#FFFFFF',
      },
      {
        lightness: 40,
      },
      {
        weight: 3,
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#10151C',
      },
      {
        lightness: 25,
      },
      {
        visibility: 'on',
      },
      {
        weight: 3,
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#10151C',
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#10151C',
      },
      {
        lightness: 17,
      },
      {
        weight: 1.2,
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [
      {
        color: '#10151C',
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#10151C',
      },
      {
        lightness: 21,
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#1E323B',
      },
      {
        lightness: 21,
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#756C69',
      },
      {
        lightness: 18,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#756C69',
      },
      {
        lightness: 17,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#756C69',
      },
      {
        lightness: 29,
      },
      {
        weight: 0.2,
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [
      {
        color: '#756C69',
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#756C69',
      },
      {
        lightness: 19,
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#74ccf4 ',
      },
      {
        lightness: 17,
      },
    ],
  },
];
