import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {},
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#d6d7da',
    backgroundColor: 'white',
  },
  textInput: {
    height: 60,
    flex: 1,
  },
  icon: {
    paddingLeft: 10,
    paddingRight: 10,
    color: '#757575',
  },
  task: {},
  activityIndicator: {
    paddingRight: 5,
  },
  touchableBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#d6d7da',
  },
  touchableBtnText: {
    color: '#5699FF',
  },

  doneBtn: {
    marginRight: 15,
  },
});
export default styles;
