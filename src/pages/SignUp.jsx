import React, { useState } from "react";
import styles from "./SignUp.module.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.container}>
    <div className={styles.card}>
      <div className={styles.header}>
        <h2>Join the network</h2>
        <p>
          Already have an account?{" "}
          <a href="#" className={styles.link}>
            Sign in
          </a>
        </p>
      </div>

      <form className={styles.form}>
        <input type="text" placeholder="Username" />

        <div className={styles.nameRow}>
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
        </div>

        <input type="email" placeholder="Email address" />

        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
          <span
            className={styles.eyeIcon}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Agree and Join
        </button>

        <p className={styles.terms}>
          I agree to the{" "}
          <a href="#" className={styles.link}>
            privacy policy
          </a>{" "}
          and{" "}
          <a href="#" className={styles.link}>
            terms of service
          </a>
          .
        </p>

        <p className={styles.alreadyAccountBottom}>
          <a href="#">Already have an account?</a>
        </p>
      </form>
    </div>
    </div>
  );
};

export default SignUp;
