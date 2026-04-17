"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import * as attemptsClient from "../../attemptsClient";
import * as questionsClient from "../editor/questionsClient";
import * as quizClient from "../../client";

export default function QuizResults() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [attempt, setAttempt] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const [q, qs, latest] = await Promise.all([
        quizClient.findQuizById(qid),
        questionsClient.findQuestionsForQuiz(qid),
        attemptsClient.getLatestAttempt(qid),
      ]);
      setQuiz(q);
      setQuestions(qs);
      setAttempt(latest);
    };
    load();
  }, [qid]);

  if (!quiz || !attempt) return <div className="p-3">Loading...</div>;

  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);
  const answerMap: Record<string, any> = {};
  for (const ans of attempt.answers || []) {
    answerMap[ans.question] = ans;
  }

  const canRetake =
    quiz.multipleAttempts &&
    attempt.attemptNumber < quiz.howManyAttempts;

  return (
    <div id="wd-quiz-results" className="p-3">
      <h3>{quiz.title}</h3>
      <p className="text-muted">
        Attempt {attempt.attemptNumber}
        {quiz.multipleAttempts ? ` of ${quiz.howManyAttempts}` : ""}
      </p>
      <h5>
        Score: {attempt.score} out of {totalPoints} points
      </h5>

      <hr />

      {questions.map((q, idx) => {
        const ans = answerMap[q._id];
        const isCorrect = ans?.isCorrect ?? false;
        const studentAnswer = ans?.answer ?? "";

        let correctDisplay = "";
        if (!isCorrect && quiz.showCorrectAnswers === "Immediately") {
          if (q.type === "MULTIPLE_CHOICE") {
            const correct = (q.choices || []).find((c: any) => c.isCorrect);
            correctDisplay = correct?.text ?? "";
          } else if (q.type === "TRUE_FALSE") {
            correctDisplay = String(q.correctAnswer);
          } else if (q.type === "FILL_IN_BLANK") {
            correctDisplay = (q.correctAnswers || []).join(", ");
          }
        }

        return (
          <div
            key={q._id}
            className={`border rounded p-3 mb-3 border-${isCorrect ? "success" : "danger"}`}
          >
            <div className="d-flex justify-content-between mb-2">
              <strong>Question {idx + 1}</strong>
              <span>
                {isCorrect ? (
                  <span className="text-success">&#10003; {q.points} pts</span>
                ) : (
                  <span className="text-danger">&#10007; 0 / {q.points} pts</span>
                )}
              </span>
            </div>
            <p>{q.question}</p>
            <p>
              <strong>Your answer:</strong> {studentAnswer || <em>No answer</em>}
            </p>
            {!isCorrect && correctDisplay && (
              <p className="text-success">
                <strong>Correct answer:</strong> {correctDisplay}
              </p>
            )}
          </div>
        );
      })}

      {canRetake && (
        <Button
          variant="danger"
          onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/take`)}
        >
          Retake Quiz
        </Button>
      )}
    </div>
  );
}
