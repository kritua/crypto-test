import { useMemo } from 'react';
import classnames from 'classnames/bind';

export interface IStyle {
    [key: string]: string
}

const classNames = (targetStyle: IStyle, sourceStyle?: IStyle | string, combine?: boolean) => {
    if(typeof sourceStyle === 'object' && !Array.isArray(sourceStyle)) {
        if(combine) {
            const style = { ...targetStyle };
            const keys = Object.keys(sourceStyle);

            for(const key of keys) {
                style[key] = style[key] ? `${style[key]} ${sourceStyle[key]}` : sourceStyle[key];
            }

            return classnames.bind(style);
        }

        return classnames.bind({
            ...targetStyle,
            ...sourceStyle
        });
    } else if(typeof sourceStyle === 'string') {
        const style = { ...targetStyle };
        const keys = Object.keys(style);

        if(keys[0]) {
            style[keys[0]] = `${style[keys[0]]} ${sourceStyle}`;
        }

        return classnames.bind(style);
    }

    return classnames.bind(targetStyle);
};

export const useClassnames = (targetStyle: IStyle, sourceStyle?: IStyle | string, combine?: boolean) => {
    return useMemo(() => classNames(targetStyle, sourceStyle, combine), [targetStyle, sourceStyle, combine]);
};

export default useClassnames;
