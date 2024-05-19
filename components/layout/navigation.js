import Link from "next/link";
import Image from "next/image";
import Styled, { styled } from 'styled-components';

const NavigationStyle = styled.div`
    background-color: #C4BBA2;
`

export default function Navigation(){
    return (
    <NavigationStyle>
        <div className="topHeader">
            <div className="name">
                <Link href="/">
                    <h1>Laisvieji Menininkai</h1>
                </Link>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link href="/">Artist</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link href="/">New Art</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link href="/">All Art</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link href="/">Login</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link href="/">Contact</Link>
                    </li>
                </ul>
                <div className="cartWrapper">
                    <Link href="#"> 
                        <Image src="/cart.png" height={25} width={25} alt="cart"/>
                    </Link>
                </div>
            </nav>
        </div>
    </NavigationStyle>
    )
}