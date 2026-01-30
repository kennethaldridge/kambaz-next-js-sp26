"use client";

import FormSelect from 'react-bootstrap/FormSelect';
import FormCheck from 'react-bootstrap/FormCheck';
import FormRange from 'react-bootstrap/FormRange';
import InputGroup from 'react-bootstrap/InputGroup';;
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <Row className="mb-3">
          <Col>
            <Form.Label>Assignment Name</Form.Label>
            <Form.Control as="textarea" rows={1} defaultValue="A1" className='assignments-editor-form'/>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Control as="textarea" rows={10} id='wd-assignment-instructions'
              defaultValue={
`The assignment is available online 

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:

-Your full name and section
-Links to each of the lab assignments
-Link to the Kanbas application
-Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`}/>
          </Col>
        </Row>
        <Row className="mb-3" controlId="points">
                <Form.Label className="text-end" column sm={3}> Points </Form.Label>
                <Col sm={9}>
                    <Form.Control type="email" defaultValue={100} />
                </Col>
        </Row>
        <Row className="mb-3" controlId="assignment-group">
          <Form.Label className="text-end" column sm={3}> Assignment Group </Form.Label>
          <Col sm={9}>
            <FormSelect>
                    <option value="ASSIGNMENTS" defaultChecked>ASSIGNMENTS</option>
                    <option value="TESTS">TESTS</option>
                    <option value="QUIZZES">QUIZZES</option>
                    <option value="PROJECTS">PROJECTS</option>
              </FormSelect>
          </Col>
        </Row>
        <Row className="mb-3" controlId="display-grade">
          <Form.Label className="text-end" column sm={3}> Display Grade as </Form.Label>
          <Col sm={9}>
            <FormSelect>
                    <option value="Percentage" defaultChecked>Percentage</option>
                    <option value="Points">Points</option>
                    <option value="Letter">Letter</option>
              </FormSelect>
          </Col>
        </Row>
        <Row className="mb-3" controlId="submission-type">
          <Form.Label className="text-end" column sm={3}> Submission Type </Form.Label>
          <Col sm={9}>
            <div className='wd-assignments-editor-box'>
              <FormSelect className='mb-4'>
                <option value="Online" defaultChecked>Online</option>
                <option value="In-Person">In-Person</option>
              </FormSelect>
              <div className="fw-bold mb-2">Online Entry Options</div>
              <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" className="mb-2" />
              <Form.Check type="checkbox" label="Website URL" defaultChecked className="mb-2"/>
              <Form.Check type="checkbox" label="Media Recordings" className="mb-2" />
              <Form.Check type="checkbox" label="Student Annotation" className="mb-2" />
              <Form.Check type="checkbox" label="File Uploads" />
            </div>
          </Col>
        </Row>
        <Row className="mb-3" controlId="assign">
          <Form.Label className="text-end" column sm={3}> Assign </Form.Label>
          <Col sm={9}>
            <div className='wd-assignments-editor-box'>
              <Form.Group className="mb-3">
                <Form.Label className='fw-bold'>Assign to</Form.Label>
                <Form.Control type="text" defaultValue="Everyone" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Due</Form.Label>
                <Form.Control type="datetime-local" defaultValue="2024-05-13T23:59"/>
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Available From</Form.Label>
                    <Form.Control type="datetime-local" defaultValue="2024-05-06T23:59"/>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Until</Form.Label>
                    <Form.Control type="datetime-local"/>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
    </div>
);}
