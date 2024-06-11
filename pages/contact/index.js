import React, { useRef } from "react";
import MenuList from "@/components/menuList/menuList";
import TheBar from "@/components/product/theBar";
import styles from "./index.module.css";
import emailjs from "emailjs-com";

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
        },
        e.target.reset()
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
              <form className={styles.form} ref={form} onSubmit={sendEmail}>
                <label className={styles.label}>Name:</label>
                <input className={styles.input} type="text" name="from_name" />
                <label className={styles.label}>Email:</label>
                <input className={styles.input} type="email" name="email" />
                <label className={styles.label}>Subject:</label>
                <input className={styles.input} type="text" name="subject" />
                <label className={styles.label}>Message:</label>
                <textarea name="message" className={styles.messageBox}/>
                <input className={styles.button} type="submit" value="Send" />
              </form>
              <div className={styles.infoSection}>
                <div className={styles.infoCard}>
                  <h4 className={styles.cardTitle}>Contact Info</h4>
                  <h4 className={styles.cardDispaly}><span className={styles.contactInfo}>Name:  </span>	Aušra Martinkutė-Juodienė</h4>
                  <h4 className={styles.cardDispaly}><span className={styles.contactInfo}>Telephone:  </span>+370 620 64677</h4>
                  <h4 className={styles.cardDispaly}><span className={styles.contactInfo}>Email:  </span>kynas42@gmail.com</h4>
                  <h4 className={styles.cardDispaly}><span className={styles.contactInfo}>Address:  </span>Rotušės a. 1-15, LT-44280 Kaunas</h4>
                  <h4 className={styles.cardDispaly}><span className={styles.contactInfo}>Location:  </span>Kaunas, Lithuania</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}  