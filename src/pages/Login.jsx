import React, { useContext, useState } from "react";
import { Button, Form, Input, Typography, message } from "antd";
import "../css/Login.css";
import { router } from "..";

import { Router, useNavigate } from "react-router-dom";
import { getUsers, login } from "../base/api";
import { ThemeContext } from "../App";

const { Title } = Typography;

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext);
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { access_token } = await login(values.email, values.password);
      localStorage.setItem("access_token", access_token);
      message.success("Đăng nhập thành công!");
      navigate("/admin");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Đã xảy ra lỗi!";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Form
        style={{
          backgroundColor: isDarkMode ? "#1a1a1a" : "#f0f0f0",
        }}
        name="login-form"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Title level={2} className="login-title">
          LOGIN
        </Title>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please typing email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please typing password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
