import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "modal",
    initialState: {
        type: "",
        updateShema: {},
    },
    reducers: {
        showModal: (state, action) => {
            state.open = true;
            state.type = action.payload.type;
            state.updateShema = action.payload.updateShema;
        },
        hideModal: (state) => {
            state.type = "";
            state.updateShema = {};
        },
    },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;