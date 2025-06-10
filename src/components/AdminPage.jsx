import React from "react";
import { Container } from "react-bootstrap";

function AdminPage() {
  return (
    <Container className="text-center my-5">
      <h2 className="mb-4">Welcome to the Admin Panel</h2>
      <p className="lead">Only authorized users can access this section.</p>
    </Container>
  );
}

export default AdminPage;