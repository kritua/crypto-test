import { ReactNode, RefObject } from 'react';
import { IStyle } from 'hook/use-classnames';

export interface IProps {
    children?: ReactNode,
    className?: string | IStyle,
    elIcon?: boolean,
    mountDelay?: number,
    refEl?: RefObject<HTMLDivElement> | null
}
