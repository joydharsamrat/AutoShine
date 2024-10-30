import { createSlice } from "@reduxjs/toolkit";
import { TBooking } from "../../../types";

interface BookingState {
  upcomingBookings: TBooking[];
  pastBookings: TBooking[];
}

const initialState: BookingState = {
  upcomingBookings: [],
  pastBookings: [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookings: (state, action) => {
      state.upcomingBookings = action.payload.upcomingBookings;
      state.pastBookings = action.payload.pastBookings;
    },
  },
});

export const { setBookings } = bookingSlice.actions;
export default bookingSlice.reducer;
