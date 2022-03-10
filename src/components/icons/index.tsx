import React, { SVGAttributes, ReactNode } from 'react';

export interface IProps extends SVGAttributes<SVGElement> {
    children?: ReactNode,
    className?: string
}

export const defaultProps = {
    xmlns  : 'http://www.w3.org/2000/svg',
    width  : 24,
    height : 24,
    viewBox: '0 0 24 24'
};

const SVG = (props: IProps) => <svg {...props} />;

SVG.defaultProps = defaultProps;

export default SVG;
