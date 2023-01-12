import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Page imports
import Login from './pages/login';

import Overview from './pages/overview';
import Conditions from './pages/conditions';

import Categories from './pages/categories/categories';
import CategoryEdit from './pages/categories/categoryEdit';
import CategoryAdd from './pages/categories/categoryAdd';

import Products from './pages/products/products';
import UpdateProduct from './pages/products/updateProduct';
import NewProduct from './pages/products/newProduct';

import Collections from './pages/collections/collections';
import EditCollection from './pages/collections/collectionEdit';
import AddCollection from './pages/collections/collectionAdd';

import Customers from './pages/customers/customers';
import Customer from './pages/customers/customer';

import Orders from './pages/orders/orders';
import Order from './pages/orders/order';
import MainList from './pages/mainCollections/mainList';
import MainEdit from './pages/mainCollections/mainEdit';
import MainAdd from './pages/mainCollections/mainAdd';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Overview />} />
        <Route path='/dashboard/conditions' element={<Conditions />} />

        {/* CATEGORIES */}
        <Route path="/dashboard/categories" element={<Categories />} />
        <Route path="/dashboard/categories/:id/edit" element={<CategoryEdit />} />
        <Route path="/dashboard/categories/new" element={<CategoryAdd />} />

        {/* PRODUCTS */}
        <Route path="/dashboard/products" element={<Products />} />
        <Route path="/dashboard/products/:id/edit" element={<UpdateProduct />} />
        <Route path="/dashboard/products/new" element={<NewProduct />} />

        {/* MAIN COLLECTIONS */}
        <Route path="/dashboard/main-collections" element={<MainList />} />
        <Route path="/dashboard/main-collections/:id/edit" element={<MainEdit />} />
        <Route path="/dashboard/main-collections/new" element={<MainAdd />} />

        {/* COLLECTIONS */}
        <Route path='/dashboard/collections' element={<Collections />} />
        <Route path='/dashboard/collections/:id/edit' element={<EditCollection />} />
        <Route path='/dashboard/collections/new' element={<AddCollection />} />

        {/* CUSTOMERS */}
        <Route path='/dashboard/customers' element={<Customers />} />
        <Route path='/dashboard/customers/:id' element={<Customer />} />

        {/* ORDERS */}
        <Route path='/dashboard/orders' element={<Orders />} />
        <Route path='/dashboard/orders/:id' element={<Order />} />

      </Routes>
    </Router>
  );
}

export default App;
