'use client'

import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';

const ProviderMain: React.FC<any> = ({ children }) => {
    return (
        <Provider store={store} >
            <PersistGate loading={null} persistor={persistor} >
                <Suspense fallback={null}>
                    {children}
                </Suspense>
            </PersistGate>
        </Provider>
    )
}

export default ProviderMain
