import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { StatusProps } from "../../../types/status/status";

let initialState: StatusProps = {
    isAuthFormShow: false,
    isLoginFormShow: false,
    isRegisterFormShow: false,
};

export const StatusSlice = createSlice({
    name: "status",
    initialState,
    reducers: {
        toggleAuthForm: (state) => {
            state.isAuthFormShow = !state.isAuthFormShow;
        },
        toggleForm: (state, action: PayloadAction<'login' | 'register'>) => {
            if (action.payload === 'login') {
                state.isLoginFormShow = !state.isLoginFormShow;
                state.isRegisterFormShow = false;
            } else {
                state.isRegisterFormShow = !state.isRegisterFormShow;
                state.isLoginFormShow = false;
            }
        },
        resetForms: (state) => {
            state.isLoginFormShow = false;
            state.isRegisterFormShow = false;
            state.isAuthFormShow = false;
        },
    },
});

export const {
    toggleAuthForm,
    toggleForm,
    resetForms,
} = StatusSlice.actions;

export default StatusSlice.reducer;
