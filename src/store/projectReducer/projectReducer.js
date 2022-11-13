import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import projectService from '../../services/projectService';

const initialState = {
    error: '',
    isLoading: false,
    list: []
}
export const { reducer: projectReducer, ation: projectActions } = createSlice({
    name: 'project',
    initialState,
    extraReducers: (buidlder) => {
        buidlder
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
)