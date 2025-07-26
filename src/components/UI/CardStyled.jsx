import styled from 'styled-components';
import { Card } from 'react-bootstrap';

export const CardStyled = styled(Card)`
  height: 100%;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  img {
    height: 200px;
    object-fit: contain;
  }

  .card-title {
    font-size: 1.05rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .card-text {
    font-size: 0.95rem;
    color: #555;
  }
`;