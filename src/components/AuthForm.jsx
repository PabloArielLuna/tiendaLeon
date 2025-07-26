import React from "react";
import styled from "styled-components";
import { FaUser, FaLock, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { StyledButton } from "./UI/StyledButton";

const Wrapper = styled.div`
  max-width: 420px;
  margin: 3rem auto;
  padding: 0 1rem;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  text-align: center;
  color: ${({ type }) => (type === "signup" ? "#198754" : "#0d6efd")};
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
`;

const IconWrapper = styled.span`
  color: #888;
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  border: none;
  outline: none;
  flex: 1;
  font-size: 1rem;
`;

const SwitchLink = styled.p`
  text-align: center;
  margin-top: 1rem;
  a {
    color: ${({ type }) => (type === "signup" ? "#198754" : "#0d6efd")};
    text-decoration: none;
    font-weight: 500;
  }
  a:hover {
    text-decoration: underline;
  }
`;

export default function AuthForm({
  type = "login",
  form,
  setForm,
  onSubmit,
  errors = {}
}) {
  return (
    <Wrapper>
      <Title type={type}>
        {type === "signup" ? "Create Account" : "Login"}
      </Title>
      <StyledForm onSubmit={onSubmit}>
        {/* Username */}
        <div>
          <Label>Username</Label>
          <InputGroup>
            <IconWrapper>
              <FaUser />
            </IconWrapper>
            <Input
              type="text"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />
          </InputGroup>
          {errors.username && (
            <div style={{ color: "red", fontSize: "0.85rem", marginTop: "0.25rem" }}>
              {errors.username}
            </div>
          )}
        </div>

        {/* Password */}
        <div>
          <Label>Password</Label>
          <InputGroup>
            <IconWrapper>
              <FaLock />
            </IconWrapper>
            <Input
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </InputGroup>
          {errors.password && (
            <div style={{ color: "red", fontSize: "0.85rem", marginTop: "0.25rem" }}>
              {errors.password}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <StyledButton
          as="button"
          type="submit"
          $variant={type === "signup" ? "add" : "details"}
        >
          {type === "signup" ? (
            <FaUserPlus style={{ marginRight: 8 }} />
          ) : (
            <FaSignInAlt style={{ marginRight: 8 }} />
          )}
          {type === "signup" ? "Sign Up" : "Login"}
        </StyledButton>
      </StyledForm>

      <SwitchLink type={type}>
        {type === "signup" ? (
          <>Already have an account? <Link to="/login">Login</Link></>
        ) : (
          <>No account? <Link to="/signup">Sign up</Link></>
        )}
      </SwitchLink>
    </Wrapper>
  );
}