import React, { useRef } from 'react';
import MenuList from "@/components/menuList/menuList";
import TheBar from "@/components/product/theBar";
import styles from "./index.module.css";

export default function Contacts() {
  const title = "Contacts";

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_YOUR_SERVICE_ID,
        process.env.NEXT_PUBLIC_OUR_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_YOUR_PUBLIC_KEY
      )
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <>
      <div className={styles.body}>
        <div className={styles.menuDiv}>
          <MenuList />
        </div>
        <div className={styles.theBarContainer}>
          <TheBar title={title} className={styles.theBar} />
          <div className={styles.main}>
            <div className={styles.title}>
                <h3>Contact Us</h3>
            </div>
            <div className={styles.formWraper}>
            <form ref={form} onSubmit={sendEmail}>
              <label>Name</label>
              <input type="text" name="user_name" />
              <label>Email</label>
              <input type="email" name="user_email" />
              <label>Message</label>
              <textarea name="message" />
              <input type="submit" value="Send" />
            </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
