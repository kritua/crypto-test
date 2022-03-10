import React from 'react';

import SVG, { IProps as IPropsSVG } from './index';

export interface IProps {
    svg?: IPropsSVG
}

export const IconChevronRight = (props: IProps) => (
    <SVG {...props.svg}>
        <path
            d="M8.58008 16.59L13.1701 12L8.58008 7.41L10.0001 6L16.0001 12L10.0001 18L8.58008 16.59Z"
            fill="#BDC2C9"
        />
    </SVG>
);

export default IconChevronRight;
