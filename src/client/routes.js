import React from 'react';
import Loadable from 'react-loadable'
import Loader from 'react-loader-spinner'
import './scss/style.css';
import './scss/custom.css';

function Loading() {
  return (
    /*<div>Loading...</div>*/
    <Loader type="Rings" color="#dc3545" height="100"	width="100" className="custom-center"/>
  );
}

const Scenario = Loadable({
  loader: () => import('./containers/Scenario/Scenario'),
  loading: Loading,
});

const Block = Loadable({
  loader: () => import('./containers/Block/Block'),
  loading: Loading,
});

const BlockInfo = Loadable({
  loader: () => import('./containers/BlockInfo/BlockInfo'),
  loading: Loading,
});

const Setting = Loadable({
  loader: () => import('./containers/Setting/Setting'),
  loading: Loading,
});

const routes = [
  { path: '/bot/:bot_name/scenario',  exact: true, name: '봇 시나리오', component: Scenario },
  { path: '/bot/:bot_name/scenario/:scenario_name?',  name: '봇 블록', component: Block },
  { path: '/bot/:bot_name/intent/:intent_name',  name: '블록 설정', component: BlockInfo },
  { path: '/bot/:bot_name/setting',  name: '봇 설정', component: Setting }
];

export default routes;
