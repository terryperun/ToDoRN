import { withPropsOnChange } from 'recompose';

const setParamOnChange = (param) =>
  withPropsOnChange([param], (props) => {
    props.navigation.setParams({ [param]: props[param] });
  });

export default setParamOnChange;
