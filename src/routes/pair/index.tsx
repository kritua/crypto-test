import React, { Fragment, useEffect, useState, useMemo, MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Typography, Skeleton, Paper, Container, Button, Stack } from '@mui/material';

import useClassnames from 'hook/use-classnames';
import { useLocalStorage } from 'hook/use-localstorage';

import IconLike from 'component/icons/like';
import IconChevronDown from 'component/icons/chevron-down';

import { IPostPairRequestResponse, main } from 'adapter/api/main';

import style from './index.module.pcss';

export const Pair = () => {
    const cn = useClassnames(style);
    const { t } = useTranslation();
    const { address } = useParams<{ address: string }>();
    const { getStorage, setStorage } = useLocalStorage('pairs');

    const [post, { isLoading }] = main.usePostCurrenciesByIdMutation();

    const [data, setData] = useState<IPostPairRequestResponse>();
    const [tempStorage, setTempStorage] = useState<Array<string>>([]);

    useEffect(() => {
        setTempStorage(getStorage());
    }, []);

    useEffect(() => {
        post({
            address
        })
            .unwrap()
            .then((resp) => {
                setData(resp);
            })
            .catch(console.error);
    }, []);

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
                    <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                        <Typography>{data.meta.base}</Typography>
                        <Typography>{formatNumbersWithSpaces(data.leftLocked)}</Typography>
                    </Stack>
                    <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                        <Typography>{data.meta.counter}</Typography>
                        <Typography>{formatNumbersWithSpaces(data.rightLocked)}</Typography>
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
                    <Typography>
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
                    <Typography>
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
                    <Typography>
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
        </div>
    );
};

export default Pair;
