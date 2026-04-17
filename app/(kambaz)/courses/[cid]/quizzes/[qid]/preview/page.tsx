"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button, Alert, Form } from "react-bootstrap";
import { RootState } from "../../../../../store";
import * as questionsClient from "../editor/questionsClient";
import * as quizClient from "../../client";

export default function QuizPreview() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as any;

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const load = async () => {
      const q = await quizClient.findQuizById(qid);
      setQuiz(q);
      const qs = await questionsClient.findQuestionsForQuiz(qid);
      setQuestions(qs);
    };
    load();
  }, [qid]);

  const handleSubmit = () => {
    const newResults: Record<string, boolean> = {};
    for (const q of questions) {
      const answer = answers[q._id] ?? "";
      let isCorrect = false;
      if (q.type === "MULTIPLE_CHOICE") {
        const choice = (q.choices || []).find((c: any) => c.text === answer);
        isCorrect = choice?.isCorrect ?? false;
      } else if (q.type === "TRUE_FALSE") {
        isCorrect = answer.toLowerCase() === String(q.correctAnswer).toLowerCase();
      } else if (q.type === "FILL_IN_BLANK") {
        isCorrect = (q.correctAnswers || []).some(
          (a: string) => a.toLowerCase() === answer.toLowerCase()
        );
      }
      newResults[q._id] = isCorrect;
    }
    setResults(newResults);
    setSubmitted(true);
  };

  const renderQuestion = (q: any, idx: number) => {
    const isCorrect = submitted ? results[q._id] : undefined;
    const borderColor = submitted
      ? isCorrect
        ? "success"
        : "danger"
      : "secondary";

    return (
      <div
        key={q._id}
        className={`border border-${borderColor} rounded p-3 mb-4`}
      >
        <div className="d-flex justify-content-between mb-2">
          <strong>Question {idx + 1}</strong>
          <span className="text-muted">{q.points} pts</span>
        </div>
        <p>{q.question}</p>

        {q.type === "MULTIPLE_CHOICE" && (
          <Form>
            {(q.choices || []).map((choice: any, ci: number) => (
              <Form.Check
                key={ci}
                type="radio"
                label={choice.text}
                name={`q-${q._id}`}
                value={choice.text}
                checked={answers[q._id] === choice.text}
                onChange={(e) =>
                  setAnswers((prev) => ({ ...prev, [q._id]: e.target.value }))
                }
                disabled={submitted}
              />
            ))}
          </Form>
        )}

        {q.type === "TRUE_FALSE" && (
          <Form>
            {["True", "False"].map((opt) => (
              <Form.Check
                key={opt}
                type="radio"
                label={opt}
                name={`q-${q._id}`}
                value={opt.toLowerCase()}
                checked={answers[q._id] === opt.toLowerCase()}
                onChange={(e) =>
                  setAnswers((prev) => ({ ...prev, [q._id]: e.target.value }))
                }
                disabled={submitted}
              />
            ))}
          </Form>
        )}

        {q.type === "FILL_IN_BLANK" && (
          <Form.Control
            type="text"
            placeholder="Your answer"
            value={answers[q._id] ?? ""}
            onChange={(e) =>
              setAnswers((prev) => ({ ...prev, [q._id]: e.target.value }))
            }
            disabled={submitted}
          />
        )}

        {submitted && (
          <div className={`mt-2 text-${isCorrect ? "success" : "danger"}`}>
            {isCorrect ? "Correct" : "Incorrect"}
          </div>
        )}
      </div>
    );
  };

  if (!quiz) return <div className="p-3">Loading...</div>;

  const score = submitted
    ? questions.reduce((sum, q) => sum + (results[q._id] ? q.points || 0 : 0), 0)
    : 0;
  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  const visibleQuestions = quiz.oneQuestionAtATime
    ? [questions[currentIndex]].filter(Boolean)
    : questions;

  return (
    <div id="wd-quiz-preview" className="p-3">
      <Alert variant="warning">
        This is a preview of the published version of the quiz
      </Alert>

      <h3>{quiz.title}</h3>

      {/* Question jump navigation */}
      {quiz.oneQuestionAtATime && questions.length > 0 && (
        <div className="d-flex flex-wrap gap-1 mb-3">
          {questions.map((_: any, idx: number) => (
            <Button
              key={idx}
              size="sm"
              variant={idx === currentIndex ? "danger" : "outline-secondary"}
              onClick={() => setCurrentIndex(idx)}
            >
              {idx + 1}
            </Button>
          ))}
        </div>
      )}

      {visibleQuestions.map((q, idx) =>
        renderQuestion(q, quiz.oneQuestionAtATime ? currentIndex : idx)
      )}

      {quiz.oneQuestionAtATime && !submitted && (
        <div className="d-flex gap-2 mb-3">
          {currentIndex > 0 && (
            <Button
              variant="outline-secondary"
              onClick={() => setCurrentIndex((i) => i - 1)}
            >
              Previous
            </Button>
          )}
          {currentIndex < questions.length - 1 ? (
            <Button
              variant="outline-secondary"
              onClick={() => setCurrentIndex((i) => i + 1)}
            >
              Next
            </Button>
          ) : (
            <Button variant="danger" onClick={handleSubmit}>
              Submit Quiz
            </Button>
          )}
        </div>
      )}

      {!quiz.oneQuestionAtATime && !submitted && (
        <Button variant="danger" onClick={handleSubmit} className="mb-3">
          Submit Quiz
        </Button>
      )}

      {submitted && (
        <div className="alert alert-info">
          Score: {score} out of {totalPoints} points
        </div>
      )}

      <hr />
      <div className="d-flex gap-2">
        <Button
          variant="outline-secondary"
          onClick={() =>
            router.push(`/courses/${cid}/quizzes/${qid}/editor/questions`)
          }
        >
          Keep Editing This Quiz
        </Button>
        <Button
          variant="outline-secondary"
          onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/editor`)}
        >
          Edit Quiz
        </Button>
      </div>
    </div>
  );
}
