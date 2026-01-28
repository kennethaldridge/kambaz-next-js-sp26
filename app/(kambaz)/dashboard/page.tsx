import Link from "next/link";
import { Row, Col, Card, CardBody, CardTitle, CardText, CardImg, Button } from "react-bootstrap";
import "../styles.css";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
            <Col className="wd-dashboard-course" style={{ width: "300px", marginBottom: "32px" }}>
                <Card>
                <Link href="/courses/1234/home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
                <CardBody>
                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</CardTitle>
                <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Full Stack software developer</CardText>
                <Button variant="primary">Go</Button>
                </CardBody>
                </Link>
                </Card>
            </Col>
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                <Link href="/courses/12345/home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/css.jpg" width="100%" height={160}/>
                <CardBody>
                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1235 CSS</CardTitle>
                <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                CSS Sytling</CardText>
                <Button variant="primary">Go</Button>
                </CardBody>
                </Link>
                </Card>
            </Col>
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                <Link href="/courses/1000/home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/writing.jpeg" width="100%" height={160}/>
                <CardBody>
                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">ENG1000 Intro Writing</CardTitle>
                <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                Introduction to Academic Writing</CardText>
                <Button variant="primary">Go</Button>
                </CardBody>
                </Link>
                </Card>
            </Col>
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                <Link href="/courses/2000/home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/advwriting.webp" width="100%" height={160}/>
                <CardBody>
                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">ENG2000 Advanced Writing</CardTitle>
                <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                Advanced Academic Writing</CardText>
                <Button variant="primary">Go</Button>
                </CardBody>
                </Link>
                </Card>
            </Col>
        </Row>
        <Row xs={1} md={5} className="g-4">
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                <Link href="/courses/5431/home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/multcalc.jpeg" width="100%" height={160}/>
                <CardBody>
                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">MATH5431 Multivariable Calculus</CardTitle>
                <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                Upper Level Multivariable Calculus</CardText>
                <Button variant="primary">Go</Button>
                </CardBody>
                </Link>
                </Card>
            </Col>
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                <Link href="/courses/2222/home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/python.webp" width="100%" height={160}/>
                <CardBody>
                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">DS2222 Intermediate Python</CardTitle>
                <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                Python Programming for Data Science</CardText>
                <Button variant="primary">Go</Button>
                </CardBody>
                </Link>
                </Card>
            </Col>
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                <Link href="/courses/4343/home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/profcoop.jpeg" width="100%" height={160}/>
                <CardBody>
                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">COOP4343 Professional Study</CardTitle>
                <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                Professonial Co-Op Study</CardText>
                <Button variant="primary">Go</Button>
                </CardBody>
                </Link>
                </Card>
            </Col>
        </Row>
      </div>
    </div>
);}
