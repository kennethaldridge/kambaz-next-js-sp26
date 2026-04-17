import { createSlice } from "@reduxjs/toolkit";

const questionsSlice = createSlice({
  name: "questions",
  initialState: { questions: [] as any[] },
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addQuestion: (state, action) => {
      state.questions.push(action.payload);
    },
    updateQuestion: (state, action) => {
      state.questions = state.questions.map((q) =>
        q._id === action.payload._id ? action.payload : q
      );
    },
    deleteQuestion: (state, action) => {
      state.questions = state.questions.filter((q) => q._id !== action.payload);
    },
  },
});

export const { setQuestions, addQuestion, updateQuestion, deleteQuestion } =
  questionsSlice.actions;
export default questionsSlice.reducer;
