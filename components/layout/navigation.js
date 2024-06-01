import Link from "next/link";
import Image from "next/image";
import styles from './navigation.module.css'

export default function Navigation(){
    return (
        <div className={styles.topHeader}>
            <div className={styles.name}>
                <Link href="/">
                    <h1>Laisvieji <br/> Menininkai</h1>
                </Link>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.link}>
                    <li>
                    <Link href={`/products/artist`}>Artist</Link>
                    </li>
                </ul>
                <ul className={styles.link}>
                    <li>
                        <Link href="/">New Art</Link>
                    </li>
                </ul>
                <ul className={styles.link}>
                    <li>
                        <Link href="/">All Art</Link>
                    </li>
                </ul>
                <ul  className={styles.link}>
                    <li>
                        <Link href="/">Login</Link>
                    </li>
                </ul>
                <ul className={styles.link}>
                    <li>
                        <Link href="/">Contact</Link>
                    </li>
                </ul>
                <div className={styles.cartWrapper}>
                    <Link href="#"> 
                        <Image src="/cart.png" height={25} width={25} alt="cart"/>
                    </Link>
                </div>
            </nav>
        </div>
    )
}