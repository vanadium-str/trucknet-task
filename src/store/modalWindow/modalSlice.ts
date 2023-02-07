import { createSlice } from '@reduxjs/toolkit';

interface ModalInitialState {
    isOpen: boolean;
}

const initialState: ModalInitialState = {
  isOpen: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setIsOpenModal: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setIsOpenModal } = modalSlice.actions;

export default modalSlice.reducer;
