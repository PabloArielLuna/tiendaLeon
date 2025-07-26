import styled from "styled-components";

export const FooterWrapper = styled.footer`
  background-color: #212529;
  color: white;
  text-align: center;
  padding: 1rem 0;
  margin-top: auto;
`;

export const IconRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
`;

export const FooterIcon = styled.a`
  color: white;
  font-size: 1.2rem;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: #0dcaf0;
    transform: scale(1.15);
  }

  @media (max-width: 576px) {
    font-size: 1rem;
    margin: 0 0.3rem;
  }
`;

export const FooterText = styled.p`
  font-size: 0.85rem;
  margin: 0;

  @media (max-width: 576px) {
    font-size: 0.75rem;
  }
`;