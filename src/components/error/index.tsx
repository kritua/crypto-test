import React, { useEffect, useState, useCallback } from 'react';

import { useClassnames } from 'hook/use-classnames';

import IconError from 'component/icons/error';

import { IProps } from './types';
import style from './index.module.pcss';

const Error: React.FC<IProps> = (props) => {
    const cn = useClassnames(style, props.className, true);
    const [isDelay, setIsDelay] = useState(!!props.mountDelay);

    const delayTimeout = useCallback(() => {
        setIsDelay(false);
    }, []);

    useEffect(() => {
        const timerId = isDelay ? setTimeout(delayTimeout, props.mountDelay) : null;

        return () => {
            if(timerId) {
                clearTimeout(timerId);
            }
        };
    }, []);

    if(!isDelay && props.children) {
        if(props.elIcon) {
            return (
                <div
                    className={cn('error', 'error_icon')}
                    ref={props.refEl}
                >
                    <IconError svg={{ className: cn('error__icon') }} />
                    <span className={cn('error__text')}>{props.children}</span>
                </div>
            );
        }

        return <div ref={props.refEl} className={cn('error')}>{props.children}</div>;
    }

    return null;
};

export default Error;
