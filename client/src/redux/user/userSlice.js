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
        }
    }
})


export const {signInStart,signInSucess,signInFaiure} =userSlice.actions;
export default userSlice.reducer;