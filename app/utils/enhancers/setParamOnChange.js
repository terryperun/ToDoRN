import { withPropsOnChange } from 'recompose';
// import React from 'react';
const setParamOnChange = (param) =>
  withPropsOnChange([param], (props) => {
    props.navigation.setParams({ [param]: props[param] });
  });

export default setParamOnChange;
