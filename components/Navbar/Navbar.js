import React from 'react';
import Link from 'next/link';
import {AiOutlineShopping} from "react-icons/ai"
import { Cart } from "../";
import { useStateContext } from '../../context/StateContext';
import styled from 'styled-components';


const NavContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 6px 18px;
    position: relative;
` 
const Logo = styled.p`
    color: gray;
    font-size: 18px;
    text-align: center;
    transition: transform .4s ease;
    &:hover{
        transform: scale(1.1,1.1);
    }
        img{
                width: 50%;
                @media screen and (max-width:800px){
                    width: 30%;
                }
        }
` 

const CartIcon = styled.button`
    font-size: 25px;
    color: gray;
    cursor: pointer;
    position: relative;
    transition: transform .4s ease;
    border: none;
    background-color: transparent;

    &:hover{
        transform: scale(1.1,1.1);
    }
`
const CartItemQty = styled.span`
    position: absolute;
    right: -8px;
    font-size: 12px;
    color: #eee;
    background-color: #f02d34;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    text-align: center;
    font-weight: 600;
`

const Navbar = () => {
    const {showCart , setShowCart , totalQuantities} = useStateContext();
    return (
        <NavContainer>
            <Logo>
                <Link href="/"><img alt="abel-portfolio" src="https://user-images.githubusercontent.com/91298955/161248419-bc807d7e-f379-4f2e-95c4-d31f71cb4727.png"/></Link>
            </Logo>
            <CartIcon type="button"  onClick={()=> setShowCart(true)}>
                <AiOutlineShopping/>
                <CartItemQty>{totalQuantities}</CartItemQty>
            </CartIcon>
            {showCart && <Cart/>}
        </NavContainer>
    );
};

export default Navbar;