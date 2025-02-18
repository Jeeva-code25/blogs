import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit"
import api from '../../../config/axiosConfig';

const initialState = {
    blogs: [],
    loading: false,
    error: null
}

export const fetchBlog = createAsyncThunk('/blog/fetchBlogs', async (token) => {
    const response = await api.get('/blogs', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })    
    
    return response.data
});

export const postBlog = createAsyncThunk('/blog/postBlogs', async ({ token, data }) => {
    const response = await api.post('/blogs',
        data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })    
    return response.data
});

export const updateBlog = createAsyncThunk('/blog/updateBlogs', async ({ token, data }) => {
    const response = await api.patch('/blogs',
        data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })    
    return response.data
});
export const deleteBlog = createAsyncThunk('/blog/deleteBlogs', async ({ token, id }) => {
    const response = await api.delete(`/blogs/${id}`,
        {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })    
    return response.data
});

const blogSlice = createSlice({
    name: 'blog',
    initialState: initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload                
                state.error = null;
            })
            .addCase(fetchBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(postBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postBlog.fulfilled, (state, action) => {
                state.loading = false;
                if(state.blogs) {state.blogs.push(action.payload)} else {state.blogs = action.payload}               
                state.error = null;
            })
            .addCase(postBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.blogs.findIndex(blog => blog._id === action.payload._id)    
                if(index !== -1) state.blogs[index] = action.payload         
                state.error = null;
            })
            .addCase(updateBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = state.blogs.filter(blog => blog._id !== action.payload)                        
                state.error = null;
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

    }
})

export const blogState = (state) => state.blog.blogs

export const selectBlogById = createSelector(
    [blogState, (state, blogId) => blogId],
    (blogs, blogId) => {if(blogs) return(blogs.find((blog) => blog._id === blogId))}
)
export const selectBlogByUserId = createSelector(
    [blogState, (state, userId) => userId],
    (blogs, userId) => {if(blogs) return (blogs.filter(blog => blog.userId === userId))}
)

export const searchBlog = createSelector(
    [blogState, (state, search) => search],
    (blogs, search) =>  {if(blogs) return(blogs.filter(item => item.title.toLowerCase().includes(search?.toLowerCase())))}
)

export default blogSlice.reducer