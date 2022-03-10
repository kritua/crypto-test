import React from 'react';

import SVG, { IProps as IPropsSVG } from './index';

export interface IProps {
    svg?: IPropsSVG
}

export const IconChevronDown = (props: IProps) => (
    <SVG {...props.svg}>
        <path d="M7.41 8.57999L12 13.17L16.59 8.57999L18 9.99999L12 16L6 9.99999L7.41 8.57999Z" fill="#BDC2C9" />
    </SVG>
);

export default IconChevronDown;

