import React from 'react';

import SVG, { IProps as IPropsSVG } from './index';

export interface IProps {
    svg?: IPropsSVG
}

export const IconExpand = (props: IProps) => (
    <SVG {...props.svg}>
        <path d="M7 10L12 15L17 10L7 10Z" />
    </SVG>
);

export default IconExpand;

