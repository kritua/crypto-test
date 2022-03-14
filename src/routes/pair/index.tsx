import React, { Fragment, useEffect, useState, useMemo, MouseEvent, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm, FormProvider } from 'react-hook-form';
import { Typography, Skeleton, Paper, Container, Button, Stack, Modal } from '@mui/material';

import useClassnames from 'hook/use-classnames';
import { useLocalStorage } from 'hook/use-localstorage';

import IconLike from 'component/icons/like';
import IconChevronDown from 'component/icons/chevron-down';
import IconArrowDown from 'component/icons/arrow-down';
import IconSuccessInCircle from 'component/icons/success-in-circle';
import Input from 'component/form/input';
import Loader from 'component/loader';
import ErrorComponent from 'component/error';

import { IPostPairRequestResponse, main } from 'adapter/api/main';

import style from './index.module.pcss';

interface IForm {
    from?: string,
    to?: string,
    fromToken?: string,
    toToken?: string
}

const SUCCESS_TIMER = 5;

export const Pair = () => {
    const cn = useClassnames(style);
    const { t } = useTranslation();
    const { address } = useParams<{ address: string }>();
    const { getStorage, setStorage } = useLocalStorage('pairs');

    const context = useForm<IForm>();
    const { formState: { isValid, dirtyFields, errors }, reset, setValue, clearErrors, handleSubmit, setError } = context;
    const values = context.watch();

    const [post, { isLoading }] = main.usePostCurrenciesByIdMutation();

    const [data, setData] = useState<IPostPairRequestResponse>();
    const [tempStorage, setTempStorage] = useState<Array<string>>([]);
    const [showTradeModal, setShowTradeModal] = useState<boolean>(false);
    const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
    const [requestError, setRequestError] = useState<string>();
    const [timer, setTimer] = useState<number>(SUCCESS_TIMER);
    const [success, setSuccess] = useState<boolean>(false);

    const successTimer = useRef<null | number>();

    const onClearInterval = (): void => {
        if(successTimer.current) {
            clearInterval(successTimer.current);
            successTimer.current = null;
            setSuccess(false);
            setTimer(SUCCESS_TIMER);
        }
    };

    useEffect(() => {
        if(timer === 0) {
            onClearInterval();
        }
    }, [timer]);


    useEffect(() => {
        return () => {
            onClearInterval();
        };
    }, []);

    useEffect(() => {
        const newTempStorage = Object.values(getStorage());

        if(newTempStorage.length) {
            setTempStorage(getStorage());
        }
    }, []);

    useEffect(() => {
        post({
            address
        })
            .unwrap()
            .then((resp) => {
                if(resp) {
                    setData(resp);
                    setValue('fromToken', resp.meta.base);
                    setValue('toToken', resp.meta.counter);
                }
            })
            .catch(console.error);
    }, []);

    const isNumber = (value: string) => {
        return /^\d+$/.test(value);
    };

    const onResetFieldsValidation = () => {
        reset({}, {
            keepValues     : true,
            keepDirty      : false,
            keepTouched    : true,
            keepErrors     : true,
            keepIsSubmitted: false,
            keepSubmitCount: false,
            keepIsValid    : false
        });
    };

    useEffect(() => {
        if(data) {
            if(dirtyFields.from) {
                const valuesFrom = values.from ?? '0';
                const newToValue = (parseFloat(data.leftPrice) * parseFloat(valuesFrom)) / parseFloat(data.rightPrice);

                if(values.from && !isNumber(values.from)) {
                    setError('from', {
                        type   : 'manual',
                        message: t('routes.pair.modal.form.error')
                    });
                } else {
                    setValue('to', newToValue ? String(newToValue) : undefined);
                    clearErrors('from');
                }
            } else if(dirtyFields.to) {
                const valuesTo = values.to ?? '0';
                const newFromValue = (parseFloat(data.rightPrice) * parseFloat(valuesTo)) / parseFloat(data.leftPrice);

                if(values.to && !isNumber(values.to)) {
                    setError('to', {
                        type   : 'manual',
                        message: t('routes.pair.modal.form.error')
                    });
                } else {
                    setValue('from', newFromValue ? String(newFromValue) : undefined);
                    clearErrors('to');
                }
            }

            onResetFieldsValidation();
        }
    }, [JSON.stringify(values)]);

    const onSubmit = handleSubmit((formData) => {
        setIsLoadingSubmit(true);
        setRequestError(undefined);

        const randomGenerator = Math.floor(Math.random() * 100) + 1;
        const ticTacToe = new Promise((resolve, reject) => {
            setTimeout(() => {
                if(randomGenerator <= 50) {
                    resolve(true);
                } else {
                    reject(new Error('Rejected with no reason'));
                }
            }, 5000);
        });

        ticTacToe
            .then((resp) => {
                if(resp) {
                    setSuccess(true);
                    successTimer.current = window.setInterval(() => {
                        setTimer((state) => state - 1);
                    }, 1000);
                }
            })
            .catch((error) => {
                setRequestError(error.message);
                console.error(error);
            })
            .finally(() => {
                setIsLoadingSubmit(false);
            });
        console.info('formData', formData, randomGenerator);
    });

    const onClickTrade = () => {
        setShowTradeModal(true);
    };

    const onCloseTradeModal = () => {
        setShowTradeModal(false);
        reset();
    };

    const onClickLike = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        const currentStorage = getStorage();
        const newStorage = [...currentStorage];

        if(newStorage.includes(address)) {
            const indexOfElement = newStorage.findIndex((item) => item === address);

            newStorage.splice(indexOfElement, 1);
        } else {
            newStorage.push(address);
        }

        setStorage(newStorage);
        setTempStorage(newStorage);
    };

    const elHeader = useMemo(() => {
        let content = <Skeleton variant="text" width={300} height={50} />;

        if(!isLoading && data?.meta) {
            content = t('routes.pair.title', { meta: `${data?.meta?.base} / ${data?.meta?.counter}` });
        }

        return (
            <Typography variant="h4">
                {content}
            </Typography>
        );
    }, [isLoading, JSON.stringify(data?.meta)]);

    const formatNumbersWithSpaces = (value: string) => {
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };

    const elPairInfo = useMemo(() => {
        let content = (
            <Fragment>
                <Skeleton variant="text" width={100} height={20} />
                <Skeleton variant="text" width={200} height={30} />
                <Skeleton variant="text" width={200} height={30} />
            </Fragment>
        );

        if(!isLoading && data?.meta) {
            content = (
                <Fragment>
                    <Typography sx={{ fontSize: 14, marginBottom: 1 }} color="text.secondary">
                        {t('routes.pair.blocks.tokens')}
                    </Typography>
                    <Stack direction="row" sx={{ justifyContent: 'space-between', gap: 1, alignItems: 'center' }}>
                        <Typography>{data.meta.base}</Typography>
                        <Typography sx={{ textAlign: 'right', fontSize: 12 }}>{formatNumbersWithSpaces(data.leftLocked)}</Typography>
                    </Stack>
                    <Stack direction="row" sx={{ justifyContent: 'space-between', gap: 1, alignItems: 'center' }}>
                        <Typography>{data.meta.counter}</Typography>
                        <Typography sx={{ textAlign: 'right', fontSize: 12 }}>{formatNumbersWithSpaces(data.rightLocked)}</Typography>
                    </Stack>
                </Fragment>
            );
        }

        return (
            <Paper classes={{ root: cn('pair__list-item') }}>
                {content}
            </Paper>
        );
    }, [JSON.stringify(data?.meta), isLoading]);

    const elButton = useMemo(() => {
        if(isLoading) {
            return (
                <Fragment>
                    <Skeleton variant="circular" width={34} height={34} />
                    <Skeleton variant="rectangular" width={100} height={34} />
                </Fragment>
            );
        }

        return (
            <Fragment>
                <Button
                    fullWidth={true}
                    size="large"
                    variant="text"
                    classes={{ root: cn('pair__button') }}
                    onClick={onClickLike}
                >
                    <IconLike
                        svg={{
                            className: cn('pair__icon-like', {
                                'pair__icon-like_liked': tempStorage.includes(address)
                            })
                        }}
                    />
                </Button>
                <Button
                    color="primary"
                    fullWidth={true}
                    size="large"
                    variant="contained"
                    classes={{ root: cn('pair__button') }}
                    onClick={onClickTrade}
                >
                    {t('routes.pair.buttons.trade')}
                </Button>
            </Fragment>
        );
    }, [isLoading, JSON.stringify(tempStorage)]);

    const elChevronIconText = (changeValue: string) => {
        const isNegative = changeValue.includes('-');
        const isZero = parseFloat(changeValue) === 0;

        return (
            <Stack direction="row">
                {!isZero && (
                    <IconChevronDown
                        svg={{
                            className: cn('pair__chevron', {
                                'pair__chevron_positive': !isNegative
                            })
                        }}
                    />
                )}
                <Typography
                    classes={{
                        root: cn('pair__change-text', {
                            'pair__change-text_positive': !isNegative && !isZero,
                            'pair__change-text_negative': isNegative
                        })
                    }}
                >
                    {`${changeValue}%`}
                </Typography>
            </Stack>
        );
    };

    const elTVLInfo = useMemo(() => {
        let content = (
            <Fragment>
                <Skeleton variant="text" width={100} height={20} />
                <Skeleton variant="text" width={200} height={40} />
                <Skeleton variant="text" width={100} height={20} />
            </Fragment>
        );

        if(!isLoading && data) {
            content = (
                <Fragment>
                    <Typography sx={{ fontSize: 14, marginBottom: 1 }} color="text.secondary">
                        {t('routes.pair.blocks.tvl')}
                    </Typography>
                    <Typography sx={{ fontSize: 24 }}>
                        {`$${formatNumbersWithSpaces(parseInt(data.tvl, 10).toFixed(0))}`}
                    </Typography>
                    {elChevronIconText(data.tvlChange)}
                </Fragment>
            );
        }

        return (
            <Paper classes={{ root: cn('pair__list-item') }}>
                {content}
            </Paper>
        );
    }, [isLoading, JSON.stringify(data)]);

    const elVolumeInfo = useMemo(() => {
        let content = (
            <Fragment>
                <Skeleton variant="text" width={100} height={20} />
                <Skeleton variant="text" width={200} height={40} />
                <Skeleton variant="text" width={100} height={20} />
            </Fragment>
        );

        if(!isLoading && data) {
            content = (
                <Fragment>
                    <Typography sx={{ fontSize: 14, marginBottom: 1 }} color="text.secondary">
                        {t('routes.pair.blocks.24h-vol')}
                    </Typography>
                    <Typography sx={{ fontSize: 24 }}>
                        {`$${formatNumbersWithSpaces(parseInt(data.volume24h, 10).toFixed(0))}`}
                    </Typography>
                    {elChevronIconText(data.volumeChange24h)}
                </Fragment>
            );
        }

        return (
            <Paper classes={{ root: cn('pair__list-item') }}>
                {content}
            </Paper>
        );
    }, [isLoading, JSON.stringify(data)]);

    const elFeesInfo = useMemo(() => {
        let content = (
            <Fragment>
                <Skeleton variant="text" width={100} height={20} />
                <Skeleton variant="text" width={200} height={40} />
                <Skeleton variant="text" width={100} height={20} />
            </Fragment>
        );

        if(!isLoading && data) {
            content = (
                <Fragment>
                    <Typography sx={{ fontSize: 14, marginBottom: 1 }} color="text.secondary">
                        {t('routes.pair.blocks.24h-fees')}
                    </Typography>
                    <Typography sx={{ fontSize: 24 }}>
                        {`$${formatNumbersWithSpaces(parseInt(data.fee24h, 10).toFixed(0))}`}
                    </Typography>
                </Fragment>
            );
        }

        return (
            <Paper classes={{ root: cn('pair__list-item') }}>
                {content}
            </Paper>
        );
    }, [isLoading, JSON.stringify(data)]);

    const elError = useMemo(() => {
        if(requestError) {
            return <ErrorComponent elIcon={true}>{requestError}</ErrorComponent>;
        }
    }, [requestError]);

    const elModalContent = () => {
        if(success) {
            return (
                <div className={cn('pair__success')}>
                    <Typography variant="h5">{t('routes.pair.modal.success.title')}</Typography>
                    <IconSuccessInCircle svg={{ className: cn('pair__success-icon') }} />
                </div>
            );
        }

        return (
            <FormProvider {...context}>
                <form
                    className={cn('pair__modal-container')}
                    onSubmit={onSubmit}
                >
                    <div className={cn('pair__modal-inputs')}>
                        <Input
                            disabled={isLoadingSubmit}
                            required={true}
                            className={cn('pair__modal-input')}
                            name="from"
                            type="text"
                            label={t('routes.pair.modal.form.from.label')}
                        />
                        <Input
                            type="text"
                            name="fromToken"
                            label={t('routes.pair.modal.form.from.token')}
                            disabled={true}
                        />
                    </div>
                    <IconArrowDown />
                    <div className={cn('pair__modal-inputs')}>
                        <Input
                            disabled={isLoadingSubmit}
                            name="to"
                            type="text"
                            label={t('routes.pair.modal.form.to.label')}
                        />
                        <Input
                            name="toToken"
                            type="text"
                            label={t('routes.pair.modal.form.to.token')}
                            disabled={true}
                        />
                    </div>
                    {elError}
                    <Stack
                        direction="row"
                        sx={{ justifyContent: 'flex-end', gap: 1, alignItems: 'center', marginTop: 5 }}
                    >
                        <Button
                            color="primary"
                            size="large"
                            variant="contained"
                            type="submit"
                            disabled={!isValid || !!errors.from || !!errors.to || isLoadingSubmit}
                            sx={{ fontSize: '16px', lineHeight: '24px', minWidth: '110px' }}
                        >
                            {isLoadingSubmit ? <Loader className={cn('pair__loader')} /> : t('routes.pair.modal.form.buttons.submit')}
                        </Button>
                        <Button
                            disabled={isLoadingSubmit}
                            color="primary"
                            size="large"
                            variant="outlined"
                            onClick={onCloseTradeModal}
                            sx={{ fontSize: '16px', lineHeight: '24px', minWidth: '110px' }}
                        >
                            {t('routes.pair.modal.form.buttons.cancel')}
                        </Button>
                    </Stack>
                </form>
            </FormProvider>
        );
    };

    const elTradeModal = () => {
        return (
            <Modal
                open={showTradeModal}
                onClose={onCloseTradeModal}
                classes={{ root: cn('pair__modal') }}
            >
                <Paper classes={{ root: cn('pair__modal-content') }}>
                    <Typography variant="h5">
                        {t('routes.pair.modal.title')}
                    </Typography>
                    <Container disableGutters={true}>
                        {elModalContent()}
                    </Container>
                </Paper>
            </Modal>
        );
    };

    return (
        <div className={cn('pair')}>
            <Container maxWidth="lg">
                {elHeader}
                <Container
                    maxWidth="lg"
                    disableGutters={true}
                    classes={{ root: cn('pair__buttons') }}
                    sx={{ display: 'grid' }}
                >
                    {elButton}
                </Container>
                <Container
                    maxWidth="lg"
                    disableGutters={true}
                    classes={{ root: cn('pair__list') }}
                    sx={{ display: 'flex' }}
                >
                    {elPairInfo}
                    {elTVLInfo}
                    {elVolumeInfo}
                    {elFeesInfo}
                </Container>
            </Container>
            {elTradeModal()}
        </div>
    );
};

export default Pair;
