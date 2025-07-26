import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';

export const NavbarWrapper = styled(Navbar).attrs(({ $expand, $variant }) => ({
  expand: $expand,
  variant: $variant,
}))`
  background-color: #2c3e50;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

export const Brand = styled.a`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;

  &:hover {
    color: #0dcaf0;
  }
`;