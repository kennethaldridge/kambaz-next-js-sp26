export default function Modules() {
    return (
      <div>
        <div>
            <button type="button">Collapse All</button>
            <button type="button">View Progess</button>
            <select id="wd-select-publish">
                <option value="PUBLISH ONE">Publish One</option>
                <option selected value="PUBLISH ALL">
                    Publish All</option>
            </select>
            <button type="button">+ Module</button>
        </div>
        <ul id="wd-modules">
          <li className="wd-module">
            <div className="wd-title">Lecture 1 - Building React User Interfaces</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to the course</li>
                  <li className="wd-content-item">What is Web Development</li>
                  <li className="wd-content-item">Setting up the Development Environment</li>
                  <li className="wd-content-item">Creating a React Web Applcation</li>
                  <li className="wd-content-item">Getting started with the Assignment 1</li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">READING</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Developing Full Stack Next.js Web Applications - Chapter 1 - Building React User Interfaces with HTML</li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">INTRO AND SETTING UP DEVELOPMENT ENVIRONMENT</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to Web Development</li>
                  <li className="wd-content-item">Installing Node.js</li>
                  <li className="wd-content-item">Creating a Next.js React Application</li>
                  <li className="wd-content-item">Commit your source to GitHub.com</li>
                  <li className="wd-content-item">Deploying to Vercel</li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">EVALUATIONS</span>
                <ul className="wd-content">
                  <li className="wd-content-item">A1</li>
                  <li className="wd-content-item">Final Project</li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="wd-module">
            <div className="wd-title">Lecture 2 - Getting Started with Assignment 1 Lab Exercises</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Learn how to create user interfaces with HTML</li>
                  <li className="wd-content-item">Get started on Assignment 1 Lab exercises</li>
                  <li className="wd-content-item">Deploy the assignment to Vercel</li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">READING</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Developing Full Stack Next.js Web Applications - Chapter 1 - Building React User Interfaces with HTML</li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">ASSIGNMENT 1 - HTML LAB EXERCISES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to HTML and the DOM</li>
                  <li className="wd-content-item">Formatting Web content with Headings and Paragraphs</li>
                  <li className="wd-content-item">Formatting content with Lists and Tables</li>
                  <li className="wd-content-item">Creating Web Forms</li>
                  <li className="wd-content-item">Navigating with Anchors</li>
                  <li className="wd-content-item">Single Page Navigation</li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">EVALUATIONS</span>
                <ul className="wd-content">
                  <li className="wd-content-item">A1</li>
                  <li className="wd-content-item">Final Project</li>
                  <li className="wd-content-item">Project - Kambaz Quizzes</li>
                  <li className="wd-content-item">Project - Kambaz Pazza</li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="wd-module">
            <div className="wd-title">Lecture 3 - Getting Started with the Kambaz Web Application</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Learn how to create user interfaces with HTML</li>
                  <li className="wd-content-item">Start implementing the Kambaz Web Application</li>
                  <li className="wd-content-item">Update Vercel deployment</li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">READING</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Developing Full Stack Next.js Web Applications - Chapter 1 - Building React User Interfaces with HTML</li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">ASSIGNMENT 1 - PROTOTYPING THE KAMBAZ REACT APPLICATION WITH HTML</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Implementing the Kambaz Account Screens</li>
                  <li className="wd-content-item">Implementing the Kambaz Dashboard Screen</li>
                  <li className="wd-content-item">Implementing the Kambaz Courses Screen</li>
                  <li className="wd-content-item">Implementing the Kambaz Modules Screen</li>
                  <li className="wd-content-item">Implementing the Kambaz Assignments Screens</li>
                  <li className="wd-content-item">Kanbas Web App on Netlify</li>
                </ul>
              </li> 
              <li className="wd-lesson">
                <span className="wd-title">EVALUATIONS</span>
                <ul className="wd-content">
                  <li className="wd-content-item">A1</li>
                  <li className="wd-content-item">Final Project</li>
                  <li className="wd-content-item">Project - aKambaz Quizzes</li>
                  <li className="wd-content-item">Project - Kambaz Pazza</li>
                  <li className="wd-content-item">Project - Open-Ended Web Application Final Project</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
  );}
  