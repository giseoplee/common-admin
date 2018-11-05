import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Badge, Container, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import  {Link} from 'react-router-dom';
import routes from '../../routes';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import DefaultAside from '../../components/DefaultAside';
import DefaultHeader from '../../components/DefaultHeader';
import DefaultFooter from '../../components/DefaultFooter';

class DefaultFrame extends Component {
    render () {
        return (
            <div className="app">
                <AppHeader fixed>
                    <DefaultHeader page="frame"/>
                </AppHeader>
                <div className="app-body">
                    <AppSidebar fixed display="lg">
                        <AppSidebarHeader />
                        <AppSidebarForm />
                        <AppSidebarNav navConfig={navigation} {...this.props} />
                        <AppSidebarFooter />
                        <AppSidebarMinimizer />
                    </AppSidebar>
                    <main className="main">
                        <Container fluid>
                        <Switch>
                            {routes.map((route, idx) => {
                                return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                                    <route.component {...props} />
                                )} />)
                                : (null);
                            },
                            )}
                            <Redirect from="/bot" to="/bot/:bot_name/scnario"></Redirect>
                        </Switch>
                        </Container>
                    </main>
                    <AppAside fixed hidden>
                        <DefaultAside />
                    </AppAside>
                </div>
            </div>
        );
    }
}

export default DefaultFrame;