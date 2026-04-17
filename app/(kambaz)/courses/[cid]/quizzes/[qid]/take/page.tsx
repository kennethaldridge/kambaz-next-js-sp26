"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button, Form, Alert } from "react-bootstrap";
import { RootState } from "../../../../../store";
import * as attemptsClient from "../../attemptsClient";
import * as questionsClient from "../editor/questionsClient";
import * as quizClient from "../../client";

export default function QuizTake() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as any;

  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Access code state
  const [enteredCode, setEnteredCode] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [codeError, setCodeError] = useState(false);

  useEffect(() => {
    if (isFaculty) {
      router.push(`/courses/${cid}/quizzes/${qid}/preview`);
      return;
    }
    const load = async () => {
      const q = await quizClient.findQuizById(qid);
      setQuiz(q);
      const qs = await questionsClient.findQuestionsForQuiz(qid);
      setQuestions(qs);

      try {
        const attempts = await attemptsClient.getAttempts(qid);
        const count = attempts.length;
        if (
          (!q.multipleAttempts && count >= 1) ||
          (q.multipleAttempts && count >= q.howManyAttempts)
        ) {
          router.push(`/courses/${cid}/quizzes/${qid}`);
          return;
        }
      } catch (_) {}

      setLoading(false);
    };
    load();
  }, [qid]);

  const handleSubmit = async () => {
    const answerArray = questions.map((q) => ({
      question: q._id,
      answer: answers[q._id] || "",
    }));
    await attemptsClient.submitAttempt(qid, { answers: answerArray });
    router.push(`/courses/${cid}/quizzes/${qid}/results`);
  };

  const renderQuestion = (q: any, idx: number) => (
    <div key={q._id} className="border rounded p-3 mb-4">
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
        />
      )}
    </div>
  );

  if (loading || !quiz) return <div className="p-3">Loading...</div>;

  // Access code gate
  const needsCode = quiz.accessCode && quiz.accessCode.trim() !== "";
  if (needsCode && !accessGranted) {
    return (
      <div className="p-3" style={{ maxWidth: "400px" }}>
        <h4>Enter Access Code</h4>
        <Form.Control
          type="text"
          value={enteredCode}
          onChange={(e) => {
            setEnteredCode(e.target.value);
            setCodeError(false);
          }}
          className="mb-2"
        />
        {codeError && (
          <Alert variant="danger" className="py-2">
            Incorrect access code
          </Alert>
        )}
        <Button
          variant="danger"
          onClick={() => {
            if (enteredCode === quiz.accessCode) {
              setAccessGranted(true);
            } else {
              setCodeError(true);
            }
          }}
        >
          Submit
        </Button>
      </div>
    );
  }

  const visibleQuestions = quiz.oneQuestionAtATime
    ? [questions[currentIndex]].filter(Boolean)
    : questions;

  return (
    <div id="wd-quiz-take" className="p-3">
      <h3>{quiz.title}</h3>

      {visibleQuestions.map((q, idx) =>
        renderQuestion(q, quiz.oneQuestionAtATime ? currentIndex : idx)
      )}

      {quiz.oneQuestionAtATime ? (
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
      ) : (
        <Button variant="danger" onClick={handleSubmit} className="mb-3">
          Submit Quiz
        </Button>
      )}
    </div>
  );
}
