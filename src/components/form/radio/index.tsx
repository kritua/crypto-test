import React, { useMemo, useEffect, ReactNode } from 'react';
import { Message, useFormContext, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { ValidationRule } from 'react-hook-form/dist/types/validator';

import { IStyle, useClassnames } from 'hook/use-classnames';
import Error from 'component/error';

import style from './index.module.pcss';

export interface IValue {
    label: ReactNode | string,
    value: string,
    checked?: boolean,
    payload?: unknown
}

export interface IProps {
    name: string,
    className?: IStyle | string,
    direction?: 'row' | 'column',
    optionsDirection?: 'row' | 'column',
    label?: ReactNode,
    options: Array<IValue>,
    required?: Message | ValidationRule<boolean>,
    tabIndex?: number,
    disabled?: boolean,
    elError?: boolean,
    dataQA?: string
}

const InputRadio = (props: IProps) => {
    const cn = useClassnames(style, props.className, true);
    const { formState: { errors }, watch, trigger, control } = useFormContext();
    const direction = useMemo(() => props.direction || 'row', [props.direction]);
    const optionsDirection = useMemo(() => props.optionsDirection || 'row', [props.optionsDirection]);
    const value = watch(props.name);

    const elLabel = useMemo(() => {
        if(props.label) {
            return (
                <strong
                    className={cn('radio__label', {
                        'radio__label_required': props.required
                    })}
                >
                    {props.label}
                </strong>
            );
        }
    }, [props.label, props.required]);

    const elError = useMemo(() => {
        if(props.elError !== false) {
            return <ErrorMessage as={Error} elIcon={true} name={props.name} errors={errors} className={cn('radio__error')} />;
        }
    }, [props.elError, props.name, errors[props.name]]);

    useEffect(() => {
        if(value) {
            void trigger(props.name);
        }
    }, []);

    return (
        <div className={cn('radio', `radio_${direction}`)}>
            {elLabel}
            <Controller
                name={props.name}
                control={control}
                rules={{ required: props.required }}
                render={({ field: { value: fieldValue, ...rest } }) => {
                    return (
                        <div className={cn('radio__group', `radio__group_${optionsDirection}`)}>
                            {props.options.map((option) => {
                                return (
                                    <label key={option.value} className={cn('radio__field')}>
                                        <input
                                            id={option.value}
                                            type="radio"
                                            key={option.value}
                                            defaultChecked={parseInt(option.value, 10) === value.value}
                                            disabled={props.disabled}
                                            tabIndex={props.tabIndex}
                                            className={cn('radio__input', {
                                                'radio__input_error': errors[props.name]
                                            })}
                                            {...rest}
                                            onChange={() => {
                                                rest.onChange(option);
                                            }}
                                        />
                                        {option.label}
                                    </label>
                                );
                            })}
                        </div>
                    );
                }}
            />
            {elError}
        </div>
    );
};

export default InputRadio;
