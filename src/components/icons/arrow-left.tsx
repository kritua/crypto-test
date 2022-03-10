import React from 'react';

import SVG, { IProps as IPropsSVG } from './index';

export interface IProps {
    svg?: IPropsSVG
}

export const IconArrowLeft = (props: IProps) => (
    <SVG {...props.svg} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" />
        <g>
            <path d="M19.41 20.58L14.83 16L19.41 11.41L18 10L12 16L18 22L19.41 20.58Z" />
        </g>
    </SVG>
);

export default IconArrowLeft;

