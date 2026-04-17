import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },

    addAssignment: (state, action) => {
      state.assignments = [...state.assignments, action.payload] as any;
    },

    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter(
        (assignment: any) => assignment._id !== action.payload
      ) as any;
    },

    updateAssignment: (state, action) => {
      state.assignments = state.assignments.map((assignment: any) =>
        assignment._id === action.payload._id ? action.payload : assignment
      ) as any;
    },
  },
});

export const {
  setAssignments,
  addAssignment,
  deleteAssignment,
  updateAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;