import React from 'react';
import {
  Col,
  Row,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useParams, useLocation } from 'react-router-dom';
import { addToCart } from '../app/cart/cartSlice';

function CartScreen() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const state = useSelector((state) => state);
  const qty = location.search ? +location.search.split('=')[1] : 1;
  React.useEffect(() => {
    if (id) {
      // console.log(id);
      dispatch(addToCart({ id, qty }));
    }
  }, [dispatch, id, qty]);

  function removeCartHandler(id) {}
  function checkoutHandler() {
    navigate('/login?redirect=shipping');
  }
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems?.length === 0 ? (
          <>
            <h3>Your cart is empty</h3>
            <Link to='/'>Go back</Link>
          </>
        ) : (
          <ListGroup variant='flush'>
            {cartItems?.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) => {
                        console.log(item.product, +e.target.value);
                        dispatch(
                          addToCart({ id: item.product, qty: +e.target.value })
                        );
                      }}>
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeCartHandler(item.product)}>
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </h3>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}>
                Proceed Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default React.memo(CartScreen);
