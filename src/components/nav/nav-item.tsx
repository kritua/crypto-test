import React, { ReactNode, FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router';

import { useClassnames } from 'hook/use-classnames';

import style from './index.module.pcss';

interface INavItem {
    children: ReactNode,
    replace?: boolean,
    to: string
}

const NavItem: FC<INavItem> = ({ replace, children, to }) => {
    const cn = useClassnames(style);
    const { hash } = useLocation();

    return (
        <li className={cn('nav__item', {
            'nav__item_selected': hash === to
        })}
        >
            <NavLink
                replace={replace}
                to={to}
                isActive={() => hash === to}
                className={cn('nav__item-link')}
                activeClassName={cn('nav__item-link_active')}
            >
                {children}
            </NavLink>
        </li>
    );
};

export default NavItem;
