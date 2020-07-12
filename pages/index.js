import { useEffect } from "react";
import Router from "next/router";
import User from "../lib/user";
import LoginTypes from "../components/types/logintypes"

function HomePage() {
  const { student, teacher, manager } = logintypes;
  useEffect(() => {
    let isLogin = false;
    if (User.getToken()) isLogin = true;

    if (!isLogin) {
      Router.push("/login");
    } else {
      const loginType = User.getLoginType();
      if (loginType === teacher) {
        Router.push("/student");
      } else if (loginType === student) {
        Router.push("/student/selections");
      } else if (loginType === manager) {
        Router.push("/student");
      }
    }
  });

  return <React.Fragment></React.Fragment>;
}

export default HomePage;