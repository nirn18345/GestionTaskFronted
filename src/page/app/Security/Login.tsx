import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Button, FloatingLabel, Image } from 'react-bootstrap';
import { BoxArrowInRight, EnvelopeFill, LockFill } from 'react-bootstrap-icons';
import '../../../assets/styles/Security.css';
import { login } from '../../../services/authServices';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { parseJwt } from '../../../utils/token';
const Login = () => {
  const navigate = useNavigate();
  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const response = await login(email, password);
  const payload = parseJwt(response.data.token);
  console.log(payload);

  const role = payload?.role;
  const name = payload?.FullName;
  const userId = payload?.UserId; 

  // Guardar en localStorage
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('role', role);
  localStorage.setItem('name', name);
  localStorage.setItem('userId', userId); // 👈 guardar userId

  navigate('/app/home');
};


  return (
   <Container fluid className="vh-100 overflow-hidden p-0 m-0">
      <Row className="h-100">
        {/* Lado izquierdo: Imagen */}
        <Col md={6} className="d-none d-md-block login-background p-0" />

        {/* Lado derecho: Login */}
        <Col md={6} className="d-flex align-items-center justify-content-center" style={{backgroundColor:'#f2edf3'}}>
          <Card className="p-5 shadow rounded-5  w-100" style={{ maxWidth: 500 }}>
            <Row>
              <Col className="text-center mb-4">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                  height={100}
                  width={100}
                  rounded
                />
                <h3 className="mt-3 fw-bold">User Login</h3>
                <p className="text-muted">Welcome back! Please sign in to continue</p>
              </Col>
            </Row>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formEmail">
                <FloatingLabel controlId="floatingEmail" label="Email address">
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    className="border border-secondary-subtle rounded-4"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <EnvelopeFill className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" size={18} />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    className="border border-secondary-subtle rounded-4"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <LockFill className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" size={18} />
                </FloatingLabel>
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <Form.Check label="Remember me" />
                <a href="#" className="text-decoration-none">Forgot password?</a>
              </div>

              <div className="d-flex justify-content-center align-items-center mb-3">
                <Button
                  variant="primary"
                  type="submit"
                  className="w-50 py-2 fw-semibold rounded-pill shadow-sm d-flex align-items-center justify-content-center gap-2"
                >
                  <BoxArrowInRight />
                  Login
                </Button>
              </div>

              

             
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
