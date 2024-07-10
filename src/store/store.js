import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./postsSlice";

export default configureStore({
    reducer:{
        postsReducer: postsSlice,
    }
})