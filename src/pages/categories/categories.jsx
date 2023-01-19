import '../../styles/categoryList.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// COMPONENTS
import ProtectedLayout from '../../components/ProtectedLayout';
import Sidebar from '../../components/Sidebar';
import ModalDelete from '../../components/ModalDelete';

const Categories = () => {
  const [categories, setCategories] = useState(null);
  const [finalCategoryData, setFinalCategoryData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch(err => console.log(err.message));
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFinalCategoryData(categories);
    }
  }, [searchTerm, categories]);

  //? Pass Modal state and ID to the 'ModalDelete' component
  const openModal = (categoryId) => {
    setShowModal(true);
    setCategoryId(categoryId);
  };

  const deleteCategory = () => {
    //? Delete item from DB
    axios.delete(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/categories/${categoryId}`)
      .then(() => {
        //? Filter out deleted category to show accordingly in DOM
        const newData = finalCategoryData.filter(category => category.id !== categoryId);
        setFinalCategoryData(newData);
        // After delete, close modal
        setShowModal(false);
      })
      .catch(error => console.log(error.message));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    const regex = new RegExp(`${searchTerm}`, "i");
    const newData = categories.filter(category => regex.test(category.name));
    setFinalCategoryData(newData);
  };

  return (
    <ProtectedLayout>
      <div className="dashboard-grid">

        {/* SIDEBAR */}
        <Sidebar activePage={"products"} />

        {/* DELETE MODAL */}
        <ModalDelete showModal={showModal} setShowModal={setShowModal} deleteItem={deleteCategory} />

        <div className="dashboard-container">
          <div className="divider"></div>
          <section className="dashboard-main">
            <div className="area-header">
              <h3>Categories</h3>
              <Link to={"/dashboard/categories/new"}>add category</Link>
            </div>
            <div className="area-filters">
              <input
                type="search"
                name="search-product"
                id="search-product"
                placeholder="search by category name"
                minLength={"4"}
                maxLength={"30"}
                onChange={handleSearch}
              />
              <div className="filter-sort">
                <button className="filter">filter</button>
                <button className="sort">sort</button>
              </div>
            </div>
            {finalCategoryData !== null && (
              <div className="area-table">
                <table>
                  <thead>
                    <tr>
                      <th>category name</th>
                      <th>remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {finalCategoryData.map((category, index) => (
                      <tr key={index}>
                        <td><Link to={`/dashboard/categories/${category.id}/edit`}>{category.name}</Link></td>
                        <td>
                          <img
                            src="/images/icons/trash-icon-red.svg"
                            alt="Delete icon"
                            onClick={() => openModal(category.id)}
                          />
                        </td>
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

export default Categories;