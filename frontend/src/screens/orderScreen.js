import { memo, useEffect } from 'react';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrder } from '../app/order/Slice';

import Loader from '../components/notes/loader';

function OrderScreen() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { orderReducer } = useSelector((state) => state);

  const { orderDetail, loading, message, error } = orderReducer;

  useEffect(() => {
    dispatch(getOrder(id));
  }, [dispatch, id]);

  // function placeorderHandler() {
  //   dispatch(getOrder(order._id));
  // }

  console.log(orderDetail);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{message}</p>;
  }

  return (
    <>
      <h1>Order {orderDetail._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong> <span>{orderDetail.user?.name} </span>
              </p>
              <p>
                <strong>Email:</strong>
                <a href={`mailto:${orderDetail.user?.email}`}>
                  <span> {orderDetail.user?.email} </span>
                </a>
              </p>

              <p>
                <strong>Address: </strong>
                <span>
                  {orderDetail.shippingAddress?.address},
                  {orderDetail.shippingAddress?.city},
                  {orderDetail.shippingAddress?.postalCode},
                  {orderDetail.shippingAddress?.country}
                </span>
              </p>
              {orderDetail.isDelivered ? (
                <span className='py-2 text-success'>
                  Delivered{orderDetail.delivredAt}
                </span>
              ) : (
                <span className='text-danger danger p-2'>Not Delivered</span>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2> Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {orderDetail.paymentMethod}
              </p>
              {orderDetail.isPaid ? (
                <span className='py-2 text-success'>
                  Paid{orderDetail.paidAt}
                </span>
              ) : (
                <span className='text-danger danger p-2'>Not paid</span>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Product Order</h2>
              <ListGroup variant='flush'>
                {orderDetail?.orderItems?.map((item, i) => (
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
                  <Col>${orderDetail.orderPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${orderDetail.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${orderDetail.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${orderDetail.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {error && (
                <ListGroup.Item>
                  <p>{message}</p>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={orderDetail.orderItems?.length === 0}
                  // onClick={}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default memo(OrderScreen);
