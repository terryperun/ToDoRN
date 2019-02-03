import React from 'react';
import { DoneButton } from '../../../../components';

const createListActionsHeader = (navigation) => {
  const selectedCount = navigation.getParam('selectedCount');

  return {
    title: `Selected: ${selectedCount}`,
    headerLeft: (
      <DoneButton
        onPress={() =>
          navigation.setParams({ headerMode: 'regular' })
        }
      />
    ),
  };
};

export default createListActionsHeader;
