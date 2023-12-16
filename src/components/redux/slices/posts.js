import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../../axios';

/* export const fetchTags = createAsyncThunk('/Games/fetchPosts', async ()=> {
    const {data} = await axios.get('/genre')
    return data;
    })
     */

export const fetchPosts = createAsyncThunk('/Games/fetchPosts', async ()=> {
const {data} = await axios.get('/Games')
return data;
})

export const fetchRemovePost = createAsyncThunk('/Games/fetchRemovePost', async (_id)=> {
    const {data} = axios.delete(`/Games/${_id}`)
return data
})



const initialState = {
    posts: {
        items:[],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    }
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers:{
        [fetchPosts.pending]: (state)=> {
            state.posts.items = []
            state.posts.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action)=> {
            state.posts.items = action.payload
            state.posts.status = 'loaded'
        },
        [fetchPosts.rejected]: (state)=> {
            state.posts.items = []
            state.posts.status = 'error'
        },
        //
        [fetchRemovePost.pending]: (state,action)=> {
            state.posts.items = state.posts.items.filter((obj)=>obj._id == action.meta.arg);
        },
      
    }
})

export const postsReducer = postsSlice.reducer;