import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../../styles/collectionEdit.css';

// COMPONENTS
import Sidebar from '../../components/Sidebar';
import Cloudinary from '../../components/Cloudinary';
import ProtectedLayout from '../../components/ProtectedLayout';

const AddCollection = () => {
  const navigate = useNavigate();
  const [collection, setCollection] = useState({
    description: "",
    image: { values: [] },
    name: "",
    status: ""
  });

  // HANDLERS
  const handleChange = (e) => {
    setCollection(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      };
    });
  };

  const handleSelect = (e) => {
    setCollection(prevState => {
      return {
        ...prevState,
        status: e.target.value
      };
    });
  };

  // Cloudinary upload widget
  const handleOpenWidget = () => {
    let myWidget = window.cloudinary.createUploadWidget({
      cloudName: "ddeima5fc",
      uploadPreset: "xf4uvx7a",
      sources: ["local", "url", "google_drive", "dropbox", "instagram"],
      // folder: "/testing",
      user_filename: true
    }, (error, result) => {
      // Show toast if there is error
      // if (error) { 
      //   console.log(error);
      // }
      if (!error && result && result.event === "success") {
        setCollection(prevState => {
          return {
            ...prevState,
            image: { values: [{ url: result.info.secure_url, public_id: result.info.public_id }] }
          };
        });
      }
    });
    myWidget.open();
  };

  const handleDeleteImage = (public_id) => {
    axios.delete(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/collections/delete-image/${public_id}`)
      .then((res) => {
        setCollection(prevState => {
          return {
            ...prevState,
            image: { values: collection.image.values.filter(each => each.public_id !== public_id) }
          };
        });
      })
      .catch(error => console.log(error.message));
  };

  const saveCollection = () => {
    //! 'products' is not being posted since it is RELATIONAL and is being fetched accordingly by the backend
    axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/collections`, {
      name: collection.name,
      description: collection.description,
      status: collection.status,
      image: collection.image
    })
      .then((res) => {
        navigate("/dashboard/collections");
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="dashboard-grid">

      {/* SIDEBAR */}
      <Sidebar activePage={"products"} />

      <div className="collectionsEdit-dashboard-container">
        <div className="divider"></div>
        <section className="dashboard-main">
          <div className="area-header">
            <div className="arrow-title">
              <img
                src="/images/icons/chevron-right-outline-white.svg"
                alt="Return Back Icon"
                onClick={() => navigate("/dashboard/collections")}
              />
              <h3>Add new collection</h3>
            </div>
            <button onClick={saveCollection} style={{ width: "max-content" }}>save collection</button>
          </div>

          <div className="area-grid">
            <section className="collection-content">
              <h4>Collection content</h4>
              <div className="form-wrapper">
                <div className="form-control">
                  <label htmlFor="collection-title">Collection title</label>
                  <input
                    type="text"
                    name="name"
                    id="collection-title"
                    value={collection.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="collection-description"
                  >Collection description</label
                  >
                  <textarea
                    name="description"
                    id="collection-description"
                    value={collection.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </section>

            <div className="right-options">

              <section className="collection-status">
                <h4 htmlFor="collection-status">collection status</h4>
                <div className="form-wrapper">
                  <select name=''>
                    <option disabled>Select Collection Status</option>
                    <option value="active" onClick={handleSelect} selected={collection.status === "active"}>Active</option>
                    <option value="inactive" onClick={handleSelect} selected={collection.status === "inactive"}>Inactive</option>
                  </select>
                </div>
              </section>

              <section className="collection-image">
                <h4>collection image</h4>
                <div className="form-wrapper">
                  <label style={{ color: "#a6a6a6" }}>Upload collection image [Select <span style={{ textDecoration: "underline" }}>ONE</span> image only]</label>
                  <div style={{ marginTop: "1rem" }}>
                    <Cloudinary
                      handleOpenWidget={handleOpenWidget}
                      images={collection.image}
                      handleDeleteImage={handleDeleteImage}
                    />
                  </div>
                </div>
              </section>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
};

export default AddCollection;