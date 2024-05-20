import { createSlice } from "@reduxjs/toolkit";

const ServiceSlice = createSlice({
    name: "service",
    initialState: {
        posts: [],
    },
    reducers : {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
    },
});

export const serviceActions = ServiceSlice.actions;
export default ServiceSlice.reducer;