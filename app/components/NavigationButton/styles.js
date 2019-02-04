import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

const style = StyleSheet.create({
  container: {
    marginHorizontal: 8,
  },
  text: {
    fontWeight: '400',
    fontSize: 16,
    paddingHorizontal: 8,
  },

  dangerText: {
    color: colors.danger,
  },

  defaultText: {
    color: colors.accent,
  },
});

export default style;
