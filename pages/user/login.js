import Link from "next/link";
import styles from "./login.module.css";
import Head from "next/head";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>
      <section className={styles.mainSection}>
        <div className={styles.container}>
          <div className={styles.title}>
            <h3>Please Confirm</h3>
            <hr />
          </div>
          <div className={styles.color}>
            <div className={styles.message}>
              <h3>By signing up you agree to receive</h3>
              <h3>Monthly newsletter from us</h3>
            </div>
          </div>
        </div>
        <div className={styles.buttonBox}>
          <div className={styles.buttons}>
            <button className={styles.login}>
              <Link href={"/api/auth/login"}>Yes, Login</Link>
            </button>
            <button className={styles.goBack}>
              <Link href="/">No, go back</Link>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
