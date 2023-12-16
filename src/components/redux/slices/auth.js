import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../../axios';


export const fetchAuth = createAsyncThunk('auth/fetchUserData', async(params)=>{
    const {data} = await axios.post('/login', params)
    return data;
})

export const fetchAuthMe = createAsyncThunk('auth/fetchUserDataMe', async()=>{
    const {data} = await axios.get('/me')
    return data;
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async(params)=>{
    const {data} = await axios.post('/register', params)
    return data;
})
export const fetchUsers = createAsyncThunk('/Users/fetchPosts', async ()=> {
    const {data} = await axios.get('/getAllUssers')
    return data;
    })
const initialState = {
    data: null,
    status: 'loading'
    
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state)=>{
            state.data = null;
        }
    },
    extraReducers:{
        [fetchAuth.pending]: (state)=> {
            state.status = 'loading'
            state.data = null
        },
        [fetchAuth.fulfilled]: (state, action)=> {
            state.status = 'loaded'
            state.data = action.payload
            
        },
        [fetchAuth.rejected]: (state)=> {
            state.status = 'error'
            state.data = null
        },


        [fetchAuthMe.pending]: (state)=> {
            state.status = 'loading'
            state.data = null
        },
        [fetchAuthMe.fulfilled]: (state, action)=> {
            state.status = 'loaded'
            state.data = action.payload
            
        },
        [fetchAuthMe.rejected]: (state)=> {
            state.status = 'error'
            state.data = null
        },


        [fetchRegister.pending]: (state)=> {
            state.status = 'loading'
            state.data = null
        },
        [fetchRegister.fulfilled]: (state, action)=> {
            state.status = 'loaded'
            state.data = action.payload
            
        },
        [fetchRegister.rejected]: (state)=> {
            state.status = 'error'
            state.data = null
        },


        [fetchUsers.pending]: (state)=> {
            state.items = []
            state.status = 'loading'
        },
        [fetchUsers.fulfilled]: (state, action)=> {
            state.items = action.payload
            state.status = 'loaded'
        },
        [fetchUsers.rejected]: (state)=> {
            state.items = []
            state.status = 'error'
        },
    }
})

export const selectIsAuth = (state) => Boolean(
    state.auth.data)


  /*   if(state.auth.data){abc = (state)=>(state.auth.data.id === '656dbdab45ff0fd6d35d9721')} */
/* const bub = (state)=> {if(state.status=='loaded'){return (Boolean(state.auth.data.id === '656dbdab45ff0fd6d35d9721'))}} */


/* const isloaded = (state)=> {if(state.status=='loaded'){ return (true)}else{return(false)}}
const data = (state, isloaded)=> {console.log(state.auth.data.id)}
const isfalse = (state)=> {if(isloaded()){return(state.auth.data.id === '656dbdab45ff0fd6d35d9721')}else{data()}}
const bub = isfalse() */
export const selectIsModder = Boolean(true)

export const authReducer = authSlice.reducer;

export const {logout} = authSlice.actions