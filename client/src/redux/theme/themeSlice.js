import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    theme :'light'
}

const themeSlice=createSlice({
    name:"theme",
    initialState,
    reducers:{
        toggletheme:(state)=>{
            console.log("this is main theme",state.theme)
            state.theme = state.theme === 'light' ? 'dark' : 'light';

            console.log("state.theme",state.theme)
        }
    }
})

export const {toggletheme} =themeSlice.actions;
export default themeSlice.reducer;