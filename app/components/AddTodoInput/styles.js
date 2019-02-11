import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

const styles = StyleSheet.create({
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },

  textInput: {
    height: 60,
    flex: 1,
  },

  icon: {
    marginLeft: 16,
    marginRight: 16,
    color: colors.accent,
  },
});

export default styles;
