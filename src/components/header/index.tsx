import React, { HTMLAttributes, ReactNode } from 'react';

import useClassnames, { IStyle } from 'hook/use-classnames';

import style from './index.module.pcss';

interface IHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'className'> {
    children: ReactNode,
    level?: 1 | 2 | 3 | 4 | 5,
    tag?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5',
    contrast?: boolean,
    className?: string | IStyle
}

const Header = ({ children, level = 1, tag, contrast = false, ...props }: IHeaderProps) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const Tag = tag || `h${level}`;
    const cn = useClassnames(style, props.className, true);

    return (
        <Tag {...props} className={cn('header', { [`header_level-${level}`]: level, 'header_contrasted': contrast })}>
            {children}
        </Tag>
    );
};

export const H1 = (props: IHeaderProps) => <Header {...props} level={1} />;
export const H2 = (props: IHeaderProps) => <Header {...props} level={2} />;
export const H3 = (props: IHeaderProps) => <Header {...props} level={3} />;
export const H4 = (props: IHeaderProps) => <Header {...props} level={4} />;
export const H5 = (props: IHeaderProps) => <Header {...props} level={5} />;

export default Header;
