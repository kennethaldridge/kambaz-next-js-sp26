import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../../database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  assignments: assignments,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, action) => {
      const newAssignment = {
        ...action.payload,
        _id: uuidv4(),
      };
      state.assignments = [...state.assignments, newAssignment] as any;
    },

    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter(
        (assignment: any) => assignment._id !== action.payload
      ) as any;
    },

    updateAssignment: (state, action) => {
      state.assignments = state.assignments.map((assignment: any) =>
        assignment._id === action.payload._id
          ? action.payload
          : assignment
      ) as any;
    },
  },
});

export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;