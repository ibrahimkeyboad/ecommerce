import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { shippingAddress } from '../app/cart/cartSlice';
import CheckSteps from '../components/checkStep';

function ShippingScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartShip } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(cartShip.address);
  const [city, setCity] = useState(cartShip.city);
  const [postalCode, setPostalCode] = useState(cartShip.postalCode);
  const [country, setCountry] = useState(cartShip.country);

  console.log(cartShip);
  document.title = 'Shipping';
  function submitHandler(e) {
    e.preventDefault();
    dispatch(shippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  }
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xm={12} md={6}>
          <CheckSteps step1 step2 />
          <h1> Shopping</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label id='address'>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your address'
                value={address}
                name={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label id='address'>City</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your city'
                value={city}
                name={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label id='postalCode'>PostalCode</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your postalCode'
                value={postalCode}
                name={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label id='country'>Country</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your country'
                value={country}
                name={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>
            <Button type='submit'>Continue</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default React.memo(ShippingScreen);
