import styles from './dumyList.module.css'

export default function DumyList(){
    return(
        <div className={styles.categories}>
            <p className={styles.p}>Still Object</p>
            <p className={styles.p}>Abstract</p>
            <p className={styles.p}>Portret</p>
            <p className={styles.p}>Landscape</p>
            <p className={styles.p}>Allegory</p>
        </div>
    )
}