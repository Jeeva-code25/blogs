import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit"
import api from '../../../config/axiosConfig';

const initialState = {
    userInfo:[],
    registerInfo:[],
    loading: false,
    error: null
}

export const loginUser = createAsyncThunk('/user/login', async ({username, password}) => {
    const response = await api.post("/users/login", { "username": username, "password": password });    
    return response.data
});

export const registerUser = createAsyncThunk('/user/register', async ({username, password}) => {    
    const response = await api.post("/users/register", { "username": username, "password": password });    
    return response.data
});

const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.registerInfo = action.payload
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

    }
})

export const selectLoginState = (state) => state.login.userInfo

export default loginSlice.reducer