import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    // flex: 1,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderColor: '#d6d7da',
  },
  textInput: {
    height: 60,
    paddingLeft: 15,
    flex: 1,
  },
  icon: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  task: {},
  activityIndicator: {
    paddingRight: 5,
  },
  touchableBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderBottomWidth: 1.5,
    borderColor: '#d6d7da',
  },
  touchableBtnText: {
    color: '#7595C9',
  },
});
export default styles;
