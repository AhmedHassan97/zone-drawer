import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import LoginComponent from "../app/components/login/LoginComponent";

const Login: NextPage = () => {
  return (
    <div>
      <LoginComponent />
    </div>
  );
};

export default Login;
