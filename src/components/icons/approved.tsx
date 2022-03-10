import React from 'react';

import SVG, { IProps as IPropsSVG } from './index';

export interface IProps {
    svg?: IPropsSVG
}

export const IconApproved = (props: IProps) => (
    <SVG {...props.svg} fill="none">
        <rect width="24" height="24" rx="12" fill="#C4C4C4" />
        <path d="M8 12l3 3 7-7" stroke="#fff" strokeWidth="2" />
    </SVG>
);

export default IconApproved;
