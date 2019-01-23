import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    borderBottomWidth: 1.5,
    borderBottomColor: '#d6d7da',
  },
  checkBox: {
    justifyContent: 'center',
    paddingRight: 10,
    paddingLeft: 10,
  },
  task: {
    justifyContent: 'center',
  },
  completedTask: {
    textDecorationLine: 'line-through',
  },
});

export default styles;
