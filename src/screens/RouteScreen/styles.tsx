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
  route: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 20,
  },
  routetitle: {
    color: '#FFFFFF',
    flex: 1,
    fontWeight: '700',
    fontSize: 16,
  },
  edit: {
    color: '#FFFFFF',
    flex: 1,
    fontWeight: '400',
    fontSize: 16,
    opacity: 0.5,
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#0E1C22',
    flex: 1,
    padding: 16,
  },
  fieldStyle: {
    borderRadius: 12,
    backgroundColor: '#9F9F9F1A',
    height: 54,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },
  locationStyle: {
    resizeMode: 'contain',
    height: 24,
    width: 24,
    marginHorizontal: 15,
  },
  inputStyle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '400',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  placeMarker: {
    resizeMode: 'contain',
    marginLeft: 1,
  },
  rowsWithline: {
    flex: 1,
    minHeight: 56,
    justifyContent: 'center',
    borderColor: '#D5DDE0',
    marginRight: 16,
    marginLeft: 12,
  },
  placeName: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '400',
  },
  countryName: {
    fontSize: 13,
    color: '#97ADB6',
    fontWeight: '400',
    marginVertical: 2,
  },
});

export default styles;
