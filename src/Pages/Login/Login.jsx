import { useSignIn } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [needsOtp, setNeedsOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);

    try {
      //password login
      if (!needsOtp) {
        const result = await signIn.create({
          identifier: email,
          password,
        });

        if (result.status === "complete") {
          await setActive({ session: result.createdSessionId });
          navigate("/", { replace: true });
        }

        if (result.status === "needs_second_factor") {
          setNeedsOtp(true);
        }
      } 
      
      else {
        const secondFactorAttempt = await signIn.attemptSecondFactor({
          code: otp,
        });

        if (secondFactorAttempt.status === "complete") {
          await setActive({
            session: secondFactorAttempt.createdSessionId,
          });
          navigate("/", { replace: true });
        }
      }

    } catch (err) {
      alert(err.errors?.[0]?.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Sign In</h2>

        <form onSubmit={handleSignIn}>

          {!needsOtp && (
            <>
              <input
                type="email"
                placeholder="Email or Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="login-input"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="login-input"
              />
            </>
          )}

          {needsOtp && (
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="login-input"
            />
          )}

          <div className="login-links-row">
            {!needsOtp && (
              <>
                <Link to="/reset-password" className="forgot-link">
                  Forgot Password?
                </Link>

                <Link to="/register" className="register-link">
                  Don't have an account?
                </Link>
              </>
            )}
          </div>

          <button className="login-button" type="submit" disabled={loading}>
            {loading
              ? "Processing..."
              : needsOtp
              ? "Verify OTP"
              : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
