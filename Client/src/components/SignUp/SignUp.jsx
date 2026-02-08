import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import instance from "../../axiosConfig";
import styles from "./SignUp.module.css";

const SignUp = () => {
  const navigate = useNavigate();

  const userNameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const errors = {};

    const username = userNameDom.current.value.trim();
    const firstname = firstNameDom.current.value.trim();
    const lastname = lastNameDom.current.value.trim();
    const email = emailDom.current.value.trim();
    const password = passwordDom.current.value;

    if (!username) errors.username = "Username is required";
    else if (username.length < 3)
      errors.username = "Username must be at least 3 characters";

    if (!firstname) errors.firstname = "First name is required";
    else if (!/^[A-Za-z]+$/.test(firstname))
      errors.firstname = "First name must contain only letters";

    if (!lastname) errors.lastname = "Last name is required";
    else if (!/^[A-Za-z]+$/.test(lastname))
      errors.lastname = "Last name must contain only letters";

    if (!email) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Please enter a valid email address";

    if (!password) errors.password = "Password is required";
    else if (password.length < 6)
      errors.password = "Password must be at least 6 characters";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await instance.post("/users/register", {
        userName: userNameDom.current.value,
        firstName: firstNameDom.current.value,
        lastName: lastNameDom.current.value,
        email: emailDom.current.value,
        password: passwordDom.current.value,
      });
      navigate("/login");
    } catch (error) {
      setErrors({
        server: error.response?.data?.msg || "Registration failed",
      });
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Join the network</h2>
      <p className={styles.signupText}>
        Already have an account?{" "}
        <span onClick={() => navigate("/login")}>Sign in</span>
      </p>

      {errors.server && <p className={styles.error}>{errors.server}</p>}

      <form onSubmit={handleSubmit}>
        <input
          className={`${styles.input} ${errors.username ? styles.inputError : ""}`}
          type="text"
          placeholder="Username"
          ref={userNameDom}
        />
        {errors.username && <p className={styles.error}>{errors.username}</p>}

        <div className={styles.nameRow}>
          <div className={styles.nameGroup}>
            <input
              className={`${styles.input} ${errors.firstname ? styles.inputError : ""}`}
              type="text"
              placeholder="First name"
              ref={firstNameDom}
            />
            {errors.firstname && (
              <p className={styles.error}>{errors.firstname}</p>
            )}
          </div>

          <div className={styles.nameGroup}>
            <input
              className={`${styles.input} ${errors.lastname ? styles.inputError : ""}`}
              type="text"
              placeholder="Last name"
              ref={lastNameDom}
            />
            {errors.lastname && (
              <p className={styles.error}>{errors.lastname}</p>
            )}
          </div>
        </div>

        <input
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          type="email"
          placeholder="Email address"
          ref={emailDom}
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}

        <div className={styles.passwordGroup}>
          <input
            className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            ref={passwordDom}
          />
          <span
            className={styles.eye}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "🙈" : "👁"}
          </span>
        </div>
        {errors.password && <p className={styles.error}>{errors.password}</p>}

        <p className={styles.agreement}>
          I agree to the <a href="/privacy-policy">privacy policy</a> and{" "}
          <a href="/terms-of-service">terms of service</a>.
        </p>

        <button type="submit" className={styles.submitBtn}>
          Agree and Join
        </button>
      </form>

      <p className={styles.create} onClick={() => navigate("/login")}>
        Already have an account? Login
      </p>
    </div>
  );
};

export default SignUp;
