import React, { useState } from 'react';
import { Button, Col, Container, Form, FormGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePayment } from '../app/cart/cartSlice';
import CheckSteps from '../components/checkStep';

function PaymentScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartShip } = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState('Paypal');

  console.log(cartShip);

  if (!cartShip) {
    console.log('shipping');
    navigate('/shipping');
  }
  document.title = 'Payment';

  function submitHandler(e) {
    e.preventDefault();
    dispatch(savePayment(paymentMethod));
    console.log(paymentMethod);
    navigate('/placeorder');
  }
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xm={12} md={6}>
          <CheckSteps step1 step2 step3 />
          <h1> Payment Method</h1>
          <Form onSubmit={submitHandler}>
            <FormGroup>
              <Form.Label as='legend'>Select Method</Form.Label>
              <Form.Check
                type='radio'
                label='PayPal or Credit card'
                id='PayPal'
                name={paymentMethod}
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </FormGroup>
            <Button className='mt-2' type='submit'>
              Continue
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default React.memo(PaymentScreen);
