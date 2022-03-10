import React from 'react';

import SVG, { IProps as IPropsSVG } from './index';

export interface IProps {
    svg?: IPropsSVG
}

export const IconSortedAsc = (props: IProps) => (
    <SVG {...props.svg} width="20" height="20" viewBox="-3 -5 20 20">
        <path fillRule="evenodd" clipRule="evenodd" d="M14 10H0V8H14V10Z" />
        <path fillRule="evenodd" clipRule="evenodd" d="M10 6H0V4H10V6Z" />
        <path fillRule="evenodd" clipRule="evenodd" d="M6 2H0V0H6V2Z" />
    </SVG>
);

export default IconSortedAsc;
