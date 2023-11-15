import { configureStore } from '@reduxjs/toolkit'
import userReducer  from '../pages/userSlice'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import appointmentSlice from '../pages/appointmentSlice'

const reducers = combineReducers({
    user: userReducer,
    appointment: appointmentSlice,
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});