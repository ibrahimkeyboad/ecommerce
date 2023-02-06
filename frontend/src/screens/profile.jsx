import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { NavLink, Route, Routes } from 'react-router-dom';
import ProductsList from './products-list';
import Settings from './settings';
import UserOrder from './userOrder';
import UsersProfile from './users-profiles';

function Profile() {
  const user = useSelector((state) => state.auth.user);
  // console.log(user);

  React.useEffect(() => {
    document.title = `${user.name} Profile`;
  }, [user]);
  return (
    <>
      <h2>Your Profile account</h2>
      <Row className='align-items-start mt-4 mh-100'>
        <Col md={2} className='border-right '>
          <NavLink className='link' to='orders'>
            Orders
          </NavLink>
          <NavLink className='link' to='settings'>
            Settings
          </NavLink>
          {user?.isAdmin && (
            <>
              <NavLink className='link' to='users'>
                users
              </NavLink>
              <NavLink className='link' to='products'>
                Products
              </NavLink>
            </>
          )}
        </Col>
        <Col md={10} className=' '>
          <Routes>
            <Route path='/settings' element={<Settings />} />
            <Route path='/users' element={<UsersProfile />} />
            <Route path='/orders' element={<UserOrder />} />
            <Route path='/products' element={<ProductsList />} />
          </Routes>
        </Col>
      </Row>
    </>
  );
}

export default Profile;
