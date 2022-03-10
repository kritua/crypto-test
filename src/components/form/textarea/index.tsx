import React, { useEffect, useMemo, useState } from 'react';
import { useFormContext, Message } from 'react-hook-form';
import { ValidationRule } from 'react-hook-form/dist/types/validator';
import { ErrorMessage } from '@hookform/error-message';

import useClassnames, { IStyle } from 'hook/use-classnames';

import Error from 'component/error';

import { EDirection } from '../types';
import style from './index.module.pcss';

export interface IProps {
    name: string,
    placeholder?: string,
    className?: string | IStyle,
    label?: string,
    required?: Message | ValidationRule<boolean>,
    rows?: number,
    direction?: EDirection
}

export const Textarea = (props: IProps) => {
    const cn = useClassnames(style, props.className, true);
    const { formState: { errors, touchedFields, isSubmitted }, register } = useFormContext();
    const direction = useMemo(() => props.direction || 'row', [props.direction]);
    const rows = useMemo(() => props.rows || 6, [props.rows]);

    const [isWatch, setIsWatch] = useState<boolean>(touchedFields[props.name]);

    useEffect(() => {
        setIsWatch(touchedFields[props.name] || isSubmitted);
    }, [touchedFields[props.name], isSubmitted]);

    const attrs = {
        className: cn('input', {
            'input_invalid'   : errors?.[props.name]?.message && isWatch,
            'input_sized-rows': !!rows
        }),
        placeholder: props.placeholder,
        ...register(props.name, {
            required: props.required
        }),
        rows
    };

    const elError = useMemo(() => {
        if(errors?.[props.name]?.message && isWatch) {
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
    }, [props.name, errors?.[props.name], isWatch]);

    const elLabel = useMemo(() => {
        if(props.label) {
            return (
                <strong
                    className={cn('input__label-text', {
                        'input__label-text_required': props.required
                    })}
                >
                    {props.label}
                </strong>
            );
        }
    }, [props.label]);

    return (
        <label className={cn('input__label', `input__label_${direction}`)}>
            {elLabel}
            <textarea {...attrs} />
            {elError}
        </label>
    );
};

Textarea.direction = EDirection;

export default Textarea;
