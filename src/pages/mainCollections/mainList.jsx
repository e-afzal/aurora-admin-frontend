import '../../styles/collectionMainList.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// COMPONENTS
import ProtectedLayout from "../../components/ProtectedLayout";
import Sidebar from "../../components/Sidebar";
import ModalDelete from '../../components/ModalDelete';

const MainList = () => {
  const [mainList, setMainList] = useState(null);
  const [finalMainListData, setFinalMainListData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mainId, setMainId] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/main-collections`)
      .then((res) => {
        setMainList(res.data);
      })
      .catch(error => console.log(error.message));
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFinalMainListData(mainList);
    }
  }, [searchTerm, mainList]);

  //? Pass Modal state and ID to the 'ModalDelete' component
  const openModal = (mainId) => {
    setShowModal(true);
    setMainId(mainId);
  };

  const deleteMainCollection = () => {
    //? Delete item from DB
    axios.delete(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/main-collections/${mainId}`)
      .then(() => {
        //? Filter out deleted category to show accordingly in DOM
        const newData = finalMainListData.filter(mainList => mainList.id !== mainId);
        setFinalMainListData(newData);
        // After delete, close modal
        setShowModal(false);
      })
      .catch(error => console.log(error.message));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    const regex = new RegExp(`${searchTerm}`, "i");
    const newData = mainList.filter(main => regex.test(main.name));
    setFinalMainListData(newData);
  };

  if (finalMainListData === null) {
    return (
      <h1>Loading..</h1>
    );
  }

  if (finalMainListData !== null) {
    return (
      <ProtectedLayout>
        <div className="dashboard-grid">

          {/* SIDEBAR */}
          <Sidebar />

          {/* DELETE MODAL */}
          <ModalDelete
            showModal={showModal}
            setShowModal={setShowModal}
            deleteItem={deleteMainCollection}
          />

          <div className="dashboard-container">
            <div className="divider"></div>
            <section className="dashboard-main">
              <div className="area-header">
                <h3>Main Collections</h3>
                <Link to={"/dashboard/main-collections/new"}>add collection</Link>
              </div>
              <div className="area-filters">
                <input
                  type="search"
                  name="search-product"
                  id="search-product"
                  placeholder="search by collection name"
                  minLength={"4"}
                  maxLength={"30"}
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
                      <th>collection name</th>
                      <th>status</th>
                      <th>remove</th>
                    </tr>
                  </thead>
                  <tbody>

                    {finalMainListData.map((each, index) => (
                      <tr key={index}>
                        <td><Link to={`/dashboard/main-collections/${each.id}/edit`}>{each.name}</Link></td>
                        <td>{each.status}</td>
                        <td>
                          <img
                            src="/images/icons/trash-icon-red.svg"
                            alt="Delete icon"
                            onClick={() => openModal(each.id)}
                          />
                        </td>
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
  }


};

export default MainList;