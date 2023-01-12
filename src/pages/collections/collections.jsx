import '../../styles/dashCollections.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

// COMPONENTS
import Sidebar from '../../components/Sidebar';
import ModalDelete from '../../components/ModalDelete';
import ProtectedLayout from '../../components/ProtectedLayout';

const Collections = () => {
  const [collections, setCollections] = useState(null);
  const [finalCollectionData, setFinalCollectionData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [collectionId, setCollectionId] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/collections`)
      .then((res) => {
        setFinalCollectionData(res.data);
        setCollections(res.data);
      })
      .catch((error) => console.log(error.message));
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFinalCollectionData(collections);
    }
  }, [searchTerm, collections]);

  //? Pass Modal state and ID to the 'ModalDelete' component
  const openModal = (collectionId) => {
    setShowModal(true);
    setCollectionId(collectionId);
  };

  const deleteCollection = () => {
    //? Delete item from DB
    axios.delete(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/collections/${collectionId}`)
      .then(() => {
        //? Filter out deleted product to show accordingly in DOM
        const newData = finalCollectionData.filter(collection => collection.id !== collectionId);
        setFinalCollectionData(newData);
        // After delete, close modal
        setShowModal(false);
      })
      .catch(error => console.log(error.message));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    const regex = new RegExp(`${searchTerm}`, "i");
    const newData = collections.filter(collection => regex.test(collection.name));
    setFinalCollectionData(newData);
    if (!searchTerm) return;
  };

  if (finalCollectionData === null) {
    return (
      <h1>Loading..</h1>
    );
  }

  if (finalCollectionData !== null) {
    return (
      <ProtectedLayout>
        <div className="dashboard-grid">

          {/* DELETE MODAL */}
          <ModalDelete showModal={showModal} setShowModal={setShowModal} deleteItem={deleteCollection} />
          {/* SIDEBAR */}
          <Sidebar activePage={"products"} />

          <div className="dashboard-container">
            <div className="divider"></div>
            <section id="collections-dashboard-main">
              <div className="area-header">
                <h3>Collections</h3>
                <Link to="/dashboard/collections/new">add collection</Link>
              </div>
              <div className="area-filters">
                <input
                  type="search"
                  name="search-product"
                  id="search-product"
                  placeholder="search collection by name"
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
                      <th>Collection name</th>
                      <th>Products in Collection</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {finalCollectionData && finalCollectionData.map((eachCollection, index) => (
                      <tr key={index}>
                        <td><Link style={{ color: "#578edb", borderColor: "#578edb" }} to={`/dashboard/collections/${eachCollection.id}/edit`}>{eachCollection.name}</Link></td>
                        <td>{eachCollection.products.length} products</td>
                        <td><img onClick={() => openModal(eachCollection.id)} style={{ height: "20px", marginTop: "3px", cursor: "pointer" }} src="/images/icons/trash-icon-red.svg" alt="Trash Icons" /></td>
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

export default Collections;