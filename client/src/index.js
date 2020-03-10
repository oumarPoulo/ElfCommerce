import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { IntlProviderWrapper } from './context/IntlContext';

import './App.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

const ElfCommerce = () => (
  <Provider store={store}>
    <IntlProviderWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </IntlProviderWrapper>
  </Provider>
);
ReactDOM.render(<ElfCommerce />, document.getElementById('root'));
registerServiceWorker();
