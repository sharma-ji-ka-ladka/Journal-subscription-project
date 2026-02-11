import React, { useState } from 'react';
import styles from './SubscriptionForm.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SubscriptionForm = () => {
  const BASE_PRICE = 499;
  const GST_PERCENT = 18;
  const SERVICE_CHARGE = 25;
  const COUPON = 50;

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', 
    lastName: '', 
    email: '', 
    phone: '',
    address: '', 
    gender: '', 
    duration: 1, 
    preferences: []
  });

  // Dynamic Calculations
  const subtotal = formData.duration * BASE_PRICE;
  const gst = (subtotal * GST_PERCENT) / 100;
  const total = subtotal + gst + SERVICE_CHARGE - COUPON;

  // Handle Input Changes
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
    setLoading(true);

    try {
      // Sending data to Spring Boot Backend
      const response = await axios.post("http://localhost:8080/api/register/pending", formData);
      
      // Get the auto-incremented ID from SQL Server
      const registrationId = response.data.id; 
      
      // Redirect to Payment Gateway with the ID
      navigate(`/payment-gateway?regId=${registrationId}`);
      
    } catch (error) {
      console.error("Backend Error:", error);
      alert("Failed to save. Make sure your Spring Boot app is running and the email is unique!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Subscription Registration</h2>
          <div className={styles.underline}></div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGrid}>
            <div className={styles.field}>
              <label>First Name</label>
              <input 
                name="firstName"
                type="text" 
                placeholder="Enter first name" 
                value={formData.firstName}
                onChange={handleChange}
                required 
              />
            </div>
            <div className={styles.field}>
              <label>Last Name</label>
              <input 
                name="lastName"
                type="text" 
                placeholder="Enter last name" 
                value={formData.lastName}
                onChange={handleChange}
                required 
              />
            </div>
            <div className={styles.field}>
              <label>Email</label>
              <input 
                name="email"
                type="email" 
                placeholder="Enter email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
            <div className={styles.field}>
              <label>Phone Number</label>
              <input 
                name="phone"
                type="tel" 
                placeholder="Enter number" 
                value={formData.phone}
                onChange={handleChange}
                required 
              />
            </div>
            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label>Address</label>
              <input 
                name="address"
                type="text" 
                placeholder="Enter full address" 
                value={formData.address}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <div className={styles.section}>
            <label className={styles.sectionLabel}>Gender</label>
            <div className={styles.radioGroup}>
              {['Male', 'Female', 'Other'].map(g => (
                <label key={g}>
                  <input 
                    type="radio" 
                    name="gender" 
                    value={g} 
                    checked={formData.gender === g}
                    onChange={handleChange}
                  /> {g}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <label className={styles.sectionLabel}>Preferences</label>
            <div className={styles.checkboxGrid}>
              {['Sports', 'Entertainment', 'Education', 'Adventure', 'Technology', 'Politics'].map(p => (
                <label key={p} className={styles.checkLabel}>
                  <input 
                    type="checkbox" 
                    checked={formData.preferences.includes(p)}
                    onChange={() => handlePref(p)} 
                  /> {p}
                </label>
              ))}
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className={styles.priceContainer}>
            <div className={styles.priceDetail}>
              <span>Subtotal ({formData.duration} Year)</span>
              <span>₹{subtotal}.00</span>
            </div>
            <div className={styles.priceDetail}>
              <span>GST ({GST_PERCENT}%)</span>
              <span>+ ₹{gst.toFixed(2)}</span>
            </div>
            <div className={styles.priceDetail}>
              <span>Service Charges</span>
              <span>+ ₹{SERVICE_CHARGE}.00</span>
            </div>
            <div className={styles.priceDetail}>
              <span>Coupon Discount</span>
              <span className={styles.discount}>- ₹{COUPON}.00</span>
            </div>
            <div className={styles.finalRow}>
              <span className={styles.totalLabel}>Total Payable</span>
              <div className={styles.amazonPrice}>
                <span className={styles.currency}>₹</span>
                <span className={styles.amount}>{total.toFixed(0)}</span>
                <span className={styles.decimals}>.00</span>
              </div>
            </div>
          </div>

          <div className={styles.footerLinks}>
            <label>
              <input type="checkbox" required /> I agree to the <a href="#">Terms & Conditions</a>
            </label>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Processing..." : "Register & Pay"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionForm;