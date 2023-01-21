import '../styles/terms.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

// COMPONENT
import Sidebar from '../components/Sidebar';
import ProtectedLayout from '../components/ProtectedLayout';

const Conditions = () => {
  const navigate = useNavigate();
  const [conditions, setConditions] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/conditions`)
      .then(res => setConditions(res.data))
      .catch(error => console.log(error.message));
  }, []);

  const handleChange = (e) => {
    setConditions({
      ...conditions,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    axios.put(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/conditions`, conditions)
      .then(res => {
        navigate("/dashboard");
      })
      .catch(error => console.log(error.message));
  };

  return (
    <ProtectedLayout>
      <div className="dashboard-grid">

        {/* SIDEBAR */}
        <Sidebar activePage={"conditions"} />

        <div className="dashboard-container">
          <div className="divider"></div>
          <section className="dashboard-main">
            <div className="area-header">
              <div className="arrow-title">
                <Link to={"/dashboard"} style={{ backgroundColor: "transparent", padding: "0px", alignItems: "flex-start" }}>
                  <img
                    src="/images/icons/chevron-right-outline-white.svg"
                    alt="Return Back Icon"
                  />
                </Link>
                <h3>Terms & Conditions</h3>
              </div>
              <button onClick={handleSave}>save conditions</button>
            </div>

            {conditions !== null && (
              <div className="area-grid">
                {/* SECTION:REFUND */}
                <section className="refund">
                  <h4>Refund & Exchange</h4>
                  <div className="form-wrapper">
                    <div className="form-control">
                      <label htmlFor="product-description">content</label>
                      <textarea
                        name="refundAndExchange"
                        id="product-description"
                        value={conditions.refundAndExchange}
                        onChange={handleChange}
                      >{conditions.refundAndExchange}</textarea>
                    </div>
                  </div>
                </section>
                {/* SECTION: SHIPPING */}
                <section className="shipping">
                  <h4>shipping</h4>
                  <div className="form-wrapper">
                    <div className="form-control">
                      <label htmlFor="shipping-description">Content</label>
                      <textarea
                        name="shipping"
                        id="shipping-description"
                        value={conditions.shipping}
                        onChange={handleChange}
                      >{conditions.shipping}</textarea>
                    </div>
                  </div>
                </section>
                {/* SECTION: REPAIRS */}
                <section className="repairs">
                  <h4>Repairs & Defects</h4>
                  <div className="form-wrapper">
                    <div className="form-control">
                      <label htmlFor="repair-description">Content</label>
                      <textarea
                        name="repairsAndDefects"
                        id="repair-description"
                        value={conditions.repairsAndDefects}
                        onChange={handleChange}
                      >{conditions.repairsAndDefects}</textarea>
                    </div>
                  </div>
                </section>
                {/* SECTION: PAYMENTS */}
                <section className="payments">
                  <h4>Payments</h4>
                  <div className="form-wrapper">
                    <div className="form-control">
                      <label htmlFor="payment-description">Content</label>
                      <textarea
                        name="payment"
                        id="payment-description"
                        value={conditions.payment}
                        onChange={handleChange}
                      >{conditions.payment}</textarea>
                    </div>
                  </div>
                </section>
                {/* SECTION: WEBSITE USAGE */}
                <section className="website">
                  <h4>Website Usage</h4>
                  <div className="form-wrapper">
                    <div className="form-control">
                      <label htmlFor="website-description">Content</label>
                      <textarea
                        name="websiteUsage"
                        id="website-description"
                        value={conditions.websiteUsage}
                        onChange={handleChange}
                      >{conditions.websiteUsage}</textarea>
                    </div>
                  </div>
                </section>
                {/* SECTION: SHOPPING @ AURORA JEWELRY */}
                <section className="shopping">
                  <h4>Shopping at Aurora</h4>
                  <div className="form-wrapper">
                    <div className="form-control">
                      <label htmlFor="shopping-description">Content</label>
                      <textarea
                        name="shoppingAtAurora"
                        id="shopping-description"
                        value={conditions.shoppingAtAurora}
                        onChange={handleChange}
                      >{conditions.shoppingAtAurora}</textarea>
                    </div>
                  </div>
                </section>
                {/* SECTION: PRICING POLICY */}
                <section className="pricing">
                  <h4>Pricing Policy</h4>
                  <div className="form-wrapper">
                    <div className="form-control">
                      <label htmlFor="pricing-description">Content</label>
                      <textarea
                        name="pricingPolicy"
                        id="pricing-description"
                        value={conditions.pricingPolicy}
                        onChange={handleChange}
                      >{conditions.pricingPolicy}</textarea>
                    </div>
                  </div>
                </section>
                {/* SECTION: PERSONAL DETAILS */}
                <section className="personal">
                  <h4>Safety of Personal Details</h4>
                  <div className="form-wrapper">
                    <div className="form-control">
                      <label htmlFor="personal-description">Content</label>
                      <textarea
                        name="safetyOfPersonalDetails"
                        id="personal-description"
                        value={conditions.safetyOfPersonalDetails}
                        onChange={handleChange}
                      >{conditions.safetyOfPersonalDetails}</textarea>
                    </div>
                  </div>
                </section>
                {/* SECTION: COPYRIGHT & TM */}
                <section className="copyright">
                  <h4>Copyright & Trademarks</h4>
                  <div className="form-wrapper">
                    <div className="form-control">
                      <label htmlFor="copyright-description">Content</label>
                      <textarea
                        name="copyrightAndTrademarks"
                        id="copyright-description"
                        value={conditions.copyrightAndTrademarks}
                        onChange={handleChange}
                      >{conditions.copyrightAndTrademarks}</textarea>
                    </div>
                  </div>
                </section>
                {/* SECTION: CONTENT */}
                <section className="content">
                  <h4>Content</h4>
                  <div className="form-wrapper">
                    <div className="form-control">
                      <label htmlFor="content-description">Content</label>
                      <textarea
                        name="content"
                        id="content-description"
                        value={conditions.content}
                        onChange={handleChange}
                      >{conditions.content}</textarea>
                    </div>
                  </div>
                </section>
                {/* SECTION: 3rd PARTY LINKS */}
                <section className="party">
                  <h4>Third-Party Links</h4>
                  <div className="form-wrapper">
                    <div className="form-control">
                      <label htmlFor="party-description">Content</label>
                      <textarea
                        name="thirdPartyLinks"
                        id="party-description"
                        value={conditions.thirdPartyLinks}
                        onChange={handleChange}
                      >{conditions.thirdPartyLinks}</textarea>
                    </div>
                  </div>
                </section>
                {/* SECTION: ACCOUNTS AND MEMBERSHIP */}
                <section className="accounts">
                  <h4>Accounts & Membership</h4>
                  <div className="form-wrapper">
                    <div className="form-control">
                      <label htmlFor="accounts-description">Content</label>
                      <textarea
                        name="accountsAndMembership"
                        id="accounts-description"
                        value={conditions.accountsAndMembership}
                        onChange={handleChange}
                      >{conditions.accountsAndMembership}</textarea>
                    </div>
                  </div>
                </section>
                {/* SECTION: PROPERTY AND RISK */}
                <section className="property">
                  <h4>Property & Risk</h4>
                  <div className="form-wrapper">
                    <div className="form-control">
                      <label htmlFor="property-description">Content</label>
                      <textarea
                        name="propertyAndRisk"
                        id="property-description"
                        value={conditions.propertyAndRisk}
                        onChange={handleChange}
                      >{conditions.propertyAndRisk}</textarea>
                    </div>
                  </div>
                </section>
                {/* SECTION: ACCEPTANCE OF TERMS */}
                <section className="acceptance">
                  <h4>Acceptance of Terms</h4>
                  <div className="form-wrapper">
                    <div className="form-control">
                      <label htmlFor="acceptance-description">Content</label>
                      <textarea
                        name="acceptanceOfTerms"
                        id="acceptance-description"
                        value={conditions.acceptanceOfTerms}
                        onChange={handleChange}
                      >{conditions.acceptanceOfTerms}</textarea>
                    </div>
                  </div>
                </section>
                {/* SECTION: BACKUP */}
                <section className="backup">
                  <h4>Backups</h4>
                  <div className="form-wrapper">
                    <div className="form-control">
                      <label htmlFor="backup-description">Content</label>
                      <textarea
                        name="backups"
                        id="backup-description"
                        value={conditions.backups}
                        onChange={handleChange}
                      >{conditions.backups}</textarea>
                    </div>
                  </div>
                </section>
              </div>
            )}


          </section>
        </div>
      </div>
    </ProtectedLayout>
  );
};

export default Conditions;