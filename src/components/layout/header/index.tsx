import React, { useMemo } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useClassnames, { IStyle } from 'hook/use-classnames';

import style from './index.module.pcss';

export interface IProps {
    className?: string | IStyle
}

export const Header = (props: IProps) => {
    const cn = useClassnames(style, props.className, true);
    const { t, i18n } = useTranslation();

    const elLanguages = useMemo(() => {
        if(__DEVELOPMENT__) {
            if(Array.isArray(i18n.options.supportedLngs) && i18n.options.supportedLngs.length) {
                return (
                    <ul className={cn('header__languages')}>
                        {i18n.options.supportedLngs.map((lang) => (
                            <li
                                key={lang}
                                children={lang}
                                className={cn('header__language', {
                                    'header__language_active': lang === i18n.language
                                })}
                                onClick={() => {
                                    void i18n.changeLanguage(lang);
                                }}
                            />
                        ))}
                    </ul>
                );
            }
        }
    }, [i18n.options.supportedLngs, i18n.language]);

    return (
        <header className={cn('header')}>
            {elLanguages}
            <div className={cn('header__main')}>
                <Link
                    to="/"
                    className={cn('header__logo')}
                    children={t('components.header.logo')}
                />
                <nav className={cn('header__nav')}>
                    <NavLink
                        to="/"
                        className={cn('header__nav-link')}
                        activeClassName={cn('header__nav-link_active')}
                        children={t('components.header.nav.specialists')}
                    />
                </nav>
            </div>
        </header>
    );
};

export default Header;
