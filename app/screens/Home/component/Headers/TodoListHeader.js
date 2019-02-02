import React from 'react';
import { ActivityIndicator } from 'react-native';

import { DoneButton } from '../../../../components';
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
      <DoneButton
        onPress={navigation.getParam('onDonePress')}
        style={s.doneButton}
      />
    );
  }
  return {
    title: 'My shopping list',
    headerRight,
  };
};

export default createTodoListHeader;
