import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Estilos por variante
const variantStyles = {
  add: {
    background: '#4CAF93',
    border: '#4CAF93',
    color: '#fff',
    hoverBg: '#43a386'
  },
  details: {
    background: '#0d54bfff',
    border: '1px solid #0d54bfff',
    color: '#fff',
    hoverBg: 'rgba(23, 51, 153, 0.91)'
  },
  logout: {
    background: 'rgba(45, 43, 43, 0.42)',
    border: '1px solid #fff',
    color: '#fff',
    hoverBg: 'rgba(255, 255, 255, 0.1)',
    hoverBorder: '1px solid #fff'
  },
  remove: {
    background: '#dc3545',
    border: '1px solid #dc3545',
    color: '#fff',
    hoverBg: '#bb2d3b',
    hoverBorder: '1px solid #bb2d3b'
  },
  close: {
    background: '#6c757d',
    border: '1px solid #6c757d',
    color: '#fff',
    hoverBg: '#5c636a'
  },
  toggle: {
    background: '#1a1a1a',
    border: '1px solid #1a1a1a',
    color: '#fff',
    hoverBg: '#2a2a2a'
  }
};

// Componente de botón reutilizable y estilizado
export const ButtonStyled = styled.button.attrs(() => ({
  type: 'button'
}))`
  font-family: inherit;
  font-weight: 500;
  font-size: 1em;
  padding: 0.6em 1.2em;
  border-radius: 8px;
  border: ${({ $variant }) => variantStyles[$variant]?.border || '1px solid transparent'};
  background-color: ${({ $variant }) => variantStyles[$variant]?.background || '#1a1a1a'};
  color: ${({ $variant }) => variantStyles[$variant]?.color || '#fff'};
  cursor: pointer;
  text-align: center;
  display: inline-block;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${({ $variant }) => variantStyles[$variant]?.hoverBg || '#2a2a2a'};
    border: ${({ $variant }) => variantStyles[$variant]?.hoverBorder || variantStyles[$variant]?.border};
    transform: scale(1.03);
    color: ${({ $variant }) => variantStyles[$variant]?.color || '#fff'};
  }

  &:focus {
    outline: 3px auto var(--primary, #0d6efd);
  }

  &.btn-glow {
    box-shadow: 0 0 0 rgba(0, 123, 255, 0.6);
    transition: all 0.3s ease;
  }

  &.btn-glow:hover {
    box-shadow: 0 0 10px rgba(0, 123, 255, 0.8);
    transform: translateY(-2px);
  }
`;