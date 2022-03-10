import { ReactNode, MouseEvent, CSSProperties } from 'react';
import { LocationDescriptor } from 'history';

export type TButtonType = 'button' | 'submit' | 'reset';

export interface IProps {
    className?: string,
    target?: string,
    disabled?: boolean,
    isLoading?: boolean,
    isSecondary?: boolean,
    type?: TButtonType,
    children?: ReactNode | string,
    href?: string,
    tabIndex?: number,
    style?: CSSProperties,
    form?: string,
    to?: LocationDescriptor<{
        modal?: boolean,
        from?: string
    }>,
    onClick?(e: MouseEvent): void
}
