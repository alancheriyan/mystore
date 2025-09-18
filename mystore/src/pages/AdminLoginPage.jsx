import { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";

export default function AdminLogin({ onLogin }) {
  const [loading, setLoading] = useState(false);

  const handleLogin = ({ password }) => {
    setLoading(true);
    const correct = process.env.REACT_APP_ADMIN_PASSWORD;

    if (password === correct) {
      localStorage.setItem("isAdmin", "true"); // ✅ store session
      onLogin();
    } else {
      message.error("Invalid password");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card title="Admin Login" style={{ width: 320 }}>
        <Form onFinish={handleLogin}>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Enter admin password" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}
