"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment } from "../../assignments/reducer";

export default function AssignmentEditor() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );
  const isNew = aid === "new";
  const original = useMemo(() => {
    if (isNew) return null;
    return assignments.find((a: any) => a._id === aid) ?? null;
  }, [aid, assignments, isNew]);

  const initialAssignment = useMemo(() => {
    if (isNew) {
      return {
        _id: uuidv4(),
        course: cid,
        title: "New Assignment",
        description: "",
        points: 100,
        dt_due: "",
        dt_available: "",
        dt_until: "",
      };
    }
    return original;
  }, [cid, isNew, original]);
  if (!initialAssignment) {
    return <div className="p-3">Assignment not found.</div>;
  }
  const [assignment, setAssignment] = useState<any>({ ...initialAssignment });
  const save = () => {
    if (isNew) dispatch(addAssignment(assignment));
    else dispatch(updateAssignment(assignment));

    router.push(`/courses/${assignment.course}/assignments`);
  };
  const cancel = () => {
    router.push(`/courses/${assignment.course}/assignments`);
  };
  return (
    <div key={assignment._id} id="wd-assignments-editor">
      <Row className="mb-3">
        <Col>
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            as="textarea"
            rows={1}
            className="assignments-editor-form"
            value={assignment.title}
            onChange={(e) =>
              setAssignment({ ...assignment, title: e.target.value })
            }
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Control
            as="textarea"
            rows={10}
            id="wd-assignment-instructions"
            value={assignment.description}
            onChange={(e) =>
              setAssignment({ ...assignment, description: e.target.value })
            }
          />
        </Col>
      </Row>
      <Row className="mb-3" controlId="points">
        <Form.Label className="text-end" column sm={3}>
          Points
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="number"
            value={assignment.points}
            onChange={(e) =>
              setAssignment({ ...assignment, points: Number(e.target.value) })
            }
          />
        </Col>
      </Row>
      <Row className="mb-3" controlId="assign">
        <Form.Label className="text-end" column sm={3}>
          Assign
        </Form.Label>
        <Col sm={9}>
          <div className="wd-assignments-editor-box">
            <Form.Group className="mb-3">
              <Form.Label>Due</Form.Label>
              <Form.Control
                type="datetime-local"
                value={assignment.dt_due ?? ""}
                onChange={(e) =>
                  setAssignment({ ...assignment, dt_due: e.target.value })
                }
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Available From</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={assignment.dt_available ?? ""}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        dt_available: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Until</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={assignment.dt_until ?? ""}
                    onChange={(e) =>
                      setAssignment({ ...assignment, dt_until: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Button
        variant="danger"
        size="lg"
        className="me-1 float-end"
        id="wd-save-btn"
        onClick={save}
      >
        Save
      </Button>
      <Button
        variant="secondary"
        size="lg"
        className="me-1 float-end"
        id="wd-cancel-btn"
        onClick={cancel}
      >
        Cancel
      </Button>
    </div>
  );
}