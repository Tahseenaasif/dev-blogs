import { createSlice } from "@reduxjs/toolkit";
const initialState={
    currentuser:null,
    error:null,
    loading:false
}
 const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
            state.error=null; 
        },
        signInSucess:(state,action)=>{
         state.currentuser=action.payload;
         state.loading=false;
         state.error=null;
        },
        signInFaiure:(state,action)=>{
            state.loading=false,
            state.error=action.payload
        },
        updateStart:(state,action)=>{
            state.loading=true,
            state.error=null
        },
        updateSuccess:(state,action)=>{
            state.currentuser=action.payload,
            state.loading=false,
            state.error=null
        },
        updateFailure:(state,action)=>{
            state.loading=false,
            state.error=action.payload
        },
        deleteUserStart: (state) => {
            state.loading = true;
            state.error = null;
          },
          deleteUserSuccess: (state) => {
            state.currentuser = null;
            state.loading = false;
            state.error = null;
          },
          deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },

    }
})


export const {
    signInStart,
    signInSucess,
    signInFaiure,
    updateStart,
    updateSuccess,
    updateFailure,
    deleteUserStart,
    deleteUserFailure,
    deleteUserSuccess

} =userSlice.actions;
export default userSlice.reducer;