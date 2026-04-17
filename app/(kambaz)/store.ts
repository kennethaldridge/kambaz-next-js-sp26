import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./courses/reducer";
import modulesReducer from "./courses/[cid]/modules/reducer";
import accountReducer from "./account/reducer";
import assignmentsReducer from "./courses/[cid]/assignments/reducer";
import enrollmentsReducer from "./enrollments/reducer";
import quizzesReducer from "./courses/[cid]/quizzes/reducer";
import questionsReducer from "./courses/[cid]/quizzes/questionsReducer";

const store = configureStore({
 reducer: {
    coursesReducer,
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentsReducer,
    quizzesReducer,
    questionsReducer,
 },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;