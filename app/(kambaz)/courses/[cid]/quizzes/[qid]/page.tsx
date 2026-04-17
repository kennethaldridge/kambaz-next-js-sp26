"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { RootState } from "../../../../store";
import * as client from "../client";
import * as attemptsClient from "../attemptsClient";
import { formatDate } from "../utils";

export default function QuizDetails() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as any;
  const [quiz, setQuiz] = useState<any>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [latestAttempt, setLatestAttempt] = useState<any>(null);

  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  useEffect(() => {
    const load = async () => {
      const q = await client.findQuizById(qid);
      setQuiz(q);
      if (!isFaculty) {
        try {
          const attempts = await attemptsClient.getAttempts(qid);
          setAttemptCount(attempts.length);
          const latest = await attemptsClient.getLatestAttempt(qid);
          setLatestAttempt(latest);
        } catch (_) {}
      }
    };
    load();
  }, [qid]);

  if (!quiz) return <div className="p-3">Loading...</div>;

  const now = new Date();
  const available = quiz.availableDate ? new Date(quiz.availableDate) : null;
  const until = quiz.untilDate ? new Date(quiz.untilDate) : null;
  const isAvailable =
    quiz.published &&
    (!available || now >= available) &&
    (!until || now <= until);

  const unavailabilityMessage = !quiz.published
    ? "This quiz is not yet published."
    : until && now > until
    ? "This quiz is closed."
    : available && now < available
    ? `Not available until ${formatDate(quiz.availableDate)}`
    : null;

  const noAttemptsRemaining =
    !isFaculty &&
    ((!quiz.multipleAttempts && attemptCount >= 1) ||
      (quiz.multipleAttempts && attemptCount >= quiz.howManyAttempts));

  return (
    <div id="wd-quiz-details" className="p-3">
      {/* Action buttons */}
      <div className="d-flex justify-content-center gap-2 mb-4">
        {isFaculty ? (
          <>
            <Button
              variant="secondary"
              onClick={() =>
                router.push(`/courses/${cid}/quizzes/${qid}/preview`)
              }
            >
              Preview
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                router.push(`/courses/${cid}/quizzes/${qid}/editor`)
              }
            >
              ✏️ Edit
            </Button>
          </>
        ) : noAttemptsRemaining ? (
          <p className="text-muted">No attempts remaining</p>
        ) : isAvailable ? (
          <Button
            variant="danger"
            onClick={() =>
              router.push(`/courses/${cid}/quizzes/${qid}/take`)
            }
          >
            {attemptCount > 0 ? "Retake Quiz" : "Start Quiz"}
          </Button>
        ) : (
          <p className="text-muted">{unavailabilityMessage}</p>
        )}
        {!isFaculty && latestAttempt && (
          <p className="text-muted ms-2">
            Your last score: {latestAttempt.score} / {quiz.points} pts
          </p>
        )}
      </div>

      <hr />
      <h2>{quiz.title}</h2>
      <hr />

      {/* Properties */}
      <table className="table table-borderless" style={{ maxWidth: "700px" }}>
        <tbody>
          <tr>
            <td className="text-end fw-bold pe-4" style={{ width: "45%" }}>
              Quiz Type
            </td>
            <td>{quiz.quizType}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold pe-4">Points</td>
            <td>{quiz.points}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold pe-4">Assignment Group</td>
            <td>{quiz.assignmentGroup}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold pe-4">Shuffle Answers</td>
            <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold pe-4">Time Limit</td>
            <td>
              {quiz.timeLimit ? `${quiz.timeLimit} Minutes` : "No Time Limit"}
            </td>
          </tr>
          <tr>
            <td className="text-end fw-bold pe-4">Multiple Attempts</td>
            <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
          </tr>
          {quiz.multipleAttempts && (
            <tr>
              <td className="text-end fw-bold pe-4">How Many Attempts</td>
              <td>{quiz.howManyAttempts}</td>
            </tr>
          )}
          <tr>
            <td className="text-end fw-bold pe-4">Show Correct Answers</td>
            <td>{quiz.showCorrectAnswers || "—"}</td>
          </tr>
          {quiz.accessCode && (
            <tr>
              <td className="text-end fw-bold pe-4">Access Code</td>
              <td>{quiz.accessCode}</td>
            </tr>
          )}
          <tr>
            <td className="text-end fw-bold pe-4">One Question at a Time</td>
            <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold pe-4">Webcam Required</td>
            <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold pe-4">
              Lock Questions After Answering
            </td>
            <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
          </tr>
        </tbody>
      </table>

      <hr />

      {/* Dates table */}
      <table className="table" style={{ maxWidth: "700px" }}>
        <thead>
          <tr>
            <th>Due</th>
            <th>For</th>
            <th>Available from</th>
            <th>Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{formatDate(quiz.dueDate)}</td>
            <td>Everyone</td>
            <td>{formatDate(quiz.availableDate)}</td>
            <td>{formatDate(quiz.untilDate)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
