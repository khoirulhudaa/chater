import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import { REGISTER, PERSIST, REHYDRATE } from 'redux-persist/es/constants';
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from "redux-persist-transform-encrypt";
import rootReducer from "./index";

const encryptor = encryptTransform({
    secretKey: 'Super-Secret-key-jrtec',
    onError: function (error) {
        console.error(error);
    },
})

const persistConfig = {
    key: 'root',
    storage,
    transforms: [encryptor],
};
const persistReducers = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [PERSIST, REHYDRATE, REGISTER],
            },
        })
})

export const persistor = persistStore(store)
export default store