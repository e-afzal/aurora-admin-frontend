import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/orders.css';

// COMPONENT
import Sidebar from '../../components/Sidebar';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/orders`)
      .then((res) => setOrders(res.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="dashboard-grid">

      {/* SIDEBAR */}
      <Sidebar activePage={"orders"} />

      <div className="dashboard-container">
        <div className="divider"></div>
        <section className="dashboard-main">
          <div className="area-header">
            <h3>Orders</h3>
          </div>
          <div className="area-filters">
            <input
              type="search"
              name="search-product"
              id="search-product"
              placeholder="search by order number"
              minLength="4"
              maxLength="30"
            />
            <div className="filter-sort">
              <button className="filter">filter</button>
              <button className="sort">sort</button>
            </div>
          </div>
          <div className="area-table">
            <table>
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Date</th>
                  <th>Customer Name</th>
                  <th>Total</th>
                  <th>Payment Status</th>
                  <th>Order Status</th>
                  <th>Delivery Method</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((eachOrder, index) => (
                  <tr key={index}>
                    <td><Link to={"/dashboard/orders/" + eachOrder.orderNumber}>#{eachOrder.orderNumber}</Link></td>
                    <td>{new Date(eachOrder.createdAt).toLocaleDateString("en-AE", { month: "short", day: "numeric", year: "2-digit" })}</td>
                    <td>{eachOrder.name}</td>
                    <td>AED {eachOrder.total.toFixed(2)}</td>
                    <td>ticked</td>
                    <td>{eachOrder.fulfillmentStatus}</td>
                    <td>{eachOrder.shippingMethod || "standard"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Orders;