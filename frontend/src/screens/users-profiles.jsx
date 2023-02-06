import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { FaTrash, FaCheck, FaEdit, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { getUsers, deleteUser } from '../app/auth/slice';
import Loader from '../components/notes/loader';

function UsersProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const { users, loading, error, succesDelete, message } = useSelector(
    (state) => state.auth
  );
  console.log(users);

  React.useEffect(() => {
    if (user.isAdmin) dispatch(getUsers());
  }, [dispatch, user, succesDelete]);

  if (loading) {
    return <Loader />;
  }
  function deleteHandler(id) {
    dispatch(deleteUser(id));
    console.log(id);
  }

  if (error) {
    return <p className='alert-danger text-xl-center p-3'>{message}</p>;
  }
  return (
    <>
      <h3>users</h3>
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.isAdmin ? (
                  <FaCheck className='text-success' />
                ) : (
                  <FaTimes className='text-danger' />
                )}
              </td>
              <td>
                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                  <Button variant='light' className='btn-sm'>
                    <FaEdit />
                  </Button>
                </LinkContainer>

                <Button
                  variant='danger'
                  className='btn-sm ml-4'
                  onClick={() => deleteHandler(user._id)}>
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

export default UsersProfile;
