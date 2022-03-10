import React from 'react';

import SVG, { IProps as IPropsSVG } from './index';

export interface IProps {
    svg?: IPropsSVG
}

export const IconStar = (props: IProps) => (
    <SVG {...props.svg} viewBox="0 0 24 24">
        <path d="M12,18.3l-6.2,3.2L7,14.6L2,9.8l6.9-1L12,2.5l3.1,6.3l6.9,1l-5,4.9l1.2,6.9L12,18.3z" />
        <linearGradient id="quarter">
            <stop offset="25%" stopColor="var(--color-dark-orange)" />
            <stop offset="25%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id="half">
            <stop offset="50%" stopColor="var(--color-dark-orange)" />
            <stop offset="50%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id="most">
            <stop offset="70%" stopColor="var(--color-dark-orange)" />
            <stop offset="70%" stopColor="transparent" />
        </linearGradient>
    </SVG>
);

export default IconStar;

