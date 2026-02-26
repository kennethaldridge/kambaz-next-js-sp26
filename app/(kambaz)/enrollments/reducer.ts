import { createSlice } from "@reduxjs/toolkit";
import * as db from "../database";

const initialState = {
  enrollments: db.enrollments, // resets on refresh, persists during runtime
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollInCourse: (state, action) => {
      const { user, course } = action.payload;

      const already = state.enrollments.some(
        (e: any) => e.user === user && e.course === course
      );
      if (!already) {
        state.enrollments = [...state.enrollments, { user, course }];
      }
    },
    unenrollFromCourse: (state, action) => {
      const { user, course } = action.payload;
      state.enrollments = state.enrollments.filter(
        (e: any) => !(e.user === user && e.course === course)
      );
    },
  },
});

export const { enrollInCourse, unenrollFromCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;