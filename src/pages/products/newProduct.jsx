import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/product.css';

// COMPONENTS
import Sidebar from '../../components/Sidebar';
import Cloudinary from '../../components/Cloudinary';

const NewProduct = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const [product, setProduct] = useState({
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
    // Get collections to populate collection 'select' options
    axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/collections`)
      .then(res => {
        const modifiedCollection = res.data.map(eachCollection => {
          return {
            id: eachCollection.id,
            name: eachCollection.name
          };
        });
        setCollections(modifiedCollection);
      })
      .catch(error => console.log(error.message));
  }, []);

  // Boilerplate
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
    { name: "sizes", value: "bangle", title: "Bangle", sizes: ["15cm", "15.5cm", "16cm", "16.5cm", "17cm", "18cm"] },
    { name: "sizes", value: "bracelet", title: "Bracelet", sizes: ["13.4cm", "14.6cm", "15.9cm", "17.2cm", "18.4cm"] },
    { name: "sizes", value: "necklace", title: "Necklace", sizes: ["38cm", "40cm", "42cm", "45cm", "50cm", "53cm", "60cm", "70cm"] },
    { name: "sizes", value: "ring", title: "Ring", sizes: ["3cm", "3.5cm", "4cm", "4.5cm", "5cm", "5.5cm", "6cm", "6.5cm", "7cm", "7.5cm", "8cm", "8.5cm", "9cm", "9.5cm", "10cm", "10.5cm", "11cm", "11.5cm", "12cm", "12.5cm", "13cm"] },
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
      // Show toast if there is error
      // if (error) { 
      //   console.log(error);
      // }
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
    axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/products/`, product)
      .then((res) => {
        if (res.data.status === "success") {
          //? Should show toast with 'res.data.message' of 'success'
          //? Then navigate to below in 2.5 seconds
          navigate("/dashboard/products");
        }
      })
      .catch((error) => console.log(error.message));
  };

  return (
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
              <h3>Add product</h3>
            </div>
            <button onClick={handleSave}>save</button>
          </div>

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
                  <input type="number" name="product_price" id="product-price" placeholder="E.g. 2500" value={product.product_price} onChange={(e) => handleChange(e)} />
                </div>
                <div className="form-control">
                  <label htmlFor="product-description">description</label>
                  <textarea
                    style={{ resize: "vertical" }}
                    name="product_description"
                    id="product-description"
                    onChange={handleDescription}
                  ></textarea>
                  <div className="form-control">
                    <label>Image upload</label>
                    <Cloudinary handleOpenWidget={handleOpenWidget} images={product.product_images} />
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
                    <option selected disabled>Select Product Status</option>
                    <option value={true} onClick={handleSelect}>Active</option>
                    <option value={false} onClick={handleSelect}>Inactive</option>
                  </select>
                </div>
              </section>
              <section className="product-organization">
                <h4>Product Organization</h4>
                <div className="form-wrapper">
                  <div className="form-control">
                    <label htmlFor="product-type">Type</label>
                    <select name="product_types">
                      <option selected disabled>Select Product Type</option>
                      <option onClick={handleSelect} value="anklets">Anklets</option>
                      <option onClick={handleSelect} value="bangles">Bangles</option>
                      <option onClick={handleSelect} value="bracelets">Bracelets</option>
                      <option onClick={handleSelect} value="chains">Chains</option>
                      <option onClick={handleSelect} value="cuffs">Cuffs</option>
                      <option onClick={handleSelect} value="earrings">Earrings</option>
                      <option onClick={handleSelect} value="necklaces">Necklaces</option>
                      <option onClick={handleSelect} value="rings">Rings</option>
                    </select>
                  </div>
                  <div className="form-control">
                    <label htmlFor="product-type">Tag</label>
                    <select name="product_tags">
                      <option selected disabled>Select Product Tag</option>
                      <option onClick={handleSelect} value="anklet">Anklet</option>
                      <option onClick={handleSelect} value="bangle">Bangle</option>
                      <option onClick={handleSelect} value="bracelet">Bracelet</option>
                      <option onClick={handleSelect} value="chain">Chain</option>
                      <option onClick={handleSelect} value="cuff">Cuff</option>
                      <option onClick={handleSelect} value="earring">Earring</option>
                      <option onClick={handleSelect} value="necklace">Necklace</option>
                      <option onClick={handleSelect} value="ring">Ring</option>
                    </select>
                  </div>
                  <div className="form-control">
                    <label htmlFor="product-collection">Collection</label>
                    <select name="collectionId">
                      <option disabled selected >Select Collection</option>
                      {collections.map((collection, index) => (
                        <option key={index} value={collection.id} onClick={handleSelect}>{collection.name}</option>
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
              </section></div>

            {/* <section className="refunds">
              <h4>Refunds & Exchange</h4>
              <div className="form-wrapper">
                <p>Is this product eligible for refund or exchange?</p>
                <select  >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </section> */}

            <section className="product-options">
              <h4>Product Options</h4>
              <div className="form-wrapper">
                <div className="gold-colors">
                  <h5>Gold colors</h5>
                  <div className="form-control">
                    <input type="checkbox" name="gold_color" id="yellow" value={"yellow gold"} onClick={handleGold} />
                    <label style={{ marginLeft: "3px" }} htmlFor="yellow">Yellow Gold</label>
                  </div>
                  <div className="form-control">
                    <input type="checkbox" name="gold_color" id="rose" value={"rose gold"} onClick={handleGold} />
                    <label style={{ marginLeft: "3px" }} htmlFor="rose">Rose Gold</label>
                  </div>
                  <div className="form-control">
                    <input type="checkbox" name="gold_color" id="white" value={"white gold"} onClick={handleGold} />
                    <label style={{ marginLeft: "3px" }} htmlFor="white">White Gold</label>
                  </div>
                </div>

                <div className="enamels">
                  <h5>Enamel Options</h5>
                  {enamelColors.map((enamelColor, index) => (
                    <div className="form-control" style={{ marginBottom: "1rem" }} key={index}>
                      <input type="checkbox" name={enamelColor.name} id={enamelColor.id} value={enamelColor.value} onClick={handleEnamel} />
                      <label htmlFor={enamelColor.id}>{enamelColor.title}</label>
                    </div>
                  ))}
                </div>

                <div className="sizes">
                  <h5>Sizes</h5>
                  <div className="form-control">
                    <select name="product_size">
                      <option selected disabled>Select a category</option>
                      {sizes.map((eachSize, index) => (
                        <option value={eachSize.value} onClick={handleSize} key={index}>{eachSize.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="hooks">
                  <h5 style={{ fontFamily: "Brandon_Grotesque-Medium,serif", color: "#a6a6a6" }}>Hook type</h5>
                  {hooks.map((each, index) => (
                    <div className="form-control" style={{ marginBottom: "1rem" }} key={index}>
                      <input type="checkbox" name={each.name} id={each.value} value={each.value} onClick={handleHooks} />
                      <label htmlFor={each.value}>{each.title}</label>
                    </div>
                  ))}
                </div>

              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewProduct;