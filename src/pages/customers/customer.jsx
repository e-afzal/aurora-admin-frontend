import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/customer.css';

// COMPONENTS
import Sidebar from '../../components/Sidebar';

const Customer = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/users/${id}`)
      .then(res => setUser(res.data))
      .catch(error => console.log(console.log(error)));
  }, [id]);

  return (
    user.userInfo && user.orderInfo && (
      <div className="dashboard-grid">

        {/* SIDEBAR */}
        <Sidebar activePage={"customers"} />

        <div className="dashboard-container">
          <div className="divider"></div>
          <section className="dashboard-main">
            <div className="area-header">
              <div className="arrow-title">
                <img
                  src="/images/icons/chevron-right-outline-white.svg"
                  alt="Return Back Icon"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(-1)}
                />
                <h3>{user.userInfo.name}</h3>
              </div>
            </div>

            <div className="area-grid">
              <section className="order-details">
                <div className="order-facts-grid">
                  <section className="spent">
                    <h4>
                      total amount <br />
                      spent
                    </h4>
                    <p>AED {user.orderInfo.totalSpent}</p>
                  </section>
                  <section className="placed">
                    <h4>total orders placed</h4>
                    <p>{user.orderInfo.orderCount} {user.orderInfo.orderCount > 1 ? "orders" : "order"}</p>
                  </section>
                  <section className="average">
                    <h4>
                      avg. order <br />
                      value
                    </h4>
                    <p>AED 2,365.00</p>
                  </section>
                </div>
                <div className="last">
                  <h4>last order placed</h4>
                  <div className="order-grid">
                    <div className="order-details">
                      <div className="status">
                        <Link to={`/dashboard/orders/${user.orderInfo.orders[0].orderNumber}`}>#{user.orderInfo.orders[0].orderNumber}</Link><span className="payment-status">paid</span>
                        <span className="fulfillment-status">unfulfilled</span>
                      </div>
                      <p>Ordered on {new Date(user.orderInfo.orders[0].createdAt).toLocaleDateString("en-AE", { month: "short", day: "2-digit", year: "numeric" })}</p>
                    </div>
                    <div className="order-amount">
                      <p>AED 3,600.00</p>
                    </div>
                  </div>
                </div>

                <div className="total-orders">
                  <h4>total orders placed</h4>
                  {user.orderInfo.orders && user.orderInfo.orders.map((eachOrder, index) => (
                    <div key={index} class="order-grid">
                      <div class="order-details">
                        <div class="status">
                          <Link to={`/dashboard/orders/${eachOrder.orderNumber}`}>#{eachOrder.orderNumber}</Link
                          ><span class="payment-status">paid</span>
                          <span class="fulfillment-status">{eachOrder.fulfillmentStatus}</span>
                        </div>
                        <p>Ordered on {new Date(eachOrder.createdAt).toLocaleDateString("en-AE", { month: "short", day: "2-digit", year: "numeric" })}</p>
                      </div>
                      <div class="order-amount">
                        <p>AED {eachOrder.total.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}

                </div>
              </section>

              <div className="customer-details">
                <div className="details-card">
                  <h4>Customer details</h4>
                  <div className="customer-name">
                    <h5 className="name">Customer Name</h5>
                    <p>{user.userInfo.name}</p>
                  </div>
                  <div className="customer-email">
                    <h5 className="email">Customer Email</h5>
                    <p>{user.userInfo.email}</p>
                  </div>
                  <div className="shipping-address">
                    <h5>Shipping Address</h5>
                    <p className="shipping-name">{user.userInfo.name}</p>
                    <p className="shipping-residence">{user.userInfo.primaryAddress.apartment}</p>
                    <p className="shipping-city">{user.userInfo.primaryAddress.city}</p>
                    <p className="shipping-country">{user.userInfo.primaryAddress.country}</p>
                    <p className="shipping-contact">{user.userInfo.primaryAddress.phone}</p>
                  </div>
                  <div className="billing-address">
                    <h5>Billing address</h5>
                    <p>Same as shipping address</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div >
      </div >
    )
  );
};

export default Customer;