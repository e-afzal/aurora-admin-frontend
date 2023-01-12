import '../../styles/categoryEdit.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

// COMPONENTS
import ProtectedLayout from '../../components/ProtectedLayout';
import Sidebar from '../../components/Sidebar';
import Cloudinary from '../../components/Cloudinary';

const CategoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/categories/${id}`)
      .then(res => {
        setOriginalData(res.data);
        setCategory(res.data);
      })
      .catch(err => console.log(err.message));
  }, [id]);

  const handleName = (e) => {
    setCategory(prevState => {
      return {
        ...prevState,
        name: e.target.value
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
      if (error) {
        console.log(error);
      }
      if (!error && result && result.event === "success") {
        setCategory(prevState => {
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

  const handleDeleteImage = (public_id) => {
    axios.delete(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/categories/delete-image/${public_id}`)
      .then((res) => {
        setCategory(prevState => {
          return {
            ...prevState,
            image: {
              values: category.image.values.filter(each => each.public_id !== public_id)
            }
          };
        });
      })
      .catch(error => console.log(error.message));
  };

  const handleSave = () => {
    axios.put(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/categories/${id}`, category)
      .then((res) => {
        if (res.data.status === "success") {
          //? Should show toast with 'res.data.message' of 'success'
          navigate("/dashboard/categories");
          // toast.success(res.data.message, {
          //   position: toast.POSITION.BOTTOM_CENTER,
          //   autoClose: 3500,
          //   hideProgressBar: true,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "dark",
          // });
          //? Then navigate to below in 2.5 seconds
        }
      })
      .catch((error) => console.log(error.message));
  };

  if (originalData === null) {
    return (
      <h1>LOADING..</h1>
    );
  }

  if (originalData !== null) {
    return (
      <ProtectedLayout>
        <div className="dashboard-grid">
          {/* SIDEBAR */}
          <Sidebar />

          <div className="dashboard-container">
            {/* TOAST */}
            <ToastContainer />

            <div className="divider"></div>
            <section className="dashboard-main">
              <div className="area-header">
                <div className="arrow-title">
                  <Link to={"/dashboard/categories"} style={{ backgroundColor: "transparent", padding: "0px", alignItems: "flex-start" }}>
                    <img
                      src="/images/icons/chevron-right-outline-white.svg"
                      alt="Return Back Icon"
                    />
                  </Link>
                  <h3>{originalData.name}</h3>
                </div>
                <button onClick={handleSave}>save</button>
              </div>

              <div className="area-grid">
                <section className="category-content">
                  <h4>category content</h4>
                  <div className="form-wrapper">
                    <div className="form-control">
                      <label htmlFor="product-title">category name</label>
                      <input
                        type="text"
                        // name="product-title"
                        id="product-title"
                        required
                        value={category.name}
                        onChange={handleName}
                      />
                    </div>
                    <div className="form-control">
                      <label htmlFor="image-upload">upload category image [Select <span style={{ textDecoration: "underline" }}>one</span> image only]</label>
                      <Cloudinary
                        handleOpenWidget={handleOpenWidget}
                        images={category.image}
                        handleDeleteImage={handleDeleteImage}
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
  }
};

export default CategoryEdit;