import React from 'react';
import { v4 } from 'uuid';

import useClassnames from 'hook/use-classnames';

import SVG, { IProps as IPropsSVG } from './index';
import style from './index.module.pcss';

export interface IProps {
    svg?: IPropsSVG
}

export const IconLoader = (props: IProps) => {
    const uid = v4();
    const cn = useClassnames(style, props.svg?.className, true);

    const svgProps = {
        ...props.svg,
        className: cn('svg-icon_loader')
    };

    return (
        <SVG {...svgProps} viewBox="0 0 100 100">
            <circle fill="transparent" stroke={`url(#${uid})`} cx="50" cy="50" r="35" />
            <linearGradient id={uid}>
                <stop offset="25%" stopColor="#dadada" stopOpacity="1" />
                <stop offset="50%" stopColor="#dadada" stopOpacity=".5" />
                <stop offset="100%" stopColor="#dadada" stopOpacity="0" />
            </linearGradient>
        </SVG>
    );
};

export default IconLoader;
