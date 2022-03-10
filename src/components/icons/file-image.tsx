import React from 'react';

import SVG, { IProps as IPropsSVG } from './index';

export interface IProps {
    svg?: IPropsSVG
}

export const IconFileImage = (props: IProps) => (
    <SVG {...props.svg}>
        <path d="M8.5 13.5l2.5 3 3.5-4.5 4.5 6H5l3.5-4.5zM21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2z" />
    </SVG>
);

export default IconFileImage;
