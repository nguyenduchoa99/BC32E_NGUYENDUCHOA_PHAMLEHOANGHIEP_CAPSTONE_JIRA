import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskServices from '../../services/taskServices'

const initialState = {
    data1: [],
    isLoading: null,
    error: "",
    getall: [],
    getallpri: [],
    getalltas: [],
    updatetask: [],
    comment: [],
    listMemberz: []
};

export const getProjectDetails = createAsyncThunk(
    "task/getProjectDetails",
    async (title, { rejectWithValue }) => {
        try {
            const data = await taskServices.getProjectDetail(title?.taskId, title?.acces);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const createTask = createAsyncThunk(
    "task/createTask",
    async (title, { rejectWithValue }) => {
        try {
            const data = await taskServices.createTask(title.values, title.acce);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getAll = createAsyncThunk(
    "task/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const data = await taskServices.getAll();
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getAllpri = createAsyncThunk(
    "task/getAllpri",
    async (projectId, { rejectWithValue }) => {
        try {
            const data = await taskServices.getAllpri(projectId);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getAlltas = createAsyncThunk(
    "task/getAlltas",
    async (_, { rejectWithValue }) => {
        try {
            const data = await taskServices.getAlltas();
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const removeTaskz = createAsyncThunk(
    "task/removetask",
    async (title, { rejectWithValue, dispatch }) => {
        try {
            const data = await taskServices.removeTask(title.taskIds, title.acce);
            dispatch(getProjectDetails({ taskId: title.taskId, acces: title.acce }));
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getTaskDetail = createAsyncThunk(
    "task/getTaskDetail",
    async (title, { rejectWithValue }) => {
        try {
            const data = await taskServices.getTaskDetail(title.taskId, title.acce);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateTasks = createAsyncThunk(
    "task/updateTasks",
    async (title, { rejectWithValue }) => {
        try {
            const data = await taskServices.updateTasks(title.values, title.acces);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getAllComment = createAsyncThunk(
    "task/getAllComment",
    async (taskId, { rejectWithValue }) => {
        try {
            const data = await taskServices.getAllComment(taskId);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const insertComment = createAsyncThunk(
    "task/insertComment",
    async (title, { rejectWithValue, dispatch }) => {
        try {
            const data = await taskServices.insertComment(title.values, title.acces);
            dispatch(getAllComment(title.values.taskId))
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


export const deleteComment = createAsyncThunk(
    "task/deleteComment",
    async (title, { rejectWithValue, dispatch }) => {
        try {
            const data = await taskServices.deleteComment(title.commentId, title.acces);
            dispatch(getAllComment(title.taskId))
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const updateComment = createAsyncThunk(
    "task/updateComment",
    async (title, { rejectWithValue, dispatch }) => {
        try {
            const data = await taskServices.updateComment(title.values.id, title.values.contentComment, title.acces);
            dispatch(getAllComment(title.values.taskId))
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const taskReducer = createSlice({
    name: "task",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getProjectDetails.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getProjectDetails.fulfilled, (state, { payload }) => {
            state.data1 = payload;

            state.isLoading = false;
        });
        builder.addCase(getProjectDetails.rejected, (state, { payload }) => {
            state.error = payload;
            state.isLoading = false;
        });

        builder.addCase(getAll.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAll.fulfilled, (state, { payload }) => {
            state.getall = payload;
            state.isLoading = false;
        });
        builder.addCase(getAll.rejected, (state, { payload }) => {
            state.error = payload;
            state.isLoading = false;
        });

        builder.addCase(getAllpri.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllpri.fulfilled, (state, { payload }) => {
            state.getallpri = payload;
            state.isLoading = false;
        });
        builder.addCase(getAllpri.rejected, (state, { payload }) => {
            state.error = payload;
            state.isLoading = false;
        });

        builder.addCase(getAlltas.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAlltas.fulfilled, (state, { payload }) => {
            state.getalltas = payload;
            state.isLoading = false;
        });
        builder.addCase(getAlltas.rejected, (state, { payload }) => {
            state.error = payload;
            state.isLoading = false;
        });

        builder.addCase(getTaskDetail.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getTaskDetail.fulfilled, (state, { payload }) => {
            state.updatetask = payload;
            state.isLoading = false;
        });
        builder.addCase(getTaskDetail.rejected, (state, { payload }) => {
            state.error = payload;
            state.isLoading = false;
        });

        builder.addCase(getAllComment.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllComment.fulfilled, (state, { payload }) => {
            state.comment = payload;
            state.isLoading = false;
        });
        builder.addCase(getAllComment.rejected, (state, { payload }) => {
            state.error = payload;
            state.isLoading = false;
        });
    },
});

export default taskReducer.reducer;
