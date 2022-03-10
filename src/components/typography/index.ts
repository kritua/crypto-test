import { ReactNode, createElement } from 'react';

import useClassnames, { IStyle } from 'hook/use-classnames';

import style from './index.module.pcss';

export type TPreset = 'h1' | 'h2' | 'h3' | 'h4' | 'text' | 'text-small' | 'text-medium' | 'text-semibold' | 'label' | 'label-medium' | 'caption';

export interface IProps {
    className?: string | IStyle,
    preset?: TPreset,
    children?: ReactNode,
    type?: string,
    htmlFor?: string,
    lineClamp?: number
}

const PRESET_TYPE = {
    'h1'           : 'h1',
    'h2'           : 'h2',
    'h3'           : 'h3',
    'h4'           : 'h4',
    'text'         : 'span',
    'text-small'   : 'span',
    'text-medium'  : 'span',
    'text-semibold': 'strong',
    'label'        : 'label',
    'label-medium' : 'label',
    'caption'      : 'span'
};

export const Typography = (props: IProps) => {
    const cn = useClassnames(style, props.className, true);
    let type = props.type || 'span';

    if(props.preset) {
        type = PRESET_TYPE[props.preset];
    }

    const optionalProps = props.lineClamp && { style: { 'WebkitLineClamp': props.lineClamp } };

    if(type) {
        return createElement(type, {
            className: cn('typography', {
                [`typography_${props.preset}`]: props.preset,
                'typography_line-clamp'       : props.lineClamp
            }),
            ...optionalProps,
            htmlFor: props.htmlFor
        }, props.children);
    }

    return null;
};

export default Typography;
