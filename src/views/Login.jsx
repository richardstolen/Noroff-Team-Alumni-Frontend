import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = () => {
  return (
    <Container id="main-container" className="d-grid h-100">
      <Form id="sign-in-form" className="text-center w-100">
        <h1 className="mb-3 fs-3 fw-normal">Log in on Alumni</h1>
        <Form.Group controlId="sign-in-email-address">
          <Form.Control
            type="email"
            size="lg"
            placeholder="Email address"
            autoComplete="username"
            className="position-relative"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="sign-in-password">
          <Form.Control
            type="password"
            size="lg"
            placeholder="Password"
            autoComplete="current-password"
            className="position-relative"
          />
        </Form.Group>
        <div className="mb-4 d-grid">
          <Button variant="primary" size="lg">
            Log in
          </Button>
        </div>
        {/* <Button variant="primary" size="lg"></Button>
        <Button variant="primary" size="lg"></Button> */}
        <p className="mt-5 text-muted">&copy; Alumni 2023</p>
      </Form>
    </Container>
  );
};

//Note to self: - Form has not 100% height. - Kanskje fjern autocomplete.

export default Login;
