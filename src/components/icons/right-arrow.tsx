import React from 'react';

import SVG, { IProps as IPropsSVG } from './index';

export interface IProps {
    svg?: IPropsSVG
}

export const IconRightArrow = (props: IProps) => (
    <SVG {...props.svg} viewBox="0 0 20 20">
        <path fillRule="evenodd" clipRule="evenodd" d="M7.744 12.744a.833.833 0 101.179 1.179L12.845 10 8.923 6.077a.833.833 0 10-1.179 1.179L10.488 10l-2.744 2.744z" />
    </SVG>
);

export default IconRightArrow;
