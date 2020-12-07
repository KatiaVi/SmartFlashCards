import React from 'react';
import Main from './Main';
import { BrowserRouter } from 'react-router-dom';
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

export default Routes;
 