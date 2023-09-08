import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name:"user",
    initialState:{
        value:null,
    },
    reducers:{
        login:(state,action)=>{
            state.user = action.payload;
        },
        logut:(state)=>{
            state.user = null;
        },
    },
});

export const {login,logout}=userSlice.actions;
export const selectUser = (state)=>state.user.user;
export default userSlice.reducer;