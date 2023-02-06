import React from 'react';
import { Table } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserOrder } from '../app/order/Slice';
import Loader from '../components/notes/loader';

function UserOrder() {
  const dispatch = useDispatch();
  const { orders, loading, error, message } = useSelector(
    (state) => state.orderReducer
  );
  const { user } = useSelector((state) => state.auth);
  console.log(orders);
  React.useEffect(() => {
    if (user) {
      dispatch(getUserOrder());
    } else {
      Navigate('/login');
    }
  }, [dispatch, user]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className='alert-danger text-xl-center p-3'>{message}</p>;
  }
  return (
    <div className='ml-5'>
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>DELIVERED</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>${order.totalPrice}</td>
              <td>
                <FaTimes className='text-danger ml-4' />
              </td>
              <td>Details</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default React.memo(UserOrder);
