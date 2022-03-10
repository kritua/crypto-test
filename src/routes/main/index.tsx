import React from 'react';
import { useTranslation } from 'react-i18next';

import useClassnames from 'hook/use-classnames';

import Typography from 'component/typography';

import style from './index.module.pcss';
import { main } from 'adapter/api/main';

export const Main = () => {
    const cn = useClassnames(style);
    const { t } = useTranslation();

    const getPairs = main.useGetPairsQuery(undefined);

    console.info('PAIRS', getPairs);

    return (
        <div className={cn('main')}>
            <Typography type="h1">
                {t('routes.main.hello')}
            </Typography>
            <div className={cn('main__list')}>
                123
            </div>
        </div>
    );
};

export default Main;
