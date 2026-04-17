"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { Form, Row, Col, Button, Nav } from "react-bootstrap";
import { RootState } from "../../../../../store";
import { updateQuiz as updateQuizInStore } from "../../reducer";
import * as client from "../../client";

function toDatetimeLocal(isoString: string | undefined): string {
  if (!isoString) return "";
  try {
    return new Date(isoString).toISOString().substring(0, 16);
  } catch {
    return "";
  }
}

export default function QuizEditor() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as any;

  const [quiz, setQuiz] = useState<any>({
    title: "Unnamed Quiz",
    description: "",
    quizType: "Graded Quiz",
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    howManyAttempts: 1,
    showCorrectAnswers: "Immediately",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "",
    availableDate: "",
    untilDate: "",
    points: 0,
    published: false,
    numberOfQuestions: 0,
  });

  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  useEffect(() => {
    if (!isFaculty) {
      router.push(`/courses/${cid}/quizzes/${qid}`);
      return;
    }
    client.findQuizById(qid).then((data) => {
      if (data) setQuiz(data);
    });
  }, [qid]);

  const set = (field: string, value: any) =>
    setQuiz((prev: any) => ({ ...prev, [field]: value }));

  const save = async (publish?: boolean) => {
    const toSave =
      publish !== undefined ? { ...quiz, published: publish } : quiz;
    await client.updateQuiz(toSave);
    dispatch(updateQuizInStore(toSave));
    if (publish) {
      router.push(`/courses/${cid}/quizzes`);
    } else {
      router.push(`/courses/${cid}/quizzes/${qid}`);
    }
  };

  return (
    <div id="wd-quiz-editor" className="p-3">
      {/* Status bar */}
      <div className="d-flex justify-content-end align-items-center mb-3 gap-3">
        <span className="text-muted">Points: {quiz.points}</span>
        <span
          className={`badge ${quiz.published ? "bg-success" : "bg-secondary"}`}
        >
          {quiz.published ? "Published" : "Not Published"}
        </span>
      </div>

      {/* Tabs */}
      <Nav variant="tabs" className="mb-4">
        <Nav.Item>
          <Nav.Link active>Details</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() =>
              router.push(`/courses/${cid}/quizzes/${qid}/editor/questions`)
            }
          >
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Title */}
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={quiz.title}
          onChange={(e) => set("title", e.target.value)}
        />
      </Form.Group>

      {/* Description */}
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={quiz.description}
          onChange={(e) => set("description", e.target.value)}
        />
      </Form.Group>

      {/* Quiz Type */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3} className="text-end">
          Quiz Type
        </Form.Label>
        <Col sm={9}>
          <Form.Select
            value={quiz.quizType}
            onChange={(e) => set("quizType", e.target.value)}
          >
            {["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"].map(
              (t) => (
                <option key={t}>{t}</option>
              )
            )}
          </Form.Select>
        </Col>
      </Form.Group>

      {/* Assignment Group */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3} className="text-end">
          Assignment Group
        </Form.Label>
        <Col sm={9}>
          <Form.Select
            value={quiz.assignmentGroup}
            onChange={(e) => set("assignmentGroup", e.target.value)}
          >
            {["Quizzes", "Exams", "Assignments", "Project"].map((g) => (
              <option key={g}>{g}</option>
            ))}
          </Form.Select>
        </Col>
      </Form.Group>

      {/* Options */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3} className="text-end">
          Options
        </Form.Label>
        <Col sm={9}>
          <Form.Check
            type="checkbox"
            label="Shuffle Answers"
            checked={quiz.shuffleAnswers}
            onChange={(e) => set("shuffleAnswers", e.target.checked)}
            className="mb-2"
          />
          <div className="d-flex align-items-center gap-2 mb-2">
            <Form.Check
              type="checkbox"
              label="Time Limit"
              checked={quiz.timeLimit > 0}
              onChange={(e) => set("timeLimit", e.target.checked ? 20 : 0)}
            />
            {quiz.timeLimit > 0 && (
              <>
                <Form.Control
                  type="number"
                  min={1}
                  value={quiz.timeLimit}
                  onChange={(e) => set("timeLimit", Number(e.target.value))}
                  style={{ width: "80px" }}
                />
                <span>Minutes</span>
              </>
            )}
          </div>
          <div className="d-flex align-items-center gap-2">
            <Form.Check
              type="checkbox"
              label="Allow Multiple Attempts"
              checked={quiz.multipleAttempts}
              onChange={(e) => set("multipleAttempts", e.target.checked)}
            />
            {quiz.multipleAttempts && (
              <>
                <Form.Label className="mb-0 ms-2">How Many:</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  value={quiz.howManyAttempts}
                  onChange={(e) =>
                    set("howManyAttempts", Number(e.target.value))
                  }
                  style={{ width: "80px" }}
                />
              </>
            )}
          </div>
        </Col>
      </Form.Group>

      {/* Show Correct Answers */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3} className="text-end">
          Show Correct Answers
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            value={quiz.showCorrectAnswers}
            onChange={(e) => set("showCorrectAnswers", e.target.value)}
          />
        </Col>
      </Form.Group>

      {/* Access Code */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3} className="text-end">
          Access Code
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            value={quiz.accessCode}
            onChange={(e) => set("accessCode", e.target.value)}
          />
        </Col>
      </Form.Group>

      {/* Quiz Settings checkboxes */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3} className="text-end">
          Quiz Settings
        </Form.Label>
        <Col sm={9}>
          <Form.Check
            type="checkbox"
            label="One Question at a Time"
            checked={quiz.oneQuestionAtATime}
            onChange={(e) => set("oneQuestionAtATime", e.target.checked)}
            className="mb-2"
          />
          <Form.Check
            type="checkbox"
            label="Webcam Required"
            checked={quiz.webcamRequired}
            onChange={(e) => set("webcamRequired", e.target.checked)}
            className="mb-2"
          />
          <Form.Check
            type="checkbox"
            label="Lock Questions After Answering"
            checked={quiz.lockQuestionsAfterAnswering}
            onChange={(e) =>
              set("lockQuestionsAfterAnswering", e.target.checked)
            }
          />
        </Col>
      </Form.Group>

      {/* Dates */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3} className="text-end">
          Due
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="datetime-local"
            value={toDatetimeLocal(quiz.dueDate)}
            onChange={(e) => set("dueDate", e.target.value)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3} className="text-end">
          Available from
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="datetime-local"
            value={toDatetimeLocal(quiz.availableDate)}
            onChange={(e) => set("availableDate", e.target.value)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3} className="text-end">
          Until
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="datetime-local"
            value={toDatetimeLocal(quiz.untilDate)}
            onChange={(e) => set("untilDate", e.target.value)}
          />
        </Col>
      </Form.Group>

      <hr />

      {/* Action buttons */}
      <div className="d-flex justify-content-end gap-2">
        <Button
          variant="secondary"
          onClick={() => router.push(`/courses/${cid}/quizzes`)}
        >
          Cancel
        </Button>
        <Button variant="secondary" onClick={() => save(true)}>
          Save & Publish
        </Button>
        <Button variant="danger" onClick={() => save()}>
          Save
        </Button>
      </div>
    </div>
  );
}
