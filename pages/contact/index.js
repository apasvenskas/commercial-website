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
                <textarea name="message" className={styles.messageBox} />
                <input className={styles.button} type="submit" value="Send" />
              </form>
              <div className={styles.infoSection}>
                <div className={styles.infoCard}>
                  <h4 className={styles.cardTitle}>Contact Info</h4>
                  <h4 className={styles.cardDispaly}>
                    <span className={styles.contactInfo}>Name: </span> Aušra
                    Martinkutė-Juodienė
                  </h4>
                  <h4 className={styles.cardDispaly}>
                    <span className={styles.contactInfo}>Telephone: </span>+370
                    620 64677
                  </h4>
                  <h4 className={styles.cardDispaly}>
                    <span className={styles.contactInfo}>Email: </span>
                    kynas42@gmail.com
                  </h4>
                  <h4 className={styles.cardDispaly}>
                    <span className={styles.contactInfo}>Address: </span>Rotušės
                    a. 1-15, LT-44280 Kaunas
                  </h4>
                  <h4 className={styles.cardDispaly}>
                    <span className={styles.contactInfo}>Location: </span>
                    Kaunas, Lithuania
                  </h4>
                </div>
              </div>
            </div>
            <div className={styles.mapSection}>
              <div className={styles.map}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2294.342133397457!2d23.88539907556076!3d54.896916957588594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e7220ff3184881%3A0x8002872ac9bbdb7c!2sRotu%C5%A1%C4%97s%20a.%201%2C%20Kaunas%2C%2044280%20Kauno%20m.%20sav.%2C%20Lithuania!5e0!3m2!1sen!2sus!4v1718066267243!5m2!1sen!2sus"
                  style={{ width: "100%", height: "100%", border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
