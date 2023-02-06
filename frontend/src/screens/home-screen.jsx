import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { useEffect } from 'react';
import Product from '../components/product';
import Loader from '../components/notes/loader';
import { getProducts } from '../app/product/productSlice';
import { useParams } from 'react-router-dom';
import Paginate from '../components/paginate';

function HomeScreen() {
  const dispatch = useDispatch();
  const params = useParams();
  const keyword = params.keyword || '';
  const pageNumber = params.pageNumber || '';
  const { products, loading, pages, page, error, message } = useSelector(
    (state) => state.ProductReducer
  );
  console.log(pages, page);
  console.log(pageNumber, keyword);
  useEffect(() => {
    document.title = 'Shops';
    dispatch(getProducts({ keyword, pageNumber }));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <h1>latest Product</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <span className='alert-danger p-2 mt-2'>{message}</span>
      ) : (
        <>
          <Row>
            {products?.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product {...product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword} />
        </>
      )}
    </>
  );
}
export default memo(HomeScreen);
