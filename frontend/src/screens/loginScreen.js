import { useState, useEffect, memo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../app/auth/slice';
import Loader from '../components/notes/loader';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, loading, error, message } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const redirect = location.search ? location.search.split('=')[1] : '';
  console.log(redirect);

  useEffect(() => {
    document.title = 'Log in';
    if (user) return navigate(`/${redirect}`);
  }, [user, navigate, redirect]);

  function loginHandler(e) {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
    console.log(email, password);
    console.log(message);
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <h1>Sign In</h1>
          <Form onSubmit={loginHandler}>
            {error && <p className='alert-danger p-2'>{message}</p>}
            <Form.Group>
              <Form.Label id='email'>Email Address</Form.Label>
              <Form.Control
                id='email'
                type='email'
                as='input'
                placeholder='Enter your email'
                value={email}
                name={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label id='password'>Password </Form.Label>
              <Form.Control
                id='password'
                as='input'
                type='password'
                placeholder='Enter your password'
                value={password}
                name={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button className='mt-2' type='submit' variant='primary'>
              Sign In
            </Button>
          </Form>
          <Row className='py-3'>
            <Col>
              New Custumer?
              <Link
                to={redirect ? `/register?redire=${redirect}` : '/register'}>
                Register
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default memo(LoginScreen);
