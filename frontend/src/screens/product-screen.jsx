import { useEffect, memo, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../app/product/productSlice';
import { createReview, reset } from '../app/review/review';
import Loader from '../components/notes/loader';
import Rating from '../components/rating';

function ProductScreen() {
  const [quantity, SetQuantity] = useState(1);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const match = useParams();
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.ProductReducer);
  const { user } = useSelector((state) => state.auth);
  const {
    reviewSuccess,
    reviewError: error,
    message,
  } = useSelector((state) => state.reviewReducer);

  useEffect(() => {
    if (reviewSuccess) {
      setReview('');
      setRating(0);
      dispatch(reset());
    }
    dispatch(getProduct(match.id));
  }, [dispatch, match, reviewSuccess]);

  if (loading && !product) {
    return <Loader />;
  }

  if (error) {
    return <span className='alert-danger p-2 mt-2'>{message}</span>;
  }

  console.log(product);
  function addToCartHandler() {
    navigate(`/cart/${match.id}?quantity=${quantity}`);
  }

  function submitHandler(e) {
    e.preventDefault();
    const reviewData = {
      rating,
      review,
    };
    dispatch(createReview({ id: match.id, reviewData }));
  }

  return (
    <div>
      <Link className='btn btn-light my-3' to='/'>
        Go back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={`${product.image}`} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>{product.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Quantity</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={quantity}
                        onChange={(e) => SetQuantity(e.target.value)}>
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  onClick={addToCartHandler}
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}>
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h3 className='p-0 my-3'>Reviews</h3>
          {product.reviews?.length === 0 && (
            <p className='alert-info p-2'>No reviews yet!</p>
          )}
          <ListGroup variant='flush'>
            {product.reviews?.map((review) => (
              <ListGroup.Item key={review.id}>
                <strong>{review.user.name}</strong>
                <Rating value={review.rating} />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.review}</p>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              <h4>Write a customer review</h4>
              {user ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as='select'
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}>
                      <option value={1}>1- Poor</option>
                      <option value={2}>2- Fair</option>
                      <option value={3}>3- Good</option>
                      <option value={4}>4- Very Good</option>
                      <option value={5}>5- Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Review</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={3}
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                    />
                  </Form.Group>
                  <Button type='submit' className='mt-2' variant='primary'>
                    Submit
                  </Button>
                </Form>
              ) : (
                <p>
                  Please <Link to='/login'>Login</Link>
                </p>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}

export default memo(ProductScreen);
