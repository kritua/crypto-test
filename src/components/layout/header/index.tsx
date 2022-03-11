import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppBar, Box, Container, Toolbar, Typography, Button } from '@mui/material';

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
        <AppBar position="static">
            {elLanguages}
            <Container maxWidth="lg">
                <Toolbar sx={{ gap: 4 }}>
                    <Typography
                        variant="h6"
                        noWrap={true}
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        {t('components.header.logo')}
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: 'flex', gap: 2, height: 40, alignItems: 'center' }}>
                        <Button
                            component={NavLink}
                            to="/"
                            exact={true}
                            sx={{ my: 1, color: 'white', display: 'block' }}
                            className={cn('header__nav-link')}
                            activeClassName={cn('header__nav-link_active')}
                        >
                            {t('components.header.nav.main')}
                        </Button>
                        <Button
                            component={NavLink}
                            to="/favorites"
                            exact={true}
                            sx={{ color: 'white', display: 'block' }}
                            className={cn('header__nav-link')}
                            activeClassName={cn('header__nav-link_active')}
                        >
                            {t('components.header.nav.favorites')}
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
