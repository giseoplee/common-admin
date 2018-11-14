import React from 'react';
import Loadable from 'react-loadable'
//import Loader from 'react-loader-spinner'
import './scss/style.css';

function Loading() {
  return (
    <div>Loading...</div>
    /*<Loader type="Rings" color="#00BFFF" height="100"	width="100" className="custom-center"/>*/
  );
}

const DetailScnario = Loadable({
  loader: () => import('./components/Details/DetailScnario'),
  loading: Loading,
});

const DetailBlockList = Loadable({
  loader: () => import('./components/Details/DetailBlockList'),
  loading: Loading,
});

const DetailIntent = Loadable({
  loader: () => import('./components/Details/DetailIntent'),
  loading: Loading,
});

const DetailSetting = Loadable({
  loader: () => import('./components/Details/DetailSetting'),
  loading: Loading,
});

const routes = [
  { path: '/bot/:bot_name/scenario',  exact: true, name: '봇 시나리오', component: DetailScnario },
  { path: '/bot/:bot_name/scenario/:scenario_name?',  name: '봇 블록', component: DetailBlockList },
  { path: '/bot/:bot_name/intent/:intent_name',  name: '새 블록', component: DetailIntent },
  { path: '/bot/:bot_name/setting',  name: '새 블록', component: DetailSetting }
];

export default routes;
