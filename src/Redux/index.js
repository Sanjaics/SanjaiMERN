import {configureStore}from '@reduxjs/toolkit'
import UserSlc from './UserSlc'
import ProductSlice from './ProductSlice';



export const store =configureStore({
    reducer:{
        user: UserSlc,
        product:ProductSlice
        
    },
});



