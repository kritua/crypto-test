import React from 'react';

import SVG, { IProps as IPropsSVG } from './index';

export interface IProps {
    svg?: IPropsSVG
}

export const IconApply = (props: IProps) => (
    <SVG {...props.svg}>
        <circle cx="12" cy="12" r="10" />
        <g>
            <polygon points="10.5,16.061 6.793,12.354 8.207,10.94 10.5,13.233 15.793,7.94 17.207,9.354" />
        </g>
    </SVG>
);

export default IconApply;

