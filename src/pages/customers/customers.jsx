import { useEffect, useState } from 'react';
import '../../styles/customers.css';
import { Link } from "react-router-dom";
import axios from 'axios';

// COMPONENT
import Sidebar from '../../components/Sidebar';

const Customers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/users`)
      .then(res => setUsers(res.data))
      .catch(error => console.log(console.log(error)));
  }, []);



  return (
    <div className="dashboard-grid">

      {/* SIDEBAR */}
      <Sidebar activePage={"customers"} />

      <div className="dashboard-container">
        <div className="divider"></div>
        <section className="dashboard-main">
          <div className="area-header">
            <h3>Customers</h3>
          </div>
          <div className="area-filters">
            <input
              type="search"
              name="search-product"
              id="search-product"
              placeholder="search by name or location"
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
                  <th><input type="checkbox" name="" id="all-cb" /></th>
                  <th>Customer Name</th>
                  <th>Location</th>
                  <th>Orders</th>
                  <th>Total Spend</th>
                </tr>
              </thead>
              <tbody>
                {users && users.map((eachUser, index) => (
                  <tr key={index}>
                    <td><input type="checkbox" /></td>
                    <td><Link to={`/dashboard/customers/${eachUser.id}`}>{eachUser.name}</Link></td>
                    <td>{`${eachUser.primaryAddress.city}, ${eachUser.primaryAddress.country}`}</td>
                    {/* <td>{eachUser.orderCount} {eachUser.orderCount > 1 ? "orders" : "order"}</td> */}
                    {/* <td>AED {eachUser.orderTotal.toFixed(2)}</td> */}
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

export default Customers;