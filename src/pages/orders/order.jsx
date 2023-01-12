import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/order.css';

// COMPONENT
import Sidebar from '../../components/Sidebar';
import ProtectedLayout from '../../components/ProtectedLayout';

const Order = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({});

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/orders/${id}`)
      .then((res) => {
        setOrder(res.data);
      })
      .catch(error => console.log(error));
  }, [id]);

  // CURRENCY LOCALIZATION Function
  function localize(amount) {
    return Intl.NumberFormat("en-AE", { style: "currency", currency: "AED" }).format(amount);
  }

  if (order === null) {
    return (
      <h1>Loading..</h1>
    );
  }

  if (order !== null && order.status === "success") {
    return (
      <ProtectedLayout>
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
                    Order #{order.data.orderNumber} <span className="payment-tablet">{order.data.payment_status}</span
                    ><span className="fulfillment-tablet">{order.data.fulfillmentStatus}</span>
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
                    <p>{new Date(order.data.createdAt).toLocaleDateString("en-AE", { month: "long", day: "2-digit", year: "numeric" })}</p>
                  </section>

                  <section className="ordered-items">
                    <h4>ordered items</h4>
                    {order.data.cartItems.map((eachItem, index) => (
                      <div key={index} className="item-grid">
                        <div className="item-detail">
                          <Link to={`/dashboard/products/${eachItem.id}/edit`}>{eachItem.productTitle}</Link>
                          <p>{eachItem.size} / {eachItem.color}</p>
                        </div>
                        <p className="item-quantity">{eachItem.price} &#10005; {eachItem.quantity}</p>
                        <p className="item-amount"> {localize((eachItem.price * eachItem.quantity))}</p>
                      </div>
                    ))}
                  </section>

                  <section className="invoice-amount">
                    <h4>invoice amount</h4>
                    <div className="subtotal-grid">
                      <p className="subtotal-title">Subtotal</p>
                      <p className="subtotal-quantity">{order.data.cartItems.length} {order.data.cartItems.length > 1 ? "items" : "item"} </p>
                      <p className="subtotal-amount">{order.data.subtotalAmt.toFixed(2)}</p>
                    </div>
                    <div className="shipping-grid">
                      <p className="shipping-title">Shipping</p>
                      <p className="shipping-option">Standard</p>
                      <p className="shipping-amount">{order.data.shippingAmt || 0}</p>
                    </div>
                    <div className="tax-grid">
                      <p className="tax-title">Tax</p>
                      <p className="tax-percentage">VAT 5%</p>
                      <p className="tax-amount">{order.data.taxAmt.toFixed(2)}</p>
                    </div>
                    <div className="total-grid">
                      <p>Paid by Customer</p>
                      <p className="total-amount"> {localize(order.data.totalAmt)}</p>
                    </div>
                  </section>
                </div>

                <div className="customer-details">
                  <div className="details-card">
                    <h4>Customer details</h4>
                    <div className="customer-name">
                      <h5 className="name">Customer Name</h5>
                      <p>{`${order.data.shipping.shippingAddress.firstName} ${order.data.shipping.shippingAddress.lastName}`}</p>
                    </div>
                    <div className="customer-email">
                      <h5 className="email">Customer Email</h5>
                      <p>{`${order.data.shipping.shippingAddress.email}`}</p>
                    </div>
                    <div className="shipping-address">
                      <h5>Shipping Address</h5>
                      <p className="shipping-name">{`${order.data.shipping.shippingAddress.firstName} ${order.data.shipping.shippingAddress.lastName}`}</p>
                      <p className="shipping-residence">{`${order.data.shipping.shippingAddress.apartment}`}</p>
                      <p className="shipping-city">{`${order.data.shipping.shippingAddress.city}`}</p>
                      <p className="shipping-country">{`${order.data.shipping.shippingAddress.country}`}</p>
                      <p className="shipping-contact">{`${order.data.shipping.shippingAddress.phone}`}</p>
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
      </ProtectedLayout>
    );
  }
};

export default Order;