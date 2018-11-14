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
//import navigation from '../../_nav';
// routes config
import DefaultAside from '../../components/DefaultAside';
import DefaultHeader from '../../components/DefaultHeader';
import DefaultFooter from '../../components/DefaultFooter';

class DefaultFrame extends Component {
    constructor(props){
        super(props);
    }

    navigation = {
        items: [
            {
                name: '봇 목록',
                url: '/home',
                icon: 'icon-arrow-left-circle',
            },
            {
                name: '봇 설정',
                url: '/bot/'+this.props.match.params.bot_name+'/setting',
                icon: 'icon-settings',
            },
            {
                title: true,
                name: '메뉴',
                wrapper: {
                    element: '',
                    attributes: {},
                },
            },
            {
                name: '시나리오',
                url: '/bot/'+this.props.match.params.bot_name+'/scenario',
                icon: 'icon-note',
            },
            {
                name: '도움말',
                url: '/home',
                icon: 'icon-question',
            }
        ]
    };


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
                        <AppSidebarNav navConfig={this.navigation} {...this.props} />
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
                            <Redirect from="/bot/:bot_name" to="/bot/:bot_name/scenario"></Redirect>
                        </Switch>
                        </Container>
                    </main>
                    <AppAside fixed>
                        <DefaultAside />
                    </AppAside>
                </div>
            </div>
        );
    }
}

export default DefaultFrame;