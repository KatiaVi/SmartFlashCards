import React from 'react';
import Main from './Main';
import CardDeckPage from './pages/CardDeckPage';
import LearningSpacePage from './pages/LearningSpacePage';
import { Route, Switch, Redirect, withRouter, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postDeck, postUser } from './redux/ActionCreators';
import { ConfigureStore } from './redux/configureStore';
import { Provider } from 'react-redux';

const store = ConfigureStore();

class Routes extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
        <div>
          <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  };
}

if(module.hot){
  module.hot.accept()
}

export default Routes;
 