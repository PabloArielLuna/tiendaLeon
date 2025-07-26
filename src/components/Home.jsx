import { Container } from "react-bootstrap";
import styled from "styled-components";

const HomeWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center; /* centra vertical */
  align-items: center;
  padding: 2rem 1rem;
  text-align: center;
`;

const BannerImg = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin-top: 2rem;
`;

function Home() {
  return (
    <HomeWrapper>
      <h1 className="fw-bold mb-3">Welcome to Tienda León</h1>
      <p className="lead mb-4">
        Looking for something different? You're in the right place. Top products, fair prices, and zero hassle. Join the experience!
      </p>
      <BannerImg src="/banner.png" alt="Banner principal" />
    </HomeWrapper>
  );
}

export default Home;