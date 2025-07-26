import { Container } from "react-bootstrap";

function Home() {
  return (
    <Container className="text-center mt-4">
      <h1 className="fw-bold mb-3">Welcome to Tienda León</h1>
      <p className="lead mb-4">
        Looking for something different? You're in the right place. Top products, fair prices, and zero hassle. Join the experience!
      </p>
      <div className="banner-container">
        <img
          src="/banner.png"
          alt="Banner principal"
          className="banner-img"
        />
      </div>
    </Container>
  );
}

export default Home;