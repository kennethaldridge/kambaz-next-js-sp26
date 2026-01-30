"use client";

import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function KambazNavigation() {
  const pathname = usePathname();
  return (
    <ListGroup className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2" style={{ width: 110 }}
               id="wd-kambaz-navigation">
      <ListGroupItem className="bg-black border-0 text-center" as="a"
               target="_blank" href="https://www.northeastern.edu/" id="wd-neu-link">
        <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
      </ListGroupItem><br />
      <ListGroupItem className={`border-0 text-center ${
                    pathname.startsWith("/account") ? "wd-nav-bg-active" : "wd-nav-bg-inactive"}`}>
        <Link href="/account" id="wd-account-link" className="wd-nav-link text-decoration-none">
          <FaRegCircleUser className="fs-1 wd-nav-icon" />
          <br />
          Account
        </Link>
      </ListGroupItem><br />
      <ListGroupItem className={`border-0 text-center ${
                    pathname.startsWith("/dashboard") ? "wd-nav-bg-active" : "wd-nav-bg-inactive"}`}>
        <Link href="/dashboard" id="wd-dashboard-link" className="wd-nav-link text-decoration-none">
          <AiOutlineDashboard className="fs-1 text-danger" />
          <br />
          Dashboard
        </Link>
      </ListGroupItem><br />
      <ListGroupItem className={`border-0 text-center ${
                    pathname.startsWith("/courses") ? "wd-nav-bg-active" : "wd-nav-bg-inactive"}`}>
        <Link href="/courses" id="wd-courses-link" className="wd-nav-link text-decoration-none">
          <LiaBookSolid className="fs-1 text-danger" />
          <br />
          Courses
        </Link>
      </ListGroupItem><br />
      <ListGroupItem className={`border-0 text-center ${
                    pathname.startsWith("/calendar") ? "wd-nav-bg-active" : "wd-nav-bg-inactive"}`}>
        <Link href="/calendar" id="wd-calendar-link" className="wd-nav-link text-decoration-none">
          <IoCalendarOutline className="fs-1 text-danger" />
          <br />
          Calendar
        </Link>
      </ListGroupItem><br />
      <ListGroupItem className={`border-0 text-center ${
                    pathname.startsWith("/inbox") ? "wd-nav-bg-active" : "wd-nav-bg-inactive"}`}>
        <Link href="/inbox" id="wd-inbox-link" className="wd-nav-link text-decoration-none">
          <FaInbox className="fs-1 text-danger" />
          <br />
          Inbox
        </Link>
      </ListGroupItem><br />
      <ListGroupItem className={`border-0 text-center ${
                    pathname.startsWith("/labs") ? "wd-nav-bg-active" : "wd-nav-bg-inactive"}`}>
        <Link href="/labs" id="wd-labs-link" className="wd-nav-link text-decoration-none">
          <LiaCogSolid className="fs-1 text-danger" />
          <br />
          Labs
        </Link>
      </ListGroupItem><br />
    </ListGroup>
 );}
 
