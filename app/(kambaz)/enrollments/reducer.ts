import { createSlice } from "@reduxjs/toolkit";
import * as db from "../database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  enrollments: db.enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    enrollInCourse: (state, action) => {
      const { user, course } = action.payload;

      const already = state.enrollments.some(
        (e: any) => e.user === user && e.course === course
      );

      if (!already) {
        state.enrollments = [
          ...state.enrollments,
          { _id: uuidv4(), user, course },
        ];
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

export const { setEnrollments, enrollInCourse, unenrollFromCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;