import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;

export const getAttempts = async (quizId: string) => {
  const { data } = await axios.get(`${QUIZZES_API}/${quizId}/attempts`, {
    withCredentials: true,
  });
  return data;
};

export const getLatestAttempt = async (quizId: string) => {
  const { data } = await axios.get(
    `${QUIZZES_API}/${quizId}/attempts/latest`,
    { withCredentials: true }
  );
  return data;
};

export const submitAttempt = async (
  quizId: string,
  payload: { answers: { question: string; answer: string }[] }
) => {
  const { data } = await axios.post(
    `${QUIZZES_API}/${quizId}/attempts`,
    payload,
    { withCredentials: true }
  );
  return data;
};
