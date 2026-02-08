import React from 'react';
import styles from './Register.module.css'
import SignUp from '../../components/SignUp/SignUp'
import About from '../../components/About/About'
const Register = () => {
  return (
    <main className={styles.loginPage}>
      <div className={styles.loginContent}>
        <div className={styles.signInSection}>
          <SignUp />
        </div>

        {/* About Section */}
        <div className={styles.aboutWrapper}>
          <div className={styles.bgShape}></div>
          <div className={styles.aboutContent}>
            <About/>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;