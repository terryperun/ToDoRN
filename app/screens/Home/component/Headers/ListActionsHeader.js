import React from 'react';
import { NavigationButton } from '../../../../components';
// import s from './styles';

const createListActionsHeader = (navigation) => {
  const selectedCount = navigation.getParam('selectedCount');
  return {
    title: `Selected: ${selectedCount}`,
    headerLeft: (
      <NavigationButton
        text="Cancel"
        onPress={navigation.getParam('onCancel')}
      />
    ),
    headerRight: (
      <NavigationButton
        text="Delete"
        type="danger"
        onPress={navigation.getParam('onDeleteItems')}
      />
    ),
  };
};

export default createListActionsHeader;
