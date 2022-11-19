import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { data } from 'autoprefixer';
import projectService from '../../services/projectService';
import { getProjectDetails } from '../taskReducer/taskReducer'
const initialState = {
    error: '', isLoading: false, list: [],
    errorGetAllProject: '', isloadingGetAllProject: false, data: [],
    errorGetUser: '', isLoadingGetUser: false, dataUser: [],
    errorGetProjectDetail: '', isLoadingGetProjectDetail: false, dataProjectDetail: []

}
export const { reducer: projectReducer, ation: projectActions } = createSlice({
    name: 'project',
    initialState,
    reducers: {},
    extraReducers: (buidlder) => {
        buidlder
            //ProjectCategory
            .addCase(ProjectCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(ProjectCategory.fulfilled, (state, { payload }) => {
                state.list = payload;
                state.isLoading = false;
            })
            .addCase(ProjectCategory.rejected, (state, { payload }) => {
                state.error = payload;
                state.isLoading = false;
            })
            //GET ALL PROJECT
            .addCase(getAllProject.pending, (state) => {
                state.isloadingGetAllProject = true;
            })
            .addCase(getAllProject.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isloadingGetAllProject = false;
            })
            .addCase(getAllProject.rejected, (state, action) => {
                state.errorGetAllProject = action.payload;
                state.isloadingGetAllProject = false;
            })
            //GET USER
            .addCase(getUser.pending, (state) => {
                state.isLoadingGetUser = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.dataUser = action.payload;
                state.isLoadingGetUser = false;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.errorGetUser = action.payload;
                state.isLoadingGetUser = false;
            })
            // GET PROJECT DETAIL
            .addCase(getProjectDetail.pending, (state) => {
                state.isLoadingGetProjectDetail = true;
            })
            .addCase(getProjectDetail.fulfilled, (state, action) => {
                state.dataProjectDetail = action.payload;
                state.isLoadingGetProjectDetail = false;
            })
            .addCase(getProjectDetail.rejected, (state, action) => {
                state.errorGetProjectDetail = action.payload;
                state.isLoadingGetProjectDetail = false;
            })
    }
})
export const ProjectCategory = createAsyncThunk(
    "project/ProjectCategory",
    async (_, { rejectWithValue }) => {
        try {
            const result = await projectService.getAllProjectCategory();
            return result.data.content;
        }
        catch (err) {
            return rejectWithValue(err)
        }
    }
);
export const createProjectAuthorize = createAsyncThunk(
    'project/createProjectAuthorize',
    async (values, { rejectWithValue }) => {
        try {
            const data = projectService.createProjectAuthorize(values);
            return data;
        }
        catch (err) {
            return rejectWithValue(err)
        }
    }
);

export const getAllProject = createAsyncThunk(
    'project/getAllProject',
    async (_, { rejectWithValue }) => {
        try {
            const result = await projectService.getAllProject();
            return result.data.content;
        }
        catch (err) {
            return rejectWithValue(err);
        }
    }
);
export const getUser = createAsyncThunk(
    'project/getUser',
    async (_, { rejectWithValue }) => {
        try {
            const result = await projectService.getUser();
            return result.data.content;
        }
        catch (err) {
            return rejectWithValue(err);
        }
    }
);
export const deleteProject = createAsyncThunk(
    'project/deleteProject',
    async (values, { rejectWithValue, dispatch }) => {
        try {
            const data = await projectService.deleteProject(values.projectId);
            dispatch(getAllProject());
            return data;
        }
        catch (err) {
            return rejectWithValue(err);
        }
    }
);
export const getProjectDetail = createAsyncThunk(
    'project/getProjectDetail',
    async (values, { rejectWithValue }) => {
        try {
            const data = await projectService.getProjectDetail(values.projectId);
            return data;
        }
        catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const updateProject = createAsyncThunk(
    'project/updateProject',
    async (values, { rejectWithValue }) => {
        try {
            const result = await projectService.updateProject(values.values, values.projectId);
            return result.data.content;
        }
        catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const assignUserProject = createAsyncThunk(
    'project/assignUserProject',
    async (values, { rejectWithValue, dispatch }) => {
        try {
            const data = await projectService.assignUserProject(values.values);
            dispatch(getProjectDetails({ taskId: values.values.projectId }));
            dispatch(getAllProject());
            return data;
        }
        catch (err) {
            return rejectWithValue(err);
        }
    }
);
export const removeUser = createAsyncThunk(
    'project/removeUserproject',
    async (values, { rejectWithValue, dispatch }) => {
        try {
            const data = await projectService.removeUserProject(values.values);
            dispatch(getProjectDetails({ taskId: values.values.projectId }));
            dispatch(getAllProject());
            return data;
        }
        catch (err) {
            return rejectWithValue(err);
        }
    }
);
