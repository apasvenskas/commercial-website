import { useRouter } from 'next/router';
import styles from './theBar.module.css';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

export default function TheBar() {
  const router = useRouter();
  const { types } = router.query;

  const title = types ? capitalizeFirstLetter(types) : 'Paintings';

  return (
    <div className={styles.bar}>
      <div className={styles.productBar}>
        <div className={styles.menu}>
          <h3 className={styles.title}>{title}</h3>
        </div>
      </div>
    </div>
  );
}
