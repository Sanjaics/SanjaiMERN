import { createSlice } from "@reduxjs/toolkit";


const initialState={
    _id: "",
  firstName:"",
  LastName: "",
  Email: "",
  image: '',
    
}

export const userSlcReducer= createSlice({
    name:"user",
    initialState,
    reducers:{
        LoginRedux:(state,action)=>{
            console.log(action.payload.data)
            state.user=action.payload.data

            state._id=action.payload._id
            state.firstName=action.payload.firstName
            state.LastName=action.payload.LastName
            state.Email=action.payload.Email
            state.image=action.payload.image
        },
        LogoutRedux :(state,action)=>{
           state._id = "";
            state.firstName="";
            state.LastName="";
            state.Email= "";
            state.image= "";

        },
    }
})

export default userSlcReducer.reducer
export  const {LoginRedux,LogoutRedux}=userSlcReducer.actions