import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  selectedLocation: null,
};


const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
    clearSelectedLocation: (state) => {
      state.selectedLocation = null;
    },
  },
});


export const { setSelectedLocation, clearSelectedLocation } = locationSlice.actions;
export const selectSelectedLocation = (state) => state.location.selectedLocation;
export default locationSlice.reducer;