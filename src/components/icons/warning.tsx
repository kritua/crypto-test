import React from 'react';

import SVG, { IProps as IPropsSVG } from './index';

export interface IProps {
    svg?: IPropsSVG
}

export const IconWarning = (props: IProps) => (
    <SVG {...props.svg}>
        <circle cx="12" cy="12" r="10" />
        <g>
            <rect x="11" y="6" width="2" height="7" />
            <rect x="11" y="15" width="2" height="2" />
        </g>
    </SVG>
);

export default IconWarning;

