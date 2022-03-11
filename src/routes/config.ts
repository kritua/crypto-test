import { ComponentType } from 'react';
import { RouteProps } from 'react-router';

import Layout from 'component/layout';

import Main from './main';
import Pair from './pair';

export interface IProps extends RouteProps {
    layout?: ComponentType
}

// Базовые роуты
export const baseRoutes: Array<IProps> = [{
    exact    : true,
    layout   : Layout,
    path     : ['/', '/favorites'],
    component: Main
}, {
    exact    : true,
    layout   : Layout,
    path     : '/pairs/:address',
    component: Pair
}];
