import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import taskService from '../../services/taskService';

const initialState = {
    dataPD: [],
    isLoading: false,
    error: '',
    dataGT: [],
    dataGTP: [],
    dataGTT: [],
    dataGTD: [],
    comment: [],
    listMember: []
};

export const { reducer: taskReducer, action: taskActions } = createSlice({
    name: 'task',
    initialState,
    extraReducers: (builder) => {
        builder
            //Get Project Detail
            .addCase(getProjectDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProjectDetails.fulfilled, (state, action) => {
                state.dataPD = action.payload;
                state.isLoading = false;
            })
            .addCase(getProjectDetails.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            //GET ALL
            .addCase(getAll.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.dataGT = action.payload;
                state.isLoading = false;
            })
            .addCase(getAll.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            //GET ALL PRIORITY
            .addCase(getAllpri.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllpri.fulfilled, (state, action) => {
                state.dataGTP = action.payload;
                state.isLoading = false;
            })
            .addCase(getAllpri.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            //GET ALL TASK
            .addCase(getAlltas.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAlltas.fulfilled, (state, action) => {
                state.dataGTT = action.payload;
                state.isLoading = false;
            })
            .addCase(getAlltas.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            //GET TASK DETAIL
            .addCase(getTaskDetail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTaskDetail.fulfilled, (state, action) => {
                state.dataGTD = action.payload;
                state.isLoading = false;
            })
            .addCase(getTaskDetail.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            //GET ALL COMMENT
            .addCase(getAllComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllComment.fulfilled, (state, action) => {
                state.comment = action.payload;
                state.isLoading = false;
            })
            .addCase(getAllComment.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
    }
})

export const getProjectDetails = createAsyncThunk(
    'task/getProjectDetails',
    async (values, { rejectWithValue }) => {
        try {
            const data = await taskService.getProjectDetail(values?.taskId);
            return data;
        }
        catch (err) {
            return rejectWithValue(err);
        }
    }
);
export const createTask = createAsyncThunk(
    'task/createTask',
    async (values, { rejectWithValue }) => {
        try {
            const data = await taskService.createTask(values.values);
            return data;
        }
        catch (err) {
            return rejectWithValue(err);
        }
    }
);
export const getAll = createAsyncThunk(
    'task/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const data = await taskService.getAll();
            return data;
        }
        catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const getAllpri = createAsyncThunk(
    'task/getAllpri',
    async (projectId, { rejectWithValue }) => {
        try {
            const data = await taskService.getAllpri(projectId);
            return data;
        }
        catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const getAlltas = createAsyncThunk(
    'task/getAlltas',
    async (_, { rejectWithValue }) => {
        try {
            const data = await taskService.getAlltas();
            return data;
        }
        catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const removeTask = createAsyncThunk(
    'task/removetask',
    async (values, { rejectWithValue, dispatch }) => {
        try {
            const data = await taskService.removeTask(values.taskId);
            dispatch(getProjectDetails({ taskId: values.taskId }));
            return data;
        }
        catch (err) {
            return rejectWithValue(err);
        }
    }
);
export const getTaskDetail = createAsyncThunk(
    'task/getTaskDetail',
    async (values, { rejectWithValue }) => {
        try {
            const data = await taskService.getTaskDetail(values.taskId);
            return data;
        }
        catch (err) {
            return rejectWithValue(err);
        }
    }
);
export const updateTask = createAsyncThunk(
    'task/updateTask',
    async (values, { rejectWithValue }) => {
        try {
            const data = await taskService.updateTask(values.values);
            return data;
        }
        catch (err) {
            return rejectWithValue(err);
        }
    }
);
export const getAllComment = createAsyncThunk(
    'task/getAllComment',
    async (taskId, { rejectWithValue }) => {
        try {
            const data = await taskService.getAllComment(taskId);
            return data;
        }
        catch (err) {
            return rejectWithValue(err);
        }
    }
);
export const insertComment = createAsyncThunk(
    'task/insertComment',
    async (values, { rejectWithValue, dispatch }) => {
        try {
            const data = await taskService.insertComment(values.values);
            return data;
        }
        catch (err) {
            return rejectWithValue(err);
        }
    }
);
export const deleteComment =createAsyncThunk(
    'task/deleteComment',
    async(values,{rejectWithValue,dispatch})=>{
        try{
            const data = await taskService.deleteComment(values.commentId);
            dispatch(getAllComment(values.taskId));
        }
        catch(err){
            return rejectWithValue(err);
        }
    }
);
export const updateComment = createAsyncThunk(
    'task/updateComment',
    async(values,{rejectWithValue,dispatch})=>{
        try{
            const data = await taskService.updateComment(values.values.id,values.values.contentComment);
            dispatch(getAllComment(values.values.taskId));
            return data;
        }
        catch(err){
            return rejectWithValue(err);
        }
    }
);