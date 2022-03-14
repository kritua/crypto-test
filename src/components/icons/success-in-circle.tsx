import React from 'react';

import SVG, { IProps as IPropsSVG } from './index';

export interface IProps {
    svg?: IPropsSVG
}

export const IconSuccessInCircle = (props: IProps) => (
    <SVG width="24" height="24" fill="none" {...props.svg}>
        <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.48 6.47 2 11.99 2 17.52 2 22 6.48 22 12s-4.48 10-10.01 10C6.47 22 2 17.52 2 12zm5.266-.067a.921.921 0 011.285 0l2.085 2.045 4.813-4.717a.921.921 0 011.285 0 .88.88 0 010 1.262l-6.1 5.977-3.368-3.306a.88.88 0 010-1.26z" />
    </SVG>
);

export default IconSuccessInCircle;
