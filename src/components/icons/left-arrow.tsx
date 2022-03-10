import React from 'react';

import SVG, { IProps as IPropsSVG } from './index';

export interface IProps {
    svg?: IPropsSVG
}

export const IconLeftArrow = (props: IProps) => (
    <SVG {...props.svg} viewBox="0 0 20 20">
        <path fillRule="evenodd" clipRule="evenodd" d="M11.423 7.256a.833.833 0 10-1.179-1.179L6.322 10l3.922 3.923a.833.833 0 101.179-1.179L8.679 10l2.744-2.744z" />
    </SVG>
);

export default IconLeftArrow;
