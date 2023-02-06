import { useState, useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../app/auth/slice';
import Loader from '../components/notes/loader';

function Settings() {
  const { user, loading, message, succes, error } = useSelector(
    (state) => state.auth
  );
  const auth = useSelector((state) => state.auth);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [info, setInfo] = useState(message);
  const [danger, setdanger] = useState(error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(auth);

  useEffect(() => {
    if (!user) return navigate(`/`);
  }, [user, navigate]);

  function updateHandler(e) {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
    };
    if (password !== passwordConfirm) {
      setdanger(true);
      setInfo('Password is not match');
      console.log(info);
    } else {
      dispatch(updateProfile(userData));
    }
  }
  console.log(error, succes);
  console.log(message);
  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <h3>Settings</h3>
          <Form onSubmit={updateHandler}>
            {succes && <p className='alert-success p-2'>Profile updated</p>}
            {danger && <p className='alert-danger p-2'>{info}</p>}
            <Form.Group>
              <Form.Label>Name </Form.Label>
              <Form.Control
                type='name'
                as='input'
                placeholder='Enter your email'
                value={name}
                name={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
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
            <Form.Group>
              <Form.Label id='confirm-password'>Confirm Password </Form.Label>
              <Form.Control
                id='confirm-password'
                as='input'
                type='password'
                placeholder='Confirm your password'
                value={passwordConfirm}
                name={password}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </Form.Group>
            <Button className='mt-2' type='submit' variant='primary'>
              update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default memo(Settings);
