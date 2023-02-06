import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Footer from './components/footer';
import { Container } from 'react-bootstrap';
import Header from './components/header';
import HomeScreen from './screens/home-screen';
import ProductScreen from './screens/product-screen';
import CartScreen from './screens/cart-screen';
import LoginScreen from './screens/loginScreen';
import ShippingScreen from './screens/shipping';
import PaymentScreen from './screens/payment';
import PlaceOrderScreen from './screens/placeoder-screen';
import OrderScreen from './screens/orderScreen';
import Profile from './screens/profile';
import UpadateUser from './screens/updateUser';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/search/:keyword' element={<HomeScreen />} />
            <Route
              path='/search/:keyword/page/:pageNumber'
              element={<HomeScreen />}
            />
            <Route path='/page/:pageNumber' element={<HomeScreen />} />
            <Route path='/' element={<HomeScreen />} />
            <Route path='/profile/' element={<Navigate to='settings' />} />
            <Route path='/profile/*' element={<Profile />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/cart/:id' element={<CartScreen />} />
            <Route path='/admin/user/:id/edit' element={<UpadateUser />} />
            <Route path='/order/:id' element={<OrderScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
