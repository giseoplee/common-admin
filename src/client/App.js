import React, { Component } from 'react';
import { BrowserRouter as Router, HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import './App.css';

import '@coreui/icons/css/coreui-icons.min.css';
import 'flag-icon-css/css/flag-icon.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import './scss/style.css';
import './scss/custom.css';

import { Login, Home, Page } from './containers';

const store = createStore(reducers, applyMiddleware(thunk));

class App extends Component {
  render() {
    return (
        <HashRouter>
          <Provider store={store}>
          <Switch>
            <Route exact path="/" name="Home" component={Home} />
            <Route path="/login" name="Login Page" component={Login} />
            <Route path="/bot/:bot_name" name="Page" component={Page}/>
          </Switch>
          </Provider>
        </HashRouter>
    );
  }
}

export default App;
