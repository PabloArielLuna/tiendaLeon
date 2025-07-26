import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SwitchLink = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  text-align: center;
  color: #666;

  a.signup-link,
  a.login-link {
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;

    /* Fuerzo los colores */
    &.signup-link {
      color: #4CAF93 !important;
    }

    &.login-link {
      color: #0d54bfff !important;
    }

    &:hover {
      text-decoration: underline;
      text-shadow: 0 0 6px rgba(76, 175, 147, 0.4); /* Verde glow */
    }
  }
`;