import { useEffect, useState } from 'react';
import '../../styles/products.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

// COMPONENTS
import Sidebar from '../../components/Sidebar';
import ModalDelete from '../../components/ModalDelete';
import ProtectedLayout from '../../components/ProtectedLayout';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [finalProductData, setFinalProductData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productId, setProductId] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/products`)
      .then(res => {
        setFinalProductData(res.data);
        setProducts(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFinalProductData(products);
    }
  }, [searchTerm, products]);

  //? Pass Modal state and ID to the 'ModalDelete' component
  const openModal = (productId) => {
    setShowModal(true);
    setProductId(productId);
  };

  const deleteProduct = () => {
    //? Delete item from DB
    axios.delete(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/products/${productId}`)
      .then(() => {
        //? Filter out deleted product to show accordingly in DOM
        const newData = finalProductData.filter(product => product.product_id !== productId);
        setFinalProductData(newData);
        // After delete, close modal
        setShowModal(false);
      })
      .catch(error => console.log(error.message));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    const regex = new RegExp(`${searchTerm}`, "i");
    const newData = products.filter(product => regex.test(product.product_title));
    setFinalProductData(newData);
  };

  return (
    <ProtectedLayout>
      <div className="dashboard-grid">

        {/* DELETE MODAL */}
        <ModalDelete showModal={showModal} setShowModal={setShowModal} deleteItem={deleteProduct} />
        {/* SIDEBAR */}
        <Sidebar activePage={"products"} />

        <div className="dashboard-container">
          <div className="divider"></div>
          <section className="dashboard-main">
            <div className="area-header">
              <h3>Products</h3>
              <Link to={"/dashboard/products/new"}>add product</Link>
            </div>
            <div className="area-filters">
              <input
                type="search"
                name="search-product"
                id="search-product"
                placeholder="search product by name"
                minLength="4"
                maxLength="30"
                onChange={handleSearch}
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
                    <th>Product</th>
                    <th>Status</th>
                    <th>Type</th>
                    <th>Inventory</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {finalProductData && finalProductData.map((eachProduct, index) => (
                    <tr key={index}>
                      <td ><Link style={{ color: "#578edb", borderColor: "#578edb" }} to={`/dashboard/products/${eachProduct.product_id}/edit`}>{eachProduct.product_title}</Link></td>
                      <td>{eachProduct.published ? "active" : "inactive"}</td>
                      <td>{eachProduct.product_types}</td>
                      <td>5 units in stock</td>
                      <td><img onClick={() => openModal(eachProduct.product_id)} style={{ height: "20px", marginTop: "3px", cursor: "pointer" }} src="/images/icons/trash-icon-red.svg" alt="Trash Icons" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </ProtectedLayout>
  );
};

export default Products;