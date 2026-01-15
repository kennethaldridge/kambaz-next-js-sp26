import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course"> 
            <Link href="/courses/1235" className="wd-dashboard-course-link">
                <Image src="/images/css.jpg" width={200} height={150} alt="css" />
                <div>
                <h5> CS1235 CSS </h5>
                <p className="wd-dashboard-course-title">
                    CSS Sytling
                </p>
                <button> Go </button>
                </div>
            </Link>
        </div>
        <div className="wd-dashboard-course">
            <Link href="/courses/1000" className="wd-dashboard-course-link">
                <Image src="/images/writing.jpeg" width={200} height={150} alt="intro writing" />
                <div>
                <h5> ENG1000 Intro Writing </h5>
                <p className="wd-dashboard-course-title">
                    Introduction to Academic Writing
                </p>
                <button> Go </button>
                </div>
            </Link> 
        </div>
        <div className="wd-dashboard-course">
            <Link href="/courses/2000" className="wd-dashboard-course-link">
                <Image src="/images/advwriting.webp" width={200} height={150} alt="adv writing" />
                <div>
                <h5> ENG2000 Advanced Writing </h5>
                <p className="wd-dashboard-course-title">
                    Advanced Academic Writing
                </p>
                <button> Go </button>
                </div>
            </Link> 
        </div>
        <div className="wd-dashboard-course">
            <Link href="/courses/5431" className="wd-dashboard-course-link">
                <Image src="/images/multcalc.jpeg" width={200} height={150} alt="multi calc" />
                <div>
                <h5> MATH5431 Multivariable Calculus </h5>
                <p className="wd-dashboard-course-title">
                    Upper Level Multivariable Calculus
                </p>
                <button> Go </button>
                </div>
            </Link> 
        </div>
        <div className="wd-dashboard-course">
            <Link href="/courses/2222" className="wd-dashboard-course-link">
                <Image src="/images/python.webp" width={200} height={150} alt="int python" />
                <div>
                <h5> DS2222 Intermediate Python </h5>
                <p className="wd-dashboard-course-title">
                    Python Programming for Data Science
                </p>
                <button> Go </button>
                </div>
            </Link> 
        </div>
        <div className="wd-dashboard-course">
            <Link href="/courses/4343" className="wd-dashboard-course-link">
                <Image src="/images/profcoop.jpeg" width={200} height={150} alt="prof coop" />
                <div>
                <h5> COOP4343 Professional Study</h5>
                <p className="wd-dashboard-course-title">
                    Professonial Co-Op Study
                </p>
                <button> Go </button>
                </div>
            </Link> 
        </div>
      </div>
    </div>
);}
