import React, { useEffect, useMemo, useState, ChangeEvent } from 'react';
import { useFormContext, Message, DeepMap, FieldError, FieldValues } from 'react-hook-form';
import { ValidationRule } from 'react-hook-form/dist/types/validator';
import { ErrorMessage } from '@hookform/error-message';

import useClassnames, { IStyle } from 'hook/use-classnames';

import Error from 'component/error';

import style from './index.module.pcss';

export interface IProps {
    name: string,
    type: 'text' | 'search' | 'password' | 'number' | 'hidden',
    placeholder?: string,
    className?: string | IStyle,
    label?: string,
    disabled?: boolean,
    required?: Message | ValidationRule<boolean>,
    maxLength?: ValidationRule<number>,
    minLength?: ValidationRule<number>,
    pattern?: ValidationRule<RegExp>,
    onChange?(e?: ChangeEvent<HTMLInputElement>): void
}

interface IInputRaw extends IProps {
    errors?: DeepMap<FieldValues, FieldError>,
    isWatch?: boolean,
    attributes?: Record<string, unknown>
}

export const InputRaw = (props: IInputRaw) => {
    const cn = useClassnames(style, props.className, true);
    const errors = props.errors;

    const attrs = {
        className: cn('input', {
            'input_invalid': errors?.[props.name]?.message && props.isWatch
        }),
        type       : props.type,
        placeholder: props.placeholder,
        onChange   : props.onChange,
        disabled   : props.disabled,
        ...(props?.attributes ? props?.attributes : {})
    };

    const elError = useMemo(() => {
        if(errors?.[props.name]?.message && props.isWatch) {
            return (
                <ErrorMessage
                    as={Error}
                    name={props.name}
                    elIcon={true}
                    errors={errors}
                    className={cn('field__error')}
                />
            );
        }
    }, [props.name, errors?.[props.name], props.isWatch]);

    const elLabel = useMemo(() => {
        if(props.label) {
            return (
                <strong className={cn('input__label-text', { 'input__label-text_required': props.required })}>
                    {props.label}
                </strong>
            );
        }
    }, [props.label]);

    if(props.label) {
        return (
            <label className={cn('input__label')}>
                {elLabel}
                <input {...attrs} />
                {elError}
            </label>
        );
    }

    return <input {...attrs} />;
};

export const Input = (props: IProps) => {
    const { formState: { errors, touchedFields, isSubmitted }, register, trigger, watch } = useFormContext();
    const value = watch(props.name);

    const [isWatch, setIsWatch] = useState<boolean>(touchedFields[props.name]);

    useEffect(() => {
        setIsWatch(touchedFields[props.name] || isSubmitted);
    }, [touchedFields[props.name], isSubmitted]);

    useEffect(() => {
        if(value) {
            void trigger(props.name);
        }
    }, []);

    return (
        <InputRaw
            {...props}
            isWatch={isWatch}
            errors={errors}
            attributes={register(props.name, {
                required : props.required,
                maxLength: props.maxLength,
                minLength: props.minLength,
                pattern  : props.pattern
            })}
        />
    );
};

export default Input;
