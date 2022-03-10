import React, { ReactNode } from 'react';

import useClassnames from 'hook/use-classnames';
import Header from 'component/layout/header';

import './index.pcss';
import style from './index.module.pcss';

export interface IProps {
    children?: ReactNode
}

export const Layout = (props: IProps) => {
    const cn = useClassnames(style);

    return (
        <div className={cn('layout')}>
            <Header />
            {props.children}
        </div>
    );
};

export default Layout;
