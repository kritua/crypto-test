import React from 'react';

import SVG, { IProps as IPropsSVG } from './index';

export interface IProps {
    svg?: IPropsSVG
}

export const IconCollapse = (props: IProps) => (
    <SVG {...props.svg}>
        <path d="M10 17L15 12L10 7L10 17Z" />
    </SVG>
);

export default IconCollapse;

