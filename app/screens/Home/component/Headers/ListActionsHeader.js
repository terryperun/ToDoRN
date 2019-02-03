import React from 'react';
import { NavigationButton } from '../../../../components';
import s from './styles';
import ActionButton from '../../../../components/ActionButton/ActionButton';

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
    headerRight: <ActionButton text="Delete" />,
    headerLeftContainerStyle: {
      marginLeft: 16,
    },
  };
};

export default createListActionsHeader;
