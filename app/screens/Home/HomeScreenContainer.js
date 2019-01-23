import { connect } from 'react-redux';
import { compose } from 'recompose';
import HomeScreenView from './HomeScreenView';

const enhance = compose(connect());

export default enhance(HomeScreenView);
