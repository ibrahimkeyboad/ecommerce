import React from 'react';
import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserById } from '../app/auth/slice';

function UpadateUser() {
  const [isAdmin, setIsAdmin] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, userDetail, loading, error, message, success } = useSelector(
    (state) => state.auth
  );

  console.log(userDetail);
  React.useEffect(() => {
    if (!user.name || user._id !== id) {
      dispatch(getUserById(id));
    } else {
      // setIsAdmin(userDetail.isAdmin);
    }
  }, [dispatch, id, user]);
  return (
    <Container>
      <h2>User update</h2>
      <Row className='mt-5'>
        <Col>
          <Row className='align-items-center '>
            <h4> Name</h4>
            <h5 className='ml-3'>{userDetail?.name}</h5>
          </Row>
          <Row className='align-items-center my-2'>
            <h4>Email</h4>
            <h5 className='ml-3'>{userDetail.email}</h5>
          </Row>
        </Col>
      </Row>
      <Form>
        <Form.Group>
          <Form.Check
            type='checkbox'
            label='Is Admin'
            value={isAdmin}
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
        </Form.Group>
        <Button className='mt-2' type='submit' variant='primary'>
          Update
        </Button>
      </Form>
    </Container>
  );
}

export default UpadateUser;
