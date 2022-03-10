import React, { ReactNode, FC } from 'react';

import { useClassnames } from 'hook/use-classnames';
import NavItem from './nav-item';
import style from './index.module.pcss';

interface INav {
    children?: ReactNode,
    header?: ReactNode,
    footer?: ReactNode
}

const Nav: FC<INav> = ({ children, header, footer }) => {
    const cn = useClassnames(style);

    return (
        <nav className={cn('nav')}>
            {header}
            <ul className={cn('nav__list')}>
                {children}
            </ul>
            {footer}
        </nav>
    );
};

export default Nav;
export { NavItem };
