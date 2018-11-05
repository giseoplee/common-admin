import React from 'react';
import Loadable from 'react-loadable'

function Loading() {
  return <div>Loading...</div>;
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

const BlameList = Loadable({
  loader: () => import('./views/Blames/list'),
  loading: Loading,
});

const routes = [
  { path: '/bot/:bot_name/scnario',  exact: true, name: '봇 시나리오', component: DetailScnario },
  { path: '/bot/:bot_name/scnario/:scenario_name?',  name: '봇 블록', component: DetailBlockList },
  { path: '/bot/:bot_name/intent/:intent_name',  name: '새 블록', component: DetailIntent },
  { path: '/bot/blame/list', name: 'Common List Component', component: BlameList }
];

export default routes;
