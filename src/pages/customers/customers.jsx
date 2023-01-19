import { useEffect, useState } from 'react';
import '../../styles/customers.css';
import { Link } from "react-router-dom";
import axios from 'axios';

// COMPONENTS
import Sidebar from '../../components/Sidebar';
import ProtectedLayout from '../../components/ProtectedLayout';

const Customers = () => {
  const [users, setUsers] = useState(null);
  const [finalUsers, setFinalUsers] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/users`)
      .then(res => {
        setUsers(res.data.data);
      })
      .catch(error => console.log(console.log(error)));
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFinalUsers(users);
    }
  }, [searchTerm, users]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    const regex = new RegExp(`${searchTerm}`, "i");
    const newData = users.filter(user => regex.test(user.last_name));
    setFinalUsers(newData);
  };

  return (
    <ProtectedLayout>
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
                placeholder="search by last name"
                minLength="4"
                maxLength="30"
                onChange={handleSearch}
              />
              <div className="filter-sort">
                <button className="filter">filter</button>
                <button className="sort">sort</button>
              </div>
            </div>

            {finalUsers !== null && (
              <div className="area-table">
                <table>
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>Location</th>
                      <th>Orders</th>
                      {/* <th>Total Spend</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {finalUsers.map((eachUser, index) => (
                      <tr key={index}>
                        <td><Link to={`/dashboard/customers/${eachUser.id}`}>{`${eachUser.first_name} ${eachUser.last_name}`}</Link></td>
                        <td>{`${eachUser.addresses.city}, ${eachUser.addresses.country}` || "N/A"}</td>
                        <td>{eachUser.orders.length} {eachUser.orders.length === 1 ? "order" : "orders"}</td>
                        {/* <td>AED {eachUser.orderTotal.toFixed(2)}</td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </section>
        </div>
      </div>
    </ProtectedLayout>
  );
};

export default Customers;