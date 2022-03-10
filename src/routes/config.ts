import { ComponentType } from 'react';
import { RouteProps } from 'react-router';

import Layout from 'component/layout';

import Main from './main';

export interface IProps extends RouteProps {
    layout?: ComponentType,
    isPublic?: boolean
}

// Базовые роуты
export const baseRoutes: Array<IProps> = [{
    exact    : true,
    layout   : Layout,
    path     : '/',
    component: Main
}];
