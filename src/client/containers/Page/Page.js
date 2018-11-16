import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import routes from '../../routes';

import {
  AppAside,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav
} from '@coreui/react';
// sidebar nav config
//import navigation from '../../_nav';
// routes config
import { Aside, Header } from '../../components/Page';

class Page extends Component {
    

    constructor(props){
        super(props);
    }

    botId = this.props.match.params.bot_name;

    navigation = {
        items: [
            {
                name: '봇 목록',
                url: '/',
                icon: 'icon-arrow-left-circle',
            },
            {
                name: '봇 설정',
                url: `/bot/${this.botId}/setting`,
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
                url: `/bot/${this.botId}/scenario`,
                icon: 'icon-note',
            },
            {
                name: '도움말',
                url: '/',
                icon: 'icon-question',
            }
        ]
    };


    render () {

        return (
            <div className="app">
                <AppHeader fixed>
                    <Header page="frame"/>
                </AppHeader>
                <div className="app-body">
                    <AppSidebar fixed display="lg">
                        <AppSidebarHeader />
                        <AppSidebarForm />
                        <AppSidebarNav navConfig={ this.navigation } { ...this.props } />
                        <AppSidebarFooter />
                        <AppSidebarMinimizer />
                    </AppSidebar>
                    <main className="main">
                        <Container fluid>
                        <Switch>
                            { routes.map((route, idx) => {
                                return route.component ? (<Route key={ idx } path={ route.path } exact={ route.exact } name={ route.name } render={ props => (
                                    <route.component { ...props } />
                                ) } />)
                                : (null);
                            },
                            ) }
                            <Redirect from="/bot/:bot_name" to="/bot/:bot_name/scenario"></Redirect>
                        </Switch>
                        </Container>
                    </main>
                    <AppAside fixed>
                        <Aside />
                    </AppAside>
                </div>
            </div>
        );
    }
}

export default Page;