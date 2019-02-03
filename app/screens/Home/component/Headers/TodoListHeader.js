import React from 'react';
import { ActivityIndicator } from 'react-native';

import { NavigationButton } from '../../../../components';
import { colors } from '../../../../styles';
import s from './styles';

const createTodoListHeader = (navigation) => {
  let headerRight;
  if (navigation.getParam('isLoading')) {
    headerRight = (
      <ActivityIndicator
        size="small"
        color={colors.accent}
        style={s.activityIndicator}
      />
    );
  } else if (navigation.getParam('showDone')) {
    headerRight = (
      <NavigationButton
        onPress={navigation.getParam('onDonePress')}
        text="Done"
        style={s.NavigationButton}
      />
    );
  }
  return {
    title: 'My shopping list',
    headerRight,
  };
};

export default createTodoListHeader;
