import Carousel from 'react-bootstrap/Carousel';
import Container  from 'react-bootstrap/Container';

function CarouselT() {
  return (
    <Container className='container-test mt-5'>
    <Carousel>
      <Carousel.Item interval={null}>
        <img
          className="d-block  carousel-images"
          src="Images/trekkspill.png"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={null}>
        <img
          className="d-block  carousel-images"
          src="Images/chess.png"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={null}>
        <img
          className="d-block carousel-images"
          src="Images/soccer.png"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </Container>
  );
}

export default CarouselT;