import { createSlice } from '@reduxjs/toolkit';

export const appointmentSlice = createSlice({
    name: "appointment",
    initialState: {
        credentials: {}
    },
    reducers: {
        appointmentId: (state, action) => {
            state.appointmentId = action.payload; 
        },
    }
});

export const { appointmentId } = appointmentSlice.actions;
export const selectAppointmentId = (state) => state.appointment.appointmentId;
export default appointmentSlice.reducer;