import React, { Suspense } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from 'component/core/store';
import Loader from 'component/loader';

import Routes from 'route/index';
import 'locale';

render((
    <Suspense fallback={<Loader />}>
        <Provider store={store}>
            <Routes />
        </Provider>
    </Suspense>
), document.getElementById('app'));
