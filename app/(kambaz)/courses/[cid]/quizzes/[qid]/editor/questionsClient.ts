import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;
const QUESTIONS_API = `${HTTP_SERVER}/api/questions`;

export const findQuestionsForQuiz = async (quizId: string) => {
  const { data } = await axios.get(`${QUIZZES_API}/${quizId}/questions`, {
    withCredentials: true,
  });
  return data;
};

export const createQuestion = async (quizId: string, question: any) => {
  const { data } = await axios.post(
    `${QUIZZES_API}/${quizId}/questions`,
    question,
    { withCredentials: true }
  );
  return data;
};

export const updateQuestion = async (question: any) => {
  const { data } = await axios.put(
    `${QUESTIONS_API}/${question._id}`,
    question,
    { withCredentials: true }
  );
  return data;
};

export const deleteQuestion = async (questionId: string) => {
  const { data } = await axios.delete(`${QUESTIONS_API}/${questionId}`, {
    withCredentials: true,
  });
  return data;
};
