import React from 'react';

import useClassnames from 'hook/use-classnames';

import Error from 'component/error/index';

import style from './errors.module.pcss';

interface IProps {
    isLoading?: boolean,
    isError?: boolean,
    error: unknown
}

const ErrorsComponent = (props: IProps) => {
    const cn = useClassnames(style);

    if(!props.isLoading && props.isError) {
        const errors = props.error as {
            data: {
                details: Record<string, Array<string>> | string
            }
        };

        if(errors?.data?.details && typeof errors?.data?.details !== 'string') {
            const keys = Object.keys(errors.data.details);

            return (
                <div className={cn('errors')}>
                    <div className={cn('errors__scroll')}>
                        {keys.map((key) => {
                            if(typeof errors?.data?.details?.[key] === 'string') {
                                return <Error key={key}>{`${key}: ${errors?.data?.details?.[key]}`}</Error>;
                            }

                            return (errors?.data?.details as Record<string, Array<string>>)?.[key]?.map((message, index) => (
                                <Error key={`${key}-${index}}`}>{`${key}: ${message}`}</Error>
                            ));
                        })}
                    </div>
                </div>
            );
        }

        return <Error>{errors?.data?.details}</Error>;
    }

    return null;
};

export default ErrorsComponent;
