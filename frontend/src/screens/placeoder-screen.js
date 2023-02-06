import { memo, useEffect } from 'react';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../app/order/Slice';

import CheckSteps from '../components/checkStep';
import Loader from '../components/notes/loader';

function PlaceOrderScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, orderReducer } = useSelector((state) => state);
  const { cartShip, cartPayment, cartItems } = cart;
  const { order, loading, success, message, error } = orderReducer;
  const itemsPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  const shippingPrice = cartItems > 100 ? 0 : 100;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));

  console.log(order);
  const totalPrice =
    Number(shippingPrice) + Number(itemsPrice) + Number(taxPrice);

  useEffect(() => {
    document.title = 'Place Order';
    if (success) {
      navigate(`/order/${order._id}`);
    }
  }, [navigate, success, order]);

  function placeorderHandler() {
    dispatch(
      createOrder({
        orderItems: cartItems,
        cartShip,
        cartPayment,
        shippingPrice,
        itemsPrice,
        taxPrice,
        totalPrice,
      })
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <CheckSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cartShip.address}, {cartShip.city} {cartShip.postalCode},
                {cartShip.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2> Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {cartPayment}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Product Order</h2>
              <ListGroup variant='flush'>
                {cartItems.map((item, i) => (
                  <ListGroup.Item key={i}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>{item.name}</Col>
                      <Col md={4}>
                        {item.qty} x {item.price} = {item.price * item.qty}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h4>Order Summary</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Item</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>{error && <p>{message}</p>}</ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={placeorderHandler}>
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      ;
    </>
  );
}

export default memo(PlaceOrderScreen);
