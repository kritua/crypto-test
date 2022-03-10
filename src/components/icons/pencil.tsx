import React from 'react';

import SVG, { IProps as IPropsSVG } from './index';

export interface IProps {
    svg?: IPropsSVG
}

export const IconPencil = (props: IProps) => (
    <SVG {...props.svg}>
        <path d="M19.74 7.593c.347-.347.347-.924 0-1.253l-2.08-2.08c-.329-.347-.906-.347-1.253 0l-1.635 1.626 3.333 3.333 1.635-1.626zM4 16.667V20h3.333l9.83-9.839L13.83 6.83 4 16.666z" />
    </SVG>
);

export default IconPencil;
