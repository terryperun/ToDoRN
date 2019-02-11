import { Alert } from 'react-native';

class AlertService {
  delete(remove) {
    Alert.alert(
      'Remove item?',
      'This operations cannot be undo',
      [
        {
          text: 'Remove',
          onPress: () => remove(),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  }
}

const alertService = new AlertService();

export default alertService;
