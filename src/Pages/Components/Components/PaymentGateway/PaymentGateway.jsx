import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentGateway = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the registration ID from the URL (passed from SubscriptionForm)
  const queryParams = new URLSearchParams(location.search);
  const regId = queryParams.get('regId');

  const handleProceed = () => {
    // Pass the regId to the Set Password page so we know which user is paying
    navigate(`/set-password?regId=${regId}`);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Secure Payment Gateway</h2>
        <div style={styles.placeholderBox}>
          <p style={styles.text}>Yet to be created</p>
          <span style={styles.subText}>Integration with Stripe/Razorpay Pending</span>
        </div>
        <button onClick={handleProceed} style={styles.button}>
          Simulate Successful Payment & Proceed
        </button>
      </div>
    </div>
  );
};

// Simple inline styles for a quick professional look
const styles = {
  wrapper: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f2f5' },
  card: { padding: '40px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', textAlign: 'center', width: '400px' },
  title: { color: '#1a73e8', marginBottom: '20px' },
  placeholderBox: { padding: '30px', border: '2px dashed #ccc', borderRadius: '8px', marginBottom: '25px', backgroundColor: '#fafafa' },
  text: { fontSize: '20px', fontWeight: 'bold', color: '#555', margin: 0 },
  subText: { fontSize: '12px', color: '#888' },
  button: { width: '100%', padding: '12px', backgroundColor: '#1a73e8', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }
};

export default PaymentGateway;