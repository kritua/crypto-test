import React, { useMemo, useEffect, ReactNode, ChangeEvent, Fragment } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { IStyle, useClassnames } from 'hook/use-classnames';
import Error from 'component/error';

import style from './index.module.pcss';

export interface IProps {
    name: string,
    className?: IStyle | string,
    direction?: 'row' | 'column',
    label?: ReactNode,
    required?: boolean,
    autoFocus?: boolean,
    tabIndex?: number,
    disabled?: boolean,
    elError?: boolean,
    checked?: boolean,
    onChange?(e: ChangeEvent<HTMLInputElement>): void
}

const Checkbox = (props: IProps) => {
    const cn = useClassnames(style, props.className, true);
    const { formState: { errors }, watch, trigger, control } = useFormContext();
    const direction = useMemo(() => props.direction || 'row', [props.direction]);
    const value = watch(props.name);

    const elLabel = useMemo(() => {
        if(props.label) {
            return (
                <strong
                    className={cn('checkbox__label', {
                        'checkbox__label_required': props.required
                    })}
                >
                    {props.label}
                </strong>
            );
        }
    }, [props.label, props.required]);

    const elError = useMemo(() => {
        if(props.elError !== false) {
            return <ErrorMessage as={Error} name={props.name} errors={errors} className={cn('checkbox__error')} />;
        }
    }, [props.elError, props.name, errors[props.name]]);

    useEffect(() => {
        if(value) {
            void trigger(props.name);
        }
    }, []);

    return (
        <label className={cn('checkbox', `checkbox_${direction}`)}>
            <Controller
                name={props.name}
                control={control}
                render={({ field }) => {
                    return (
                        <Fragment>
                            <div className={cn('checkbox__group')}>
                                <input
                                    type="checkbox"
                                    autoFocus={props.autoFocus}
                                    tabIndex={props.tabIndex}
                                    disabled={props.disabled}
                                    className={cn('checkbox__input', {
                                        'checkbox__input_error': errors[props.name]
                                    })}
                                    {...field}
                                    checked={field.value !== undefined ? field.value : false}
                                />
                                {elError}
                            </div>
                            {elLabel}
                        </Fragment>
                    );
                }}
            />
        </label>
    );
};

export default Checkbox;
