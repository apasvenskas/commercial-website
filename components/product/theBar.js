import { useRouter } from 'next/router';
import styles from './theBar.module.css';

export default function TheBar() {
  const router = useRouter();
  const { pathname } = router;

  // Initialize the title with a default value
  let title = 'Paintings';

  // Set the title based on the current route
  if (pathname.includes('/products/types/')) {
    title = 'Product Types';
  } else if (pathname.includes('/some-other-route')) {
    title = 'Some Other Route';
  }

  return (
    <div className={styles.bar}>
      <div className={styles.productBar}>
        <div className={styles.menu}>
          <h3>{title}</h3>
        </div>
      </div>
    </div>
  );
}
