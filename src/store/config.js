import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { projectReducer } from './projectReducer/projectReducer';
import { taskReducer } from './taskReducer/taskReducer';
const rootReducer = combineReducers({
    projectReducer,
    taskReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: true
})