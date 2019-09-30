import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import './theme.css';
import './index.scss';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store/Store';
import ScrollToTop from './app/common/util/ScrollToTop';
import ReduxToastr from 'react-redux-toastr';
import setAuthToken from './app/common/util/setAuthToken';
import { loadUser } from './app/layout/auth/AuthActions';

const rooEl = document.getElementById('root');

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const AppRoot = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop>
          <ReduxToastr position='bottom-right' transitionIn='fadeIn' transitionOut='fadeOut' />
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </Provider>
  );
};

if (module.hot) {
  module.hot.accept('./app/layout/App', () => {
    setTimeout(ReactDOM.render(<AppRoot />, rooEl));
  });
}

ReactDOM.render(<AppRoot />, rooEl);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
