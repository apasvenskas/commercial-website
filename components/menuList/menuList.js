import DumyList from "./dumyList";
import styles from "./menuList.module.css";

export default function MenuList() {
  return (
    <div className={styles.leftMenu}>
        <div className={styles.menu}>
            <div className={styles.menuTitleSection}>
                <div className={styles.menuTitle}>
                </div>
            </div>
        </div>
      <div className={styles.menuHeader}>
        <h3>Categories</h3>
      </div>
      <DumyList />
    </div>
  );
}
