import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '80%',
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: '#000',
    margin: 'auto',
  },
  square: {
    width: '12.5%',
    height: '12.5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightSquare: {
    backgroundColor: '#eee',
  },
  darkSquare: {
    backgroundColor: '#aaa',
  },
  piece: {
    width: '80%',
    height: '80%',
  },
  dragOver: {
    opacity: 0.5,
  },
});

export default styles;