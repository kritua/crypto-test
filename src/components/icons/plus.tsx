import React from 'react';

import SVG, { IProps as IPropsSVG } from './index';

export interface IProps {
    svg?: IPropsSVG
}

export const IconPlus = (props: IProps) => (
    <SVG {...props.svg}>
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </SVG>
);

export default IconPlus;
