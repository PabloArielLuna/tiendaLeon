// src/components/ui/CartModalStyled.jsx
import styled from 'styled-components';

export const CartItem = styled.div`
  padding: 0.75rem 0;
  border-bottom: 1px solid #ddd;

  strong {
    display: block;
    margin-bottom: 0.25rem;
  }

  .subtotal {
    font-weight: bold;
    color: #2e8b57;
  }

  .remove-btn {
    margin-top: 0.5rem;
  }
`;

export const TotalStyled = styled.p`
  font-weight: bold;
  margin-top: 1rem;
  text-align: right;
  color: #198754;
  font-size: 1.1rem;
`;