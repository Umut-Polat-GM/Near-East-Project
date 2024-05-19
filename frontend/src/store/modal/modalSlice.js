import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "modal",
    initialState: {
        open: false,
    },
    reducers: {
        showModal: (state) => {
            state.open = true;
        },
        hideModal: (state) => {
            state.open = false;
        },
    },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
