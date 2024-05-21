import styles from './footer.module.css'

export default function Footer(){

    let date = new Date().getFullYear()

    return (
        <div className={styles.footer}>
            @ Laisvieji Menininkai {date}
        </div>
    ) 
}