import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    backgroundColor: colors.white,
    alignItems: 'center',
  },

  checkBoxContainer: {
    justifyContent: 'center',
  },

  CheckBox: {
    paddingHorizontal: 19,
    paddingVertical: 19,
  },

  task: {
    justifyContent: 'center',
  },

  textTask: {
    color: colors.text,
  },

  completedTask: {
    textDecorationLine: 'line-through',
    color: colors.grayText,
  },

  containerInput: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  textInput: {
    height: 60,
    flex: 1,
  },

  selected: {
    backgroundColor: colors.lightGreen,
  },
});

export default styles;
