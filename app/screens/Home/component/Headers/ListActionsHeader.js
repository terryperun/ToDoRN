import React from 'react';
import { NavigationButton } from '../../../../components';

const createListActionsHeader = (navigation) => {
  const selectedCount = navigation.getParam('selectedCount');

  return {
    title: `Selected: ${selectedCount}`,
    headerLeft: (
      <NavigationButton
        text="Cancel"
        // onPress={navigation.getParam('onCancel')}
      />
    ),
    headerLeftContainerStyle: {
      marginLeft: 16,
    },
  };
};

export default createListActionsHeader;
