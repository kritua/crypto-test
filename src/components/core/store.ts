import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { useSelector as useSelectorRedux, useDispatch as useDispatchRedux, TypedUseSelectorHook } from 'react-redux';

import { main } from 'adapter/api/main';

import config from 'config';

const store = configureStore({
    devTools: false,
    reducer : {
        [main.reducerPath]: main.reducer
    },
    middleware: (getDefaultMiddleware) => {
        const logger = createLogger(config['redux-logger'] || {});
        const middlewares = [
            main.middleware
        ];

        if(__DEVELOPMENT__) {
            middlewares.push(logger);
        }

        return getDefaultMiddleware().concat(middlewares);
    }
});

export type TStore = ReturnType<typeof store.getState>;
export type TDispatch = typeof store.dispatch;

export const useDispatch = <TCustomDispatch = TDispatch>() => useDispatchRedux<TCustomDispatch>();
export const useSelector = useSelectorRedux as TypedUseSelectorHook<TStore>;

export default store;
