import React from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { FaTrash, FaCheck, FaEdit, FaTimes, FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { getProducts } from '../app/product/productSlice';

import Loader from '../components/notes/loader';

function ProductsList() {
  const dispatch = useDispatch();

  const { products, message, loading, error } = useSelector(
    (state) => state.ProductReducer
  );
  console.log(message);

  React.useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className='alert-danger text-xl-center p-3'>{message}</p>;
  }
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h3>Products</h3>
        </Col>
        <Col className='text-right '>
          <Button>
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover responsive className='table-sm mt-2'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            {/* <th>CATEGORY</th> */}
            <th>BRAND</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              {/* <td>{product.category}</td> */}
              <td>{product.brand}</td>
              <td>
                {product.isAdmin ? (
                  <FaCheck className='text-success' />
                ) : (
                  <FaTimes className='text-danger' />
                )}
              </td>
              <td>
                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                  <Button variant='light' className='btn-sm'>
                    <FaEdit />
                  </Button>
                </LinkContainer>

                <Button variant='danger' className='btn-sm ml-4'>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ProductsList;
