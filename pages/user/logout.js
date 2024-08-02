import Link from "next/link";
import styles from "./logout.module.css";
import Head from "next/head";

export default function Logout() {
  return (
    <>
      <Head>
        <title>Logout Page</title>
        <meta name="description" content= "Logout page" />
      </Head>
      <section className={styles.mainSection}>
        <div className={styles.container}>
          <div className={styles.title}>
            <h3>Please Confirm</h3>
            <hr />
          </div>
          <div className={styles.color}>
            <div className={styles.message}>
              <h3>Are you sure you want to logout?</h3>
              <h3>Your items might be be lost.</h3>
            </div>
          </div>
        </div>
        <div className={styles.buttonBox}>
          <div className={styles.buttons}>
            <button className={styles.login}>
              <Link href={"/api/auth/logout"}>Yes, Logout</Link>
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
