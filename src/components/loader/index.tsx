import React, { FC } from 'react';

import LoaderIcon from 'component/icons/loader';
import { useClassnames } from 'hook/use-classnames';

import style from './index.module.pcss';

export interface IProps {
    className?: string
}

const Loader: FC<IProps> = (props) => {
    const cn = useClassnames(style, props.className, true);

    return (
        <div className={cn('loader')}>
            <LoaderIcon />
        </div>
    );
};

export default Loader;
