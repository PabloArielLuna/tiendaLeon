import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("auth", "true");
    navigate("/admin");
  };

  return (
    <Container className="text-center my-5">
      <h2>Login Page</h2>
      <Button onClick={handleLogin}>Login as Admin</Button>
    </Container>
  );
}

export default Login;