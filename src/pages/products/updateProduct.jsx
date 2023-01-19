import '../../styles/product.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// COMPONENTS
import Sidebar from '../../components/Sidebar';
import Cloudinary from '../../components/Cloudinary';
import ProtectedLayout from '../../components/ProtectedLayout';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [collections, setCollections] = useState(null);
  const [defaultCollection, setDefaultCollection] = useState("");
  const [originalData, setOriginalData] = useState(null);
  const [product, setProduct] = useState({
    product_id: 0,
    product_title: "",
    product_price: 0,
    product_description: "",
    product_types: "",
    product_tags: "",
    published: false,
    product_size: { values: [] },
    gold_color: { values: [] },
    enamel_colors: { values: [] },
    hook_options: { values: [] },
    product_images: { values: [] },
    collectionId: null
  });

  useEffect(() => {
    // Get Product Data by ID
    axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setOriginalData(res.data);
      })
      .catch(error => console.log(error));
  }, [id]);

  useEffect(() => {
    // Get collections to populate collection 'select' options
    axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/collections/select/${id}`)
      .then(res => {
        setCollections(res.data.collections);
        setDefaultCollection(res.data.collectionId);
      })
      .catch(error => console.log(error.message));
  }, [id]);

  // Boilerplate
  const types = [
    { value: "anklets", title: "Anklets" },
    { value: "bangles", title: "Bangles" },
    { value: "bracelets", title: "Bracelets" },
    { value: "cuffs", title: "Cuffs" },
    { value: "earrings", title: "Earrings" },
    { value: "necklaces", title: "Necklaces" },
    { value: "rings", title: "Rings" },
  ];

  const enamelColors = [
    { name: "enamel_color", id: "red", value: "red", title: "Red" },
    { name: "enamel_color", id: "orange", value: "orange", title: "Orange" },
    { name: "enamel_color", id: "yellow", value: "yellow", title: "Yellow" },
    { name: "enamel_color", id: "mustard_yellow", value: "mustard yellow", title: "Mustard yellow" },
    { name: "enamel_color", id: "turquoise", value: "turquoise", title: "Turquoise" },
    { name: "enamel_color", id: "blue", value: "blue", title: "Blue" },
    { name: "enamel_color", id: "purple", value: "purple", title: "Purple" },
    { name: "enamel_color", id: "bright_pink", value: "bright pink", title: "Bright pink" },
    { name: "enamel_color", id: "baby_pink", value: "baby pink", title: "Baby pink" },
    { name: "enamel_color", id: "brown", value: "brown", title: "Brown" },
    { name: "enamel_color", id: "grey", value: "grey", title: "Grey" },
    { name: "enamel_color", id: "white", value: "white", title: "White" },
    { name: "enamel_color", id: "black", value: "black", title: "Black" },
    { name: "enamel_color", id: "lilac", value: "lilac", title: "Lilac" },
  ];

  const sizes = [
    { name: "sizes", value: "bangles", title: "Bangles", sizes: ["15cm", "15.5cm", "16cm", "16.5cm", "17cm", "18cm"] },
    { name: "sizes", value: "bracelets", title: "Bracelets", sizes: ["13.4cm", "14.6cm", "15.9cm", "17.2cm", "18.4cm"] },
    { name: "sizes", value: "necklaces", title: "Necklaces", sizes: ["38cm", "40cm", "42cm", "45cm", "50cm", "53cm", "60cm", "70cm"] },
    { name: "sizes", value: "rings", title: "Rings", sizes: ["3cm", "3.5cm", "4cm", "4.5cm", "5cm", "5.5cm", "6cm", "6.5cm", "7cm", "7.5cm", "8cm", "8.5cm", "9cm", "9.5cm", "10cm", "10.5cm", "11cm", "11.5cm", "12cm", "12.5cm", "13cm"] },
  ];

  const goldColors = [
    { name: "gold_color", value: "yellow gold", title: "Yellow Gold" },
    { name: "gold_color", value: "rose gold", title: "Rose Gold" },
    { name: "gold_color", value: "white gold", title: "White Gold" },
  ];

  const hooks = [
    { name: "hooks", value: "single hook", title: "Single Hook" },
    { name: "hooks", value: "double hook", title: "Double Hook" },
  ];

  // Cloudinary upload widget
  const handleOpenWidget = () => {
    let myWidget = window.cloudinary.createUploadWidget({
      cloudName: "ddeima5fc",
      uploadPreset: "xf4uvx7a",
      sources: ["local", "url", "google_drive", "dropbox", "instagram"],
      // folder: "/testing",
      user_filename: true
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        setProduct(prevState => {
          return {
            ...prevState,
            product_images: { values: [...prevState.product_images.values, { url: result.info.secure_url, public_id: result.info.public_id }] }
          };
        });
      }
    });
    myWidget.open();
  };

  const handleDeleteImage = (public_id) => {
    axios.delete(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/collections/delete-image/${public_id}`)
      .then((res) => {
        setProduct(prevState => {
          return {
            ...prevState,
            product_images: { values: product.product_images.values.filter(each => each.public_id !== public_id) }
          };
        });
      })
      .catch(error => console.log(error.message));
  };

  // Handle TEXT-BASED changes
  const handleChange = (e) => {
    // Split description by "|" and save to state
    if (e.target.name === "product_description") {
      const descriptionArray = e.target.value.split("|");
      setProduct(prevState => {
        return {
          ...prevState,
          [e.target.name]: descriptionArray
        };
      });
    } else {
      setProduct(prevState => {
        return {
          ...prevState,
          [e.target.name]: e.target.value
        };
      });
    }
  };

  const handleDescription = (e) => {
    const description = e.target.value.split("|").join(" ");
    setProduct(prevState => {
      return {
        ...prevState,
        product_description: description
      };
    });
  };

  // Handle OPTIONS selections
  const handleSelect = (e) => {
    const value = e.target.value;
    const parentName = e.target.parentElement.name;
    if (parentName === "published") {
      setProduct(prevState => {
        return {
          ...prevState,
          [parentName]: value === "true" ? true : false
        };
      });
    } else {
      setProduct(prevState => {
        return {
          ...prevState,
          [parentName]: value
        };
      });
    }
  };

  const handleGold = (e) => {
    if (e.target.checked) {
      setProduct(prevState => {
        return {
          ...prevState,
          gold_color: { values: [...prevState.gold_color.values, e.target.value] }
        };
      });
    }
    // If item 'unchecked', remove item from array
    if (!e.target.checked) {
      const filtered = product.gold_color.values.filter(color => color !== e.target.value);
      setProduct(prevState => {
        return {
          ...prevState,
          gold_color: { values: filtered }
        };
      });
    }
  };

  const handleEnamel = (e) => {
    if (e.target.checked) {
      setProduct(prevState => {
        return {
          ...prevState,
          enamel_colors: { values: [...prevState.enamel_colors.values, e.target.value] }
        };
      });
    }
    // If item 'unchecked', remove item from array
    if (!e.target.checked) {
      const filtered = product.enamel_colors.values.filter(color => color !== e.target.value);
      setProduct(prevState => {
        return {
          ...prevState,
          enamel_colors: { values: filtered }
        };
      });
    }
  };

  const handleSize = (e) => {
    const selectedCategory = sizes.find(size => size.value === e.target.value);
    setProduct(prevState => {
      return {
        ...prevState,
        product_size: { values: selectedCategory.sizes }
      };
    });
  };

  const handleHooks = (e) => {
    if (e.target.checked) {
      setProduct(prevState => {
        return {
          ...prevState,
          hook_options: { values: [...prevState.hook_options.values, e.target.value] }
        };
      });
    }
    // If item 'unchecked', remove item from array
    if (!e.target.checked) {
      const filtered = product.hook_options.values.filter(hookType => hookType !== e.target.value);
      setProduct(prevState => {
        return {
          ...prevState,
          hook_options: { values: filtered }
        };
      });
    }
  };

  const handleSave = () => {
    axios.put(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/products/${id}`, { ...product, product_id: id })
      .then((res) => {
        if (res.data.status === "success") {
          navigate("/dashboard/products");
        }
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <ProtectedLayout>
      <div className="dashboard-grid">

        {/* SIDEBAR */}
        <Sidebar activePage={"products"} />

        <div className="dashboard-container">
          <div className="divider"></div>
          <section className="dashboard-main">
            <div className="area-header">
              <div className="arrow-title">
                <img
                  src="/images/icons/chevron-right-outline-white.svg"
                  alt="Return Back Icon"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/dashboard/products")}
                />
                <h3>Edit product</h3>
              </div>
              <button onClick={handleSave}>update product</button>
            </div>

            {originalData !== null && collections !== null && (
              <div className="area-grid">
                <section className="product-content">
                  <h4>product content</h4>
                  <div className="form-wrapper">
                    <div className="form-control">
                      <label htmlFor="product-title">title</label>
                      <input type="text" name="product_title" id="product-title" value={product.product_title} onChange={(e) => handleChange(e)} />
                    </div>

                    <div className="form-control">
                      <label htmlFor="product-price">price</label>
                      <input
                        type="number"
                        name="product_price"
                        id="product-price"
                        placeholder="E.g. 2500"
                        value={product.product_price}
                        onChange={(e) => handleChange(e)} />
                    </div>

                    <div className="form-control">
                      <label htmlFor="product-description">description</label>
                      <textarea
                        value={product.product_description === "\"\"" ? "" : product.product_description}
                        style={{ resize: "vertical" }}
                        name="product_description"
                        id="product-description"
                        onChange={handleDescription}
                      ></textarea>

                      <div className="form-control">
                        <label>Image upload</label>
                        <Cloudinary
                          handleOpenWidget={handleOpenWidget}
                          images={product.product_images}
                          handleDeleteImage={handleDeleteImage}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <div className="right-options">
                  <section className="product-status">
                    <h4 htmlFor="product-status">product status</h4>
                    <div className="form-wrapper">

                      {/* Product Status select */}
                      <select name="published">
                        <option disabled>Select Product Status</option>
                        <option selected={originalData.published} value={Boolean(true)} onClick={handleSelect}>Active</option>
                        <option selected={originalData.published === false} value={Boolean(false)} onClick={handleSelect}>Inactive</option>
                      </select>
                    </div>
                  </section>

                  <section className="product-organization">
                    <h4>Product Organization</h4>
                    <div className="form-wrapper">
                      <div className="form-control">
                        <label htmlFor="product-type">Type</label>
                        <select name="product_types" defaultValue={originalData.product_types}>
                          <option disabled>Select Product Type</option>
                          {types.map((type, index) => (
                            <option
                              key={index}
                              onClick={handleSelect}
                              value={type.value}
                              selected={type.value === originalData.product_types}>{type.title}</option>
                          ))}
                        </select>
                      </div>

                      {/* <div className="form-control">
                          <label htmlFor="product-type">Tag</label>
                          <select name="product_tags">
                            <option disabled>Select Product Tag</option>
                            {types.map((type, index) => (
                              <option
                                onClick={handleSelect}
                                value={type.value}
                                key={index}
                                selected={type.value === originalData.product_tags}>{type.title}</option>
                            ))}
  
                          </select>
                        </div> */}
                      <div className="form-control">
                        <label htmlFor="product-collection">Collection</label>
                        <select name="collectionId">
                          <option disabled>Select Collection</option>
                          {collections.map((collection, index) => (
                            <option
                              key={index}
                              selected={Number(collection.id) === Number(defaultCollection)}
                              value={collection.id}
                              onClick={handleSelect}>{collection.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </section>
                  <section className="product-inventory">
                    <h4>Inventory</h4>
                    <div className="form-wrapper">
                      <div className="form-control">
                        <label htmlFor="product-inventory">Total units for sale</label>
                        <input type="number" name="product-inventory" id="product-inventory" placeholder="Enter a number" />
                      </div>
                    </div>
                  </section>
                </div>

                <section className="product-options">
                  <h4>Product Options</h4>
                  <div className="form-wrapper">

                    {originalData.gold_color.values && (
                      <div className="gold-colors">
                        <h5>Gold colors</h5>
                        {goldColors.map((color, index) => (
                          <div className="form-control" key={index}>
                            <input
                              type="checkbox"
                              name="gold_color"
                              id={color.value}
                              value={color.value}
                              onChange={handleGold}
                              checked={product.gold_color.values.includes(color.value)} />
                            <label style={{ marginLeft: "3px" }} htmlFor={color.value}>{color.title}</label>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="enamels">
                      <h5>Enamel Options</h5>
                      {enamelColors.map((enamelColor, index) => (
                        <div className="form-control" style={{ marginBottom: "1rem" }} key={index}>
                          <input
                            type="checkbox"
                            name={enamelColor.name}
                            id={enamelColor.id}
                            value={enamelColor.value}
                            onChange={handleEnamel}
                            checked={product.enamel_colors.values ? product.enamel_colors.values.includes(enamelColor.value) : false} />
                          <label htmlFor={enamelColor.id}>{enamelColor.title}</label>
                        </div>
                      ))}
                    </div>

                    <div className="sizes">
                      <h5>Sizes</h5>
                      <div className="form-control" style={{ width: "100%" }}>
                        <select name="product_size">
                          <option selected disabled>Select a category</option>
                          {sizes.map((eachSize, index) => (
                            <option
                              value={eachSize.value}
                              onClick={handleSize}
                              key={index}>
                              {eachSize.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="hooks">
                      <h5 style={{ fontFamily: "Brandon_Grotesque-Medium,serif", color: "#a6a6a6" }}>Hook type</h5>
                      {hooks.map((each, index) => (
                        <div className="form-control" style={{ marginBottom: "1rem" }} key={index}>
                          <input
                            type="checkbox"
                            name={each.name}
                            id={each.value}
                            value={each.value}
                            onChange={handleHooks}
                            checked={product.hook_options.values ? product.hook_options.values.includes(each.value) : false} />
                          <label htmlFor={each.value}>{each.title}</label>
                        </div>
                      ))}
                    </div>

                  </div>
                </section>
              </div>
            )}

          </section >
        </div >
      </div>
    </ProtectedLayout>
  );
};

export default UpdateProduct;