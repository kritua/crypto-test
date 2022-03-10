import React from 'react';

import SVG, { IProps as IPropsSVG } from './index';

export interface IProps {
    svg?: IPropsSVG
}

export const IconArrowRight = (props: IProps) => (
    <SVG {...props.svg} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" />
        <g>
            <path d="M12.59 11.42L17.17 16L12.59 20.59L14 22L20 16L14 10L12.59 11.42Z" />
        </g>
    </SVG>
);

export default IconArrowRight;

