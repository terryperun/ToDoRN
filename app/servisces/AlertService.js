import { Alert } from 'react-native';

class AlertService {
  deleteAlert(remove) {
    Alert.alert(
      'Remove item?',
      'This operations cannot be canceled',
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
