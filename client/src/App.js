import { Routes, Route } from 'react-router-dom';

import Shop from './components/Shop';
import Navigation from './components/Navigation';
import AddProduct from './components/AddProduct';
import AdminProducts from './components/AdminProducts';
import EditProduct from './components/EditProduct';
import Cart from './components/Cart';
import Detail from './components/ProductDetail';
import Orders from './components/Orders';
import Products from './components/Products';

import './App.css';
import './CSS/main.css';
import './CSS/product.css';
import './CSS/forms.css';
import Login from './components/Login';

function App() {
  return (
    <div className='App'>
      <Navigation />
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/products' element={<Products />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/admin/add-product' element={<AddProduct />} />
        <Route path='/admin/products' element={<AdminProducts />} />
        <Route
          path='/admin/edit-product/:productId'
          element={<EditProduct />}
        />
        <Route exact path='/detail/:productId' element={<Detail />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
