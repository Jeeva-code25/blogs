import { configureStore } from '@reduxjs/toolkit';
import blogReducer from '../features/blog/blogSlice';
import loginReducer from '../features/user/loginSlice';

const store = configureStore({
    reducer: {
        blog: blogReducer,
        login: loginReducer
    }
})

export default store