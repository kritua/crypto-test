import React from 'react';

import SVG, { IProps as IPropsSVG } from './index';

export interface IProps {
    svg?: IPropsSVG
}

export const IconSubdirectory = (props: IProps) => (
    <SVG {...props.svg}>
        <path d="M19 15L13 21L11.58 19.58L15.17 16H4V4H6V14H15.17L11.58 10.42L13 9L19 15Z" />
    </SVG>
);

export default IconSubdirectory;

