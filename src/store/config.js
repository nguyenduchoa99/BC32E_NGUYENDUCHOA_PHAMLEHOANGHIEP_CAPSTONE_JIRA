import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { projectReducer } from './projectReducer/projectReducer';
const rootReducer = combineReducers({
    projectReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: true
})