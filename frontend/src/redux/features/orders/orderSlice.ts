import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
    receiver: string | null;
    title: string;
    amount: string;
    requirement: string;
    delivery_time: string;
    reference_file?: File | null;
    redirect_url: string;
}

const ORDER_STORAGE_KEY = 'orderState';

const saveOrderToLocalStorage = (state: OrderState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(ORDER_STORAGE_KEY, serializedState);
    } catch {
        // ignore write errors
    }
};

const loadOrderFromLocalStorage = (): OrderState | undefined => {
    try {
        const serializedState = localStorage.getItem(ORDER_STORAGE_KEY);
        if (!serializedState) return undefined;
        return JSON.parse(serializedState);
    } catch {
        return undefined;
    }
};

const persistedState = loadOrderFromLocalStorage();

const initialState: OrderState = persistedState ?? {
    receiver: null,
    title: '',
    amount: '',
    requirement: '',
    delivery_time: '',
    reference_file: null,
    redirect_url: '',
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrderData(state, action: PayloadAction<Partial<OrderState>>) {
            Object.assign(state, action.payload);
            saveOrderToLocalStorage(state);
        },
        clearOrderData(state) {
            Object.assign(state, initialState);
            saveOrderToLocalStorage(initialState);
        },
    },
});

export const { setOrderData, clearOrderData } = orderSlice.actions;
export default orderSlice.reducer;
