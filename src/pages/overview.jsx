import { useState, useEffect } from 'react';
import '../styles/dashboard.css';
import { Link } from 'react-router-dom';

// COMPONENT
import Sidebar from '../components/Sidebar';
import ProtectedLayout from '../components/ProtectedLayout';

const Overview = () => {
  const [hour, setHour] = useState(new Date().getHours());
  const [icon, setIcon] = useState(String.fromCodePoint(127774));
  const [greeting, setGreeting] = useState("Day Haifa!");
  const [daytime, setDaytime] = useState("today");

  useEffect(() => {
    //! All codes are in HEX format - for more refer 'Emoji reference w3school'
    let emoji;
    if (hour >= 6 && hour < 12) {
      emoji = String.fromCodePoint(127774);
      setIcon(emoji);
      setGreeting("Morning Haifa!");
      return;
    }
    if (hour >= 12 && hour < 17) {
      emoji = String.fromCodePoint(127774);
      setIcon(emoji);
      setGreeting("Afternoon Haifa!");
      return;
    };
    if (hour >= 17 && hour < 22) {
      emoji = String.fromCodePoint(127750);
      setIcon(emoji);
      setGreeting("Evening Haifa!");
      return;
    };
    if (hour >= 22 && hour < 6) {
      emoji = String.fromCodePoint(127769);
      setIcon(emoji);
      setGreeting("Night Haifa!");
      setDaytime("tonight");
      return;
    };
  }, [hour]);

  return (
    <ProtectedLayout>
      <div className="dashboard-grid">

        {/* SIDEBAR */}
        <Sidebar activePage={"dashboard"} />

        <div className="dashboard-container">
          <div className="divider"></div>
          <section className="dashboard-main">
            <h2>
              Good <span className="daytime">{greeting}</span> {icon}
            </h2>
            <p className="agenda">What’s on the agenda for {daytime}?</p>

            <div className="dashboard-cards-grid">
              <div className="dashboard-card">
                <h4 className="card-title">Products</h4>
                <ul>
                  <li><Link to="/dashboard/main-collections">view main collections</Link></li>
                  <li><Link to="/dashboard/collections">view sub collections</Link></li>
                  <li><Link to="/dashboard/categories">view categories list</Link></li>
                  <li><Link to="/dashboard/products">view products list</Link></li>
                </ul>
                <img
                  src="/images/icons/products-icon-dark.svg"
                  alt="Faded Product Icon"
                />
              </div>
              {/* <div className="dashboard-card">
                <h4 className="card-title">Refunds & Exchanges</h4>
                <ul>
                  <li><Link to="/dashboard/refunds">View R&E List</Link></li>
                </ul>
                <img
                  src="/images/icons/exchange-icon.svg"
                  alt="Faded Product Icon"
                />
              </div> */}
              <div className="dashboard-card">
                <h4 className="card-title">Orders</h4>
                <ul>
                  <li><Link to="/dashboard/orders">view orders list</Link></li>
                </ul>
                <img
                  src="/images/icons/orders-icon-dark.svg"
                  alt="Faded Order Icon"
                />
              </div>
              <div className="dashboard-card">
                <h4 className="card-title">Customers</h4>
                <ul>
                  <li><Link to="/dashboard/customers">view customers list</Link></li>
                </ul>
                <img
                  src="/images/icons/customers-icon-dark.svg"
                  alt="Faded Customer Icon"
                />
              </div>
              <div className="dashboard-card">
                <h4 className="card-title">
                  Terms & <br />
                  Conditions
                </h4>
                <ul>
                  <li><Link to="/dashboard/conditions">view and edit T&C</Link></li>
                </ul>
                <img
                  src="/images/icons/conditions-icon-dark.svg"
                  alt="Faded Document Icon"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </ProtectedLayout>
  );
};

export default Overview;