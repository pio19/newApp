import React from "react";
import Input from "../components/Input";
import { useState } from "react";
import { router } from "..";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClick = () => {
    if (username === "admin" && password === "123") {
      alert("Đăng nhập thành công!");
      router.navigate('/home');
    } else {
      alert("Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản và mật khẩu.");
    }
  };

  return (
    <div className="Login">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <Input
              label={"Username"}
              type={"username"}
              name={"username"}
              onChange={handleUsername}
            />
            <Input
              label={"Password"}
              type={"password"}
              name={"password"}
              onChange={handlePassword}
            />

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleClick}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
