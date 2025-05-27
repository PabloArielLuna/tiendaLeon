import { Container } from "react-bootstrap";

function Home() {
  return (
    <Container>
      <h1>Welcome to Tienda León</h1>
      <p className="lead text-center mt-4">
  Looking for something different? You're in the right place. Top products, fair prices, and zero hassle. Join the experience!
</p>
      <img src="/banner.jpg" alt="Banner principal" className="banner-img" />
    </Container>
  );
}

export default Home;