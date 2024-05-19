import Footer from "./footer";
import Navigation from "./navigation";

export default function Layout(props){
    return (
    <div>
        <Navigation />
        <main>{props.children}</main>
        <Footer />
    </div>
    )
}