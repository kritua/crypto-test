import React from 'react';

import SVG, { IProps as IPropsSVG } from './index';

export interface IProps {
    svg?: IPropsSVG
}

export const IconArrowDown = (props: IProps) => {
    return (
        <SVG viewBox="0 0 28 28" {...props.svg}>
            <path d="M23.7118,15.7021 C24.1,15.3092 24.0962,14.6761 23.7034,14.2879 C23.3105,13.8997 22.6774,13.9035 22.2892,14.2963 L15.0005,21.6726 L15.0005,3.99725 C15.0005,3.44497 14.5528,2.99725 14.0005,2.99725 C13.4482,2.99725 13.0005,3.44497 13.0005,3.99725 L13.0005,21.6703 L5.71406,14.2963 C5.32588,13.9035 4.69272,13.8997 4.29987,14.2879 C3.90703,14.6761 3.90325,15.3092 4.29143,15.7021 L13.1125,24.6291 C13.6018,25.1243 14.4014,25.1243 14.8908,24.6291 L23.7118,15.7021 Z" />
        </SVG>
    );
};

export default IconArrowDown;

