import React, { ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { UnpackNestedValue, useForm, FormProvider } from 'react-hook-form';

import useClassnames, { IStyle } from 'hook/use-classnames';

import Button from 'component/button';

import style from './index.module.pcss';

export interface IFormData {
    [key: string]: unknown
}

export interface IProps {
    className?: IStyle | string,
    legend?: string,
    isLoading?: boolean,
    primaryButton?: string,
    secondaryButton?: string,
    children: ReactNode,
    onSubmit?(formData: IFormData): void,
    onInvalid?(formData: IFormData): void
}

export const Form = (props: IProps) => {
    const cn = useClassnames(style, props.className, true);
    const { t } = useTranslation();
    const methods = useForm({
        mode: 'all'
    });

    const onValid = (value: UnpackNestedValue<IFormData>) => {
        console.info(value);

        if(props.onSubmit) {
            props.onSubmit(value);
        }
    };

    const onInvalid = (value: UnpackNestedValue<IFormData>) => {
        console.info(value);

        if(props.onInvalid) {
            props.onInvalid(value);
        }
    };

    const elPrimaryButton = useMemo(() => {
        let text = t('components.form.submit');

        if(props.primaryButton) {
            text = props.primaryButton;
        }

        return <Button type="submit">{text}</Button>;
    }, [props.primaryButton, props.isLoading]);

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onValid, onInvalid)} className={cn('form')}>
                <legend className={cn('form__legend')}>
                    {props.legend}
                </legend>
                <div className={cn('form__form-content')}>
                    {props.children}
                </div>
                <div className={cn('form__controls')}>
                    {props.secondaryButton && <Button isSecondary={true}>{props.secondaryButton}</Button>}
                    {elPrimaryButton}
                </div>
            </form>
        </FormProvider>
    );
};

export default Form;
