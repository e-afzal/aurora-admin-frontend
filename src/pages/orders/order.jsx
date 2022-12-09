import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/order.css';

// COMPONENT
import Sidebar from '../../components/Sidebar';

const Order = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({});

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/orders/${id}`)
      .then((res) => setOrder(res.data))
      .catch(error => console.log(error));
  }, [id]);
  // useEffect(() => {
  // SEMANTIC UI: DROPDOWN FUNCTIONING
  // <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
  // <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js"></script>
  // <script>
  // Make Select Dropdown, using SEMANTIC UI, to work
  //   window.onload = function () {
  //     $(".ui.dropdown").dropdown();
  //   };
  // </script>
  // }, []);

  return (
    order && (
      <div className="dashboard-grid">

        {/* SIDEBAR */}
        <Sidebar activePage={"orders"} />

        <div className="dashboard-container">
          <div className="divider"></div>
          <section className="dashboard-main">
            <div className="area-header">
              <div className="arrow-title">
                <img
                  src="/images/icons/chevron-right-outline-white.svg"
                  alt="Return Back Icon"
                  onClick={() => navigate("/dashboard/orders")}
                  style={{ cursor: "pointer" }}
                />
                <h3>
                  Order #{order.orderNumber} <span className="payment-tablet">paid</span
                  ><span className="fulfillment-tablet">{order.fulfillmentStatus}</span>
                </h3>
              </div>
              <select className="semantic ui dropdown">
                <option value="">Select Status</option>
                <option value="processing">processing order</option>
                <option value="dispatched">shipment dispatched</option>
                <option value="fulfilled">order fulfilled</option>
              </select>
            </div>

            <div className="area-grid">
              <div className="order-details">
                <section className="order-date">
                  <h4>order date</h4>
                  <p>{new Date(order.createdAt).toLocaleDateString("en-AE", { month: "long", day: "2-digit", year: "numeric" })}</p>
                </section>

                <section className="ordered-items">
                  <h4>ordered items</h4>
                  {order.cartItems && order.cartItems.map((eachItem, index) => (
                    <div key={index} className="item-grid">
                      <div className="item-detail">
                        <Link to={"/dashboard/products/" + eachItem.id}>{eachItem.productTitle}</Link>
                        <p>3 / {eachItem.goldColor}</p>
                      </div>
                      <p className="item-quantity">AED {eachItem.price.toFixed(2)} &#10005; {eachItem.quantity}</p>
                      <p className="item-amount">AED {(eachItem.price * eachItem.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </section>

                <section className="invoice-amount">
                  <h4>invoice amount</h4>
                  <div className="subtotal-grid">
                    <p className="subtotal-title">Subtotal</p>
                    <p className="subtotal-quantity">{order.cartItems && order.cartItems.length} {order.cartItems && order.cartItems.length > 1 ? "items" : "item"} </p>
                    <p className="subtotal-amount">AED {order.subtotal || 0}</p>
                  </div>
                  <div className="shipping-grid">
                    <p className="shipping-title">Shipping</p>
                    <p className="shipping-option">Standard</p>
                    <p className="shipping-amount">AED {order.shipping ? order.shipping.toFixed(2) : 0}</p>
                  </div>
                  <div className="tax-grid">
                    <p className="tax-title">Tax</p>
                    <p className="tax-percentage">VAT 5%</p>
                    <p className="tax-amount">AED {order.tax ? order.tax.toFixed(2) : 0}</p>
                  </div>
                  <div className="total-grid">
                    <p>Paid by Customer</p>
                    <p className="total-amount">AED {order.total ? order.total.toFixed(2) : 0}</p>
                  </div>
                </section>
              </div>

              <div className="customer-details">
                <div className="details-card">
                  <h4>Customer details</h4>
                  <div className="customer-name">
                    <h5 className="name">Customer Name</h5>
                    <p>{`${order.user && order.user.first_name} ${order.user && order.user.last_name}`}</p>
                  </div>
                  <div className="customer-email">
                    <h5 className="email">Customer Email</h5>
                    <p>{`${order.user && order.user.email}`}</p>
                  </div>
                  <div className="shipping-address">
                    <h5>Shipping Address</h5>
                    <p className="shipping-name">{`${order.user && order.user.first_name} ${order.user && order.user.last_name}`}</p>
                    <p className="shipping-residence">{order.shippingAddress && order.shippingAddress.apartment}</p>
                    <p className="shipping-city">{order.shippingAddress && order.shippingAddress.city}</p>
                    <p className="shipping-country">{order.shippingAddress && order.shippingAddress.country}</p>
                    <p className="shipping-contact">{order.shippingAddress && order.shippingAddress.phone}</p>
                  </div>
                  <div className="billing-address">
                    <h5>Billing address</h5>
                    <p>Same as shipping address</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  );
};

export default Order;