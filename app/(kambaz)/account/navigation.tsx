"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const pathname = usePathname();
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <Link href="signin" id="wd-signin-link" className={`list-group-item border-0 ${
                                   pathname === "/account/signin" ? "active" : "text-danger"}`}>
        Signin
      </Link>
      <Link href="signup" id="wd-signup-link" className={`list-group-item border-0 ${
                        pathname === "/account/signup" ? "active" : "text-danger"}`}>
        Signup
      </Link>
      <Link href="profile" id="wd-profile-link" className={`list-group-item border-0 ${
          pathname === "/account/profile" ? "active" : "text-danger"}`}>
        Profile
      </Link>
    </div>
  );}
