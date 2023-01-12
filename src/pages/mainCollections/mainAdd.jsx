import '../../styles/collectionMainNew.css';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

// COMPONENTS
import ProtectedLayout from "../../components/ProtectedLayout";
import Sidebar from "../../components/Sidebar";
import Cloudinary from '../../components/Cloudinary';

const MainAdd = () => {
  const navigate = useNavigate();
  const [mainCollection, setMainCollection] = useState({
    name: "",
    status: "inactive",
    description: "",
    image: { "values": [] }
  });

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
        setMainCollection(prevState => {
          return {
            ...prevState,
            image: {
              values: [
                {
                  url: result.info.secure_url,
                  public_id: result.info.public_id
                }
              ]
            }
          };
        });
      }
    });
    myWidget.open();
  };

  const handleSave = () => {
    axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/main-collections`, mainCollection)
      .then((res) => {
        if (res.data.status === "success") {
          //? Should show toast with 'res.data.message' of 'success'
          //? Then navigate to below in 2.5 seconds
          navigate("/dashboard/main-collections");
        }
      })
      .catch((error) => console.log(error.message));
  };

  const handleChange = (e) => {
    setMainCollection(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      };
    });
  };

  const handleSelect = (e) => {
    const value = e.target.value;
    setMainCollection(prevState => {
      return {
        ...prevState,
        status: value
      };
    });
  };

  return (
    <ProtectedLayout>
      <div className="dashboard-grid">

        {/* SIDEBAR */}
        <Sidebar />

        <div className="dashboard-container">
          <div className="divider"></div>
          <section className="dashboard-main">
            <div className="area-header">
              <div className="arrow-title">
                <Link to={"/dashboard/main-collections"} style={{ backgroundColor: "transparent", padding: "0px", alignItems: "flex-start" }}>
                  <img
                    src="/images/icons/chevron-right-outline-white.svg"
                    alt="Return Back Icon"
                  />
                </Link>
                <h3>Add Main Collection</h3>
              </div>
              <button onClick={handleSave}>save</button>
            </div>

            <div className="area-grid">
              <section className="category-content">
                <h4>collection content</h4>
                <div className="form-wrapper">
                  <div className="form-control">
                    <label htmlFor="product-title">collection name</label>
                    <input
                      type="text"
                      name="name"
                      id="product-title"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-control">
                    <label htmlFor="product-description"
                    >collection description</label
                    >
                    <textarea
                      name="description"
                      id="product-description"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="form-control">
                    <label htmlFor="collection-status">collection status</label>
                    <select name="status" id="collection-status">
                      <option disabled selected>Select status</option>
                      <option value={"active"} onClick={handleSelect}>active</option>
                      <option value={"inactive"} onClick={handleSelect}>inactive</option>
                    </select>
                  </div>
                  <div className="form-control">
                    <label htmlFor="image-upload"
                    >upload collection image [select <span style={{ textDecoration: "underline" }}>one</span> image only]</label
                    >
                    <Cloudinary
                      handleOpenWidget={handleOpenWidget}
                      images={mainCollection.image}
                    />
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>
    </ProtectedLayout>
  );
};

export default MainAdd;