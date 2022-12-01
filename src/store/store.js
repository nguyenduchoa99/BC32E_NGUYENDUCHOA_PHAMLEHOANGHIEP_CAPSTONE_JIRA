import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authReducer/authReducer';
import projectReducer from './projectReducer/projectReducer';
import taskReducer from './taskReducer/taskReducer';
import userReducer from './userReducer/userReducer';
const store = configureStore({
    reducer: {
        auth: authReducer,
        project: projectReducer,
        task: taskReducer,
        user: userReducer,
    },
});

export default store;