import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const NavItem = styled(NavLink)`
  color: white;
  margin: 0 0.75rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;

  &.active {
    border-bottom: 2px solid #0dcaf0;
  }

  &:hover {
    color: #0dcaf0;
  }

  @media (max-width: 768px) {
    display: block;
    margin: 0.5rem 0;
  }
`;