import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    backgroundColor: '#FFFFFF',
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
    color: '#212121',
  },

  completedTask: {
    textDecorationLine: 'line-through',
    color: '#9E9E9E',
  },

  containerInput: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  textInput: {
    height: 60,
    flex: 1,
  },
});

export default styles;
