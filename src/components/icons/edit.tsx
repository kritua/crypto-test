import React from 'react';

import SVG, { IProps as IPropsSVG } from './index';

export interface IProps {
    svg?: IPropsSVG
}

export const IconEdit = (props: IProps) => (
    <SVG {...props.svg} fill="none">
        <path d="M10.083 3.667H3.667A1.833 1.833 0 001.833 5.5v12.833a1.833 1.833 0 001.834 1.834H16.5a1.833 1.833 0 001.833-1.834v-6.416" stroke="#000" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.958 2.292a1.945 1.945 0 012.75 2.75L11 13.75l-3.667.917L8.25 11l8.708-8.708z" stroke="#000" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
);

export default IconEdit;

