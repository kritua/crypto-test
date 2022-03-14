import React, { useState, MouseEvent, ChangeEvent, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useRouteMatch } from 'react-router-dom';
import {
    Typography,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    Skeleton,
    Button
} from '@mui/material';

import useClassnames from 'hook/use-classnames';
import { useLocalStorage } from 'hook/use-localstorage';

import IconLike from 'component/icons/like';

import { main } from 'adapter/api/main';

import style from './index.module.pcss';

export const Main = () => {
    const cn = useClassnames(style);
    const { t } = useTranslation();
    const history = useHistory();
    const match = useRouteMatch({
        path : '/favorites',
        exact: true
    });
    const { getStorage, setStorage } = useLocalStorage('pairs');

    const { data, isFetching } = main.useGetPairsQuery(undefined);

    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [tempStorage, setTempStorage] = useState<Array<string>>([]);

    useEffect(() => {
        const newTempStorage = Object.values(getStorage<string>());

        if(newTempStorage.length) {
            setTempStorage(newTempStorage);
        }
    }, []);

    const onClickChangeRowsPerPage = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const onClickChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const onClickLike = (address: string) => (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        const currentStorage = Object.values(getStorage<string>());
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

    const onClickPair = (address: string) => () => {
        history.push(`/pairs/${address}`);
    };

    const elTableHead = () => {
        return (
            <TableHead>
                <TableRow sx={{ display: 'grid' }} classes={{ root: cn('main__table-row', 'main__table-row_head') }}>
                    <TableCell>
                        #
                    </TableCell>
                    <TableCell>
                        {t('routes.main.table.head.pair')}
                    </TableCell>
                    <TableCell>
                        {t('routes.main.table.head.address')}
                    </TableCell>
                    <TableCell>
                        {t('routes.main.table.head.fee')}
                    </TableCell>
                    <TableCell />
                </TableRow>
            </TableHead>
        );
    };

    const elTableContent = () => {
        if(isFetching) {
            const fakeTable = Array.from({ length: 5 });

            return (
                <TableBody>
                    {fakeTable.map((item, index) => (
                        <TableRow sx={{ display: 'grid' }} classes={{ root: cn('main__table-row') }} key={index}>
                            {fakeTable.map((skeleton, i) => {
                                if(i < 5) {
                                    return (
                                        <TableCell key={i}>
                                            <Skeleton variant="text" />
                                        </TableCell>
                                    );
                                }

                                return (
                                    <TableCell key={i}>
                                        <Skeleton variant="circular" />
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            );
        }

        if(data?.length) {
            let dataToRender = data;

            if(match) {
                dataToRender = data.filter((item) => tempStorage.includes(item.poolAddress));
            }

            return (
                <TableBody>
                    {dataToRender.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                        return (
                            <TableRow
                                hover={true}
                                sx={{ display: 'grid' }}
                                classes={{ root: cn('main__table-row') }}
                                key={index}
                                onClick={onClickPair(item.poolAddress)}
                            >
                                <TableCell>{(index + 1) + page * rowsPerPage}</TableCell>
                                <TableCell>{`${item.base} / ${item.counter}`}</TableCell>
                                <TableCell classes={{ root: cn('main__address-cell') }}>{item.poolAddress}</TableCell>
                                <TableCell>{item.fee}</TableCell>
                                <TableCell align="center" padding="none">
                                    <Button
                                        onClick={onClickLike(item.poolAddress)}
                                        size="small"
                                        sx={{ height: '100%' }}
                                    >
                                        <IconLike
                                            svg={{
                                                className: cn('main__icon-like', {
                                                    'main__icon-like_liked': tempStorage.includes(item.poolAddress)
                                                })
                                            }}
                                        />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            );
        }
    };

    const elPagination = useMemo(() => {
        let count = data?.length || 0;

        if(match) {
            count = data?.filter((item) => tempStorage.includes(item.poolAddress)).length || 0;
        }

        return (
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onClickChangePage}
                onRowsPerPageChange={onClickChangeRowsPerPage}
            />
        );
    }, [rowsPerPage, data?.length, page, match?.path]);

    return (
        <div className={cn('main')}>
            <Typography variant="h2">
                {t('routes.main.title', {
                    context: match ? 'favorites' : 'all-pairs'
                })}
            </Typography>
            <TableContainer classes={{ root: cn('main__table-container') }}>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                    {elTableHead()}
                    {elTableContent()}
                </Table>
                {elPagination}
            </TableContainer>
        </div>
    );
};

export default Main;
