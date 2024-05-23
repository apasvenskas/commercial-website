import styles from './dumyList.module.css'
import Link from 'next/link'

export default function DumyList(){
    return(
        <div className={styles.categories}>
            <Link href="/">
            <p className={styles.p}>Still Object</p>
            </Link>
            <Link href="/">
            <p className={styles.p}>Abstract</p>
            </Link>
            <Link href="/">
            <p className={styles.p}>Portret</p>
            </Link>
            <Link href="/">
            <p className={styles.p}>Landscape</p>
            </Link>
            <Link href="/">
            <p className={styles.p}>Allegory</p>
            </Link>
        </div>
    )
}