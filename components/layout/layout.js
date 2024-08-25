import Footer from "./footer";
import Navigation from "./navigation";
import styles from './layout.module.css';

export default function Layout({ children, allPaintings }) {
    return (
    <div className={styles.body}>
        <Navigation allPaintings={allPaintings} />
        <main>{children}</main>
        <Footer />
    </div>
    )
}