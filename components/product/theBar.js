// theBar.js
import styles from './theBar.module.css';

export default function TheBar({ title, titleClassName }) {
  return (
    <div className={styles.bar}>
      <div className={styles.productBar}>
        <div className={styles.menu}>
          <h3 className={`${styles.title} ${titleClassName}`}>{title}</h3>
        </div>
      </div>
    </div>
  );
}






