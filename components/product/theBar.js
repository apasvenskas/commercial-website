import styles from './theBar.module.css'

export default function TheBar(){
    return (
        <div className={styles.bar}>
            <div className={styles.productBar}>
                <div className={styles.menu}>
                    <h3>The Bar Title</h3>
                </div>
            </div>
        </div>
    )
}