import React, { useState } from 'react';
import './SubscriptionForm.css';   // ✅ NORMAL CSS IMPORT
import { useNavigate } from 'react-router-dom';
import { useSignUp } from '@clerk/clerk-react';

const SubscriptionForm = () => {
  const BASE_PRICE = 499;
  const GST_PERCENT = 18;
  const SERVICE_CHARGE = 25;
  const COUPON = 50;

  const navigate = useNavigate();
  const { signUp, isLoaded } = useSignUp();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    duration: 1,
    preferences: [],
    password: '',
    confirmPassword: ''
  });

  const subtotal = formData.duration * BASE_PRICE;
  const gst = (subtotal * GST_PERCENT) / 100;
  const total = subtotal + gst + SERVICE_CHARGE - COUPON;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePref = (item) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(item)
        ? prev.preferences.filter(i => i !== item)
        : [...prev.preferences, item]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });


      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      navigate("/verify-email", { state: { formData } });

    } catch (error) {
      console.error("Clerk Error:", error);
      alert(error.errors?.[0]?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pageWrapper">
      <div className="container">
        <div className="header">
          <h2>Subscription Registration</h2>
          <div className="underline"></div>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="inputGrid">

            <div className="field">
              <label>First Name</label>
              <input name="firstName" type="text" placeholder='First Name' value={formData.firstName} onChange={handleChange} required />
            </div>

            <div className="field">
              <label>Last Name</label>
              <input name="lastName" type="text" placeholder='Last Name' value={formData.lastName} onChange={handleChange} required />
            </div>

            <div className="field">
              <label>Email</label>
              <input name="email" type="email" placeholder='Email' value={formData.email} onChange={handleChange} required />
            </div>

            <div className="field">
              <label>Phone Number</label>
              <input name="phone" type="tel" placeholder='Ph number' value={formData.phone} onChange={handleChange} required />
            </div>

            <div className="field fullWidth">
              <label>Address</label>
              <input name="address" type="text" placeholder='Residential Address' value={formData.address} onChange={handleChange} required />
            </div>

            <div className="field">
              <label>Password</label>
              <input name="password" type="password" placeholder='Create your Passoword' value={formData.password} onChange={handleChange} required />
            </div>

            <div className="field">
              <label>Confirm Password</label>
              <input name="confirmPassword" type="password" placeholder='Confirm Your Password' value={formData.confirmPassword} onChange={handleChange} required />
            </div>

          </div>

          <div className="section">
            <label className="sectionLabel">Gender</label>
            <div className="radioGroup">
              {['Male', 'Female', 'Other'].map(g => (
                <label key={g}>
                  <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleChange} /> {g}
                </label>
              ))}
            </div>
          </div>

          <div className="section">
            <label className="sectionLabel">Preferences</label>
            <div className="checkboxGrid">
              {['Sports', 'Entertainment', 'Education', 'Adventure', 'Technology', 'Politics'].map(p => (
                <label key={p}>
                  <input type="checkbox" checked={formData.preferences.includes(p)} onChange={() => handlePref(p)} /> {p}
                </label>
              ))}
            </div>
          </div>

          <div className="priceContainer">
            <div className="priceDetail">
              <span>Subtotal ({formData.duration} Year)</span>
              <span>₹{subtotal}.00</span>
            </div>
            <div className="priceDetail">
              <span>GST ({GST_PERCENT}%)</span>
              <span>+ ₹{gst.toFixed(2)}</span>
            </div>
            <div className="priceDetail">
              <span>Service Charges</span>
              <span>+ ₹{SERVICE_CHARGE}.00</span>
            </div>
            <div className="priceDetail">
              <span>Coupon Discount</span>
              <span className="discount">- ₹{COUPON}.00</span>
            </div>
            <div className="finalRow">
              <span className="totalLabel">Total Payable</span>
              <div className="amazonPrice">
                <span className="currency">₹</span>
                <span className="amount">{total.toFixed(0)}</span>
                <span>.00</span>
              </div>
            </div>
          </div>

          <div className="footerLinks">
            <label>
              <input type="checkbox" required /> I agree to the <a href="#">Terms & Conditions</a>
            </label>
          </div>

          <button type="submit" className="submitBtn" disabled={loading}>
            {loading ? "Processing..." : "Register"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default SubscriptionForm;
