import React from 'react';

import SVG, { IProps as IPropsSVG } from './index';

export interface IProps {
    svg?: IPropsSVG
}

export const IconArrowLeftFull = (props: IProps) => (
    <SVG {...props.svg} viewBox="0 0 16 16">
        <path
            d="M16 7.00008V9.00008H4.00003L9.50003 14.5001L8.08003 15.9201L0.160034 8.00008L8.08003 0.0800781L9.50003 1.50008L4.00003 7.00008H16Z"
        />
    </SVG>
);

export default IconArrowLeftFull;