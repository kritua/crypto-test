import React from 'react';

import SVG, { IProps as IPropsSVG } from './index';

export interface IProps {
    svg?: IPropsSVG
}

export const IconError = (props: IProps) => (
    <SVG {...props.svg}>
        <circle cx="12" cy="12" r="10" />
        <g>
            <path d="M13,18h-2v-2h2V18z M13,14h-2V6h2V14z" />
        </g>
    </SVG>
);

export default IconError;
