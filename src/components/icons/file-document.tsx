import React from 'react';

import SVG, { IProps as IPropsSVG } from './index';

export interface IProps {
    svg?: IPropsSVG
}

export const IconFileDocument = (props: IProps) => (
    <SVG {...props.svg}>
        <path d="M13 9h5.5L13 3.5V9zM6 2h8l6 6v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4c0-1.11.89-2 2-2zm9 16v-2H6v2h9zm3-4v-2H6v2h12z" />
    </SVG>
);

export default IconFileDocument;
