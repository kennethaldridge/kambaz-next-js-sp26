"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { Nav, Button, Form } from "react-bootstrap";
import { RootState } from "../../../../../../store";
import {
  setQuestions,
  addQuestion,
  updateQuestion as updateQuestionInStore,
  deleteQuestion as deleteQuestionAction,
} from "../../../questionsReducer";
import { updateQuiz as updateQuizInStore } from "../../../reducer";
import * as questionsClient from "../questionsClient";
import * as quizClient from "../../../client";

export default function QuestionsEditor() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as any;
  const { questions } = useSelector(
    (state: RootState) => state.questionsReducer
  );

  const [quiz, setQuiz] = useState<any>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<any>(null);

  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  useEffect(() => {
    if (!isFaculty) {
      router.push(`/courses/${cid}/quizzes/${qid}`);
      return;
    }
    const load = async () => {
      const q = await quizClient.findQuizById(qid);
      setQuiz(q);
      const qs = await questionsClient.findQuestionsForQuiz(qid);
      dispatch(setQuestions(qs));
    };
    load();
  }, [qid]);

  const recalcQuiz = async (updatedQuestions: any[]) => {
    const totalPoints = updatedQuestions.reduce(
      (sum, q) => sum + (q.points || 0),
      0
    );
    const updated = {
      ...quiz,
      points: totalPoints,
      numberOfQuestions: updatedQuestions.length,
    };
    await quizClient.updateQuiz(updated);
    dispatch(updateQuizInStore(updated));
    setQuiz(updated);
  };

  const handleAddQuestion = async () => {
    const newQ = await questionsClient.createQuestion(qid, {
      order: questions.length,
    });
    dispatch(addQuestion(newQ));
    const updatedQuestions = [...questions, newQ];
    await recalcQuiz(updatedQuestions);
    setEditingId(newQ._id);
    setDraft({ ...newQ });
  };

  const handleDelete = async (questionId: string) => {
    if (!window.confirm("Delete this question?")) return;
    await questionsClient.deleteQuestion(questionId);
    dispatch(deleteQuestionAction(questionId));
    const updatedQuestions = questions.filter((q) => q._id !== questionId);
    await recalcQuiz(updatedQuestions);
  };

  const handleUpdate = async () => {
    await questionsClient.updateQuestion(draft);
    dispatch(updateQuestionInStore(draft));
    const updatedQuestions = questions.map((q) =>
      q._id === draft._id ? draft : q
    );
    await recalcQuiz(updatedQuestions);
    setEditingId(null);
    setDraft(null);
  };

  const setDraftField = (field: string, value: any) =>
    setDraft((prev: any) => ({ ...prev, [field]: value }));

  const handleTypeChange = (type: string) => {
    setDraft((prev: any) => ({
      ...prev,
      type,
      choices: type === "MULTIPLE_CHOICE" ? prev.choices || [] : [],
      correctAnswer: type === "TRUE_FALSE" ? true : prev.correctAnswer,
      correctAnswers: type === "FILL_IN_BLANK" ? prev.correctAnswers || [] : [],
    }));
  };

  const renderChoicesEditor = () => (
    <Form.Group className="mb-3">
      <Form.Label>Choices</Form.Label>
      {(draft.choices || []).map((choice: any, idx: number) => (
        <div key={idx} className="d-flex align-items-center gap-2 mb-2">
          <Form.Check
            type="radio"
            name="correctChoice"
            checked={choice.isCorrect}
            onChange={() =>
              setDraft((prev: any) => ({
                ...prev,
                choices: prev.choices.map((c: any, i: number) => ({
                  ...c,
                  isCorrect: i === idx,
                })),
              }))
            }
            title="Mark as correct"
          />
          <Form.Control
            value={choice.text}
            onChange={(e) =>
              setDraft((prev: any) => ({
                ...prev,
                choices: prev.choices.map((c: any, i: number) =>
                  i === idx ? { ...c, text: e.target.value } : c
                ),
              }))
            }
          />
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() =>
              setDraft((prev: any) => ({
                ...prev,
                choices: prev.choices.filter((_: any, i: number) => i !== idx),
              }))
            }
          >
            &times;
          </Button>
        </div>
      ))}
      <Button
        variant="outline-secondary"
        size="sm"
        onClick={() =>
          setDraft((prev: any) => ({
            ...prev,
            choices: [...(prev.choices || []), { text: "", isCorrect: false }],
          }))
        }
      >
        + Add Another Answer
      </Button>
    </Form.Group>
  );

  const renderTrueFalseEditor = () => (
    <Form.Group className="mb-3">
      <Form.Label>Correct Answer</Form.Label>
      <div>
        <Form.Check
          type="radio"
          label="True"
          name="tfAnswer"
          checked={draft.correctAnswer === true}
          onChange={() => setDraftField("correctAnswer", true)}
          inline
        />
        <Form.Check
          type="radio"
          label="False"
          name="tfAnswer"
          checked={draft.correctAnswer === false}
          onChange={() => setDraftField("correctAnswer", false)}
          inline
        />
      </div>
    </Form.Group>
  );

  const renderFillInBlankEditor = () => (
    <Form.Group className="mb-3">
      <Form.Label>Correct Answers</Form.Label>
      {(draft.correctAnswers || []).map((ans: string, idx: number) => (
        <div key={idx} className="d-flex align-items-center gap-2 mb-2">
          <Form.Control
            value={ans}
            onChange={(e) =>
              setDraft((prev: any) => ({
                ...prev,
                correctAnswers: prev.correctAnswers.map((a: string, i: number) =>
                  i === idx ? e.target.value : a
                ),
              }))
            }
          />
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() =>
              setDraft((prev: any) => ({
                ...prev,
                correctAnswers: prev.correctAnswers.filter(
                  (_: string, i: number) => i !== idx
                ),
              }))
            }
          >
            &times;
          </Button>
        </div>
      ))}
      <Button
        variant="outline-secondary"
        size="sm"
        onClick={() =>
          setDraft((prev: any) => ({
            ...prev,
            correctAnswers: [...(prev.correctAnswers || []), ""],
          }))
        }
      >
        + Add Another Answer
      </Button>
    </Form.Group>
  );

  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  return (
    <div id="wd-quiz-questions-editor" className="p-3">
      {/* Status bar */}
      <div className="d-flex justify-content-end align-items-center mb-3">
        <span className="text-muted">Points: {totalPoints}</span>
      </div>

      {/* Tabs */}
      <Nav variant="tabs" className="mb-4">
        <Nav.Item>
          <Nav.Link
            onClick={() =>
              router.push(`/courses/${cid}/quizzes/${qid}/editor`)
            }
          >
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active>Questions</Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Question list */}
      {questions.map((q: any) =>
        editingId === q._id ? (
          /* EDIT MODE */
          <div
            key={q._id}
            className="border rounded p-3 mb-3"
            style={{ background: "#f8f9fa" }}
          >
            {/* Type selector */}
            <Form.Group className="mb-3">
              <Form.Label>Question Type</Form.Label>
              <Form.Select
                value={draft.type || "MULTIPLE_CHOICE"}
                onChange={(e) => handleTypeChange(e.target.value)}
              >
                <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                <option value="TRUE_FALSE">True/False</option>
                <option value="FILL_IN_BLANK">Fill in the Blank</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={draft.title || ""}
                onChange={(e) => setDraftField("title", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Points</Form.Label>
              <Form.Control
                type="number"
                min={0}
                value={draft.points ?? 1}
                onChange={(e) =>
                  setDraftField("points", Number(e.target.value))
                }
                style={{ width: "100px" }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={draft.question || ""}
                onChange={(e) => setDraftField("question", e.target.value)}
              />
            </Form.Group>

            {draft.type === "MULTIPLE_CHOICE" && renderChoicesEditor()}
            {draft.type === "TRUE_FALSE" && renderTrueFalseEditor()}
            {draft.type === "FILL_IN_BLANK" && renderFillInBlankEditor()}

            <div className="d-flex gap-2 justify-content-end">
              <Button
                variant="secondary"
                onClick={() => {
                  setEditingId(null);
                  setDraft(null);
                }}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={handleUpdate}>
                Update Question
              </Button>
            </div>
          </div>
        ) : (
          /* VIEW MODE */
          <div
            key={q._id}
            className="border rounded p-3 mb-3 d-flex justify-content-between align-items-start"
          >
            <div>
              <strong>{q.title}</strong>
              <span className="badge bg-secondary ms-2 me-2">
                {q.type?.replace("_", " ")}
              </span>
              <span className="text-muted small">{q.points} pts</span>
            </div>
            <div className="d-flex gap-2">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => {
                  setEditingId(q._id);
                  setDraft({ ...q });
                }}
              >
                Edit
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleDelete(q._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        )
      )}

      <Button variant="outline-secondary" className="mb-4" onClick={handleAddQuestion}>
        + New Question
      </Button>

      <hr />

      {/* Bottom buttons */}
      <div className="d-flex justify-content-end gap-2">
        <Button
          variant="secondary"
          onClick={() => router.push(`/courses/${cid}/quizzes`)}
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => router.push(`/courses/${cid}/quizzes/${qid}`)}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
