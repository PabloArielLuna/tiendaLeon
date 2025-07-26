import styled from 'styled-components';

const variantStyles = {
  add: {
    background: '#4CAF93',
    border: '1px solid #4CAF93',
    color: '#fff',
    hoverBg: '#43a386',
  },
  details: {
    background: '#0d54bfff',
    border: '1px solid #0d54bfff',
    color: '#fff',
    hoverBg: 'rgba(23, 51, 153, 0.91)',
  },
  close: {
    background: '#6c757d',
    border: '1px solid #6c757d',
    color: '#fff',
    hoverBg: '#5c636a',
  },
  remove: {
    background: '#dc3545',
    border: '1px solid #dc3545',
    color: '#fff',
    hoverBg: '#bb2d3b',
  },
};

export const StyledButton = styled.button`
  font-family: inherit;
  font-weight: 500;
  font-size: 1em;
  padding: 0.6em 1.2em;        /* matches your global .btn */
  border-radius: 8px;         /* matches your global .btn */
  border: ${({ $variant }) => variantStyles[$variant]?.border || '1px solid transparent'};
  background-color: ${({ $variant }) => variantStyles[$variant]?.background || '#1a1a1a'};
  color: ${({ $variant }) => variantStyles[$variant]?.color || '#fff'};
  cursor: pointer;
  text-align: center;
  display: inline-block;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${({ $variant }) => variantStyles[$variant]?.hoverBg || '#2a2a2a'};
    transform: scale(1.03);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;