import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

const styles = StyleSheet.create({
  touchableButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  buttonText: {
    color: colors.greenText,
  },
});

export default styles;
