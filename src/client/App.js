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

import { Login, Register, DefaultLayout, DefaultFrame } from './containers';

const store = createStore(reducers, applyMiddleware(thunk));

class App extends Component {
  render() {
    return (
        <HashRouter>
          <Provider store={store}>
          <Switch>
            <Route exact path="/home" name="Home" component={DefaultLayout} />
            <Route path="/login" name="Login Page" component={Login} />
            <Route path="/register" name="Register Page" component={Register} />
            <Route path="/bot/:bot_name" name="botframe" component={DefaultFrame}/>
          </Switch>
          </Provider>
        </HashRouter>
    );
  }
}

export default App;
