import React from 'react';

import SVG, { IProps as IPropsSVG } from './index';

export interface IProps {
    svg?: IPropsSVG
}

export const IconBurger = (props: IProps) => (
    <SVG {...props.svg} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" />
        <g>
            <rect x="10" y="11" width="12" height="2" />
            <rect x="10" y="15" width="12" height="2" />
            <rect x="10" y="19" width="12" height="2" />
        </g>
    </SVG>
);

export default IconBurger;

