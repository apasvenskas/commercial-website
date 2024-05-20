import Footer from "./footer";
import Navigation from "./navigation";
import styles from './layout.module.css';

export default function Layout(props){
    return (
    <div className={styles.body}>
        <Navigation />
        <main>{props.children}</main>
        <Footer />
    </div>
    )
}