import React, { ReactNode, MouseEvent, Fragment, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useClassnames } from 'hook/use-classnames';
import Loader from 'component/loader';

import { IProps } from './types';
import style from './index.module.pcss';

const Button = (props: IProps) => {
    const cn = useClassnames(style, props.className, true);

    const elLoader = useMemo(() => {
        if(props.isLoading) {
            return (
                <div className={cn('button__loader')}>
                    <Loader className={cn('button__loader-icon')} />
                </div>
            );
        }
    }, [props.isLoading]);

    const elChildren = useMemo((): ReactNode => {
        return (
            <Fragment>
                {elLoader}
                {props.children}
            </Fragment>
        );
    }, [props.children, props.isLoading]);

    const onClick = (e: MouseEvent): void => {
        if(props.onClick) {
            props.onClick(e);
        }
    };

    const params = {
        className: cn('button', {
            'button_secondary': props.isSecondary
        }),
        children: elChildren,
        tabIndex: props.tabIndex,
        style   : props.style,
        rel     : props.target === '_blank' ? 'noopener noreferrer' : undefined,
        form    : props.form ? props.form : undefined,
        onClick
    };

    if(props.href) {
        return <a href={props.href} target={props.target} {...params} />;
    } else if(props.to) {
        return <Link to={props.to} target={props.target} {...params} />;
    }

    return (
        <button
            type={props.type}
            disabled={props.disabled || props.isLoading}
            {...params}
        />
    );
};

Button.defaultProps = {
    disabled : false,
    isLoading: false,
    type     : 'button'
};

export default Button;
