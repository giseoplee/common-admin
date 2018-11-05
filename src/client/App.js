import React, { Component } from 'react';
import { BrowserRouter as Router, HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import '@coreui/icons/css/coreui-icons.min.css';
import 'flag-icon-css/css/flag-icon.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import './scss/style.css';

import { DefaultLayout, DefaultFrame } from './containers';
import { Login, Page404, Page500, Register, Board } from './views/Pages';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/home" name="Home" component={DefaultLayout} />
          <Route path="/login" name="Login Page" component={Login} />
          <Route path="/register" name="Register Page" component={Register} />
          <Route path="/404" name="Page 404" component={Page404} />
          <Route path="/500" name="Page 500" component={Page500} />
          <Route path="/board" name="board test" component={Board} />
          <Route path="/bot" name="botframe" component={DefaultFrame}/>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
