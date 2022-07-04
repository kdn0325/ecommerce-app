import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus , AiOutlinePlus , AiOutlineLeft , AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline} from "react-icons/ti"
import { useStateContext } from '../../context/StateContext';
import { urlFor } from '../../lib/client';
import getStripe from '../../lib/getStripe';
import Numeral from "numeral"
import toast from 'react-hot-toast';
import styled from 'styled-components';

const CartWrapper = styled.div`
    width: 100vw;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    right: 0;
    top: 0;
    z-index: 100;
    transition: all 1s ease-in-out;

`
const CartContainer = styled.div`
    position: relative;
    height: 100vh;
    width: 37.5rem;
    background-color: #fff;
    float: right;
    padding: 2.5rem .6rem;
    

    @media screen and (max-width:64rem){
        width: 26rem;
        padding: .25rem;
    }
    @media screen and (max-width:37rem){
        width: 100%;
    }
`
const CartHeader = styled.button`
    display: flex;
    align-items: center;
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;
    margin-left: .6rem;
    border: none;
    background-color: transparent;
    
    @media screen and (max-width:64rem){
        margin-top: 2rem;
    }
    @media screen and (max-width:37rem){
        margin-left: 1.5rem;
    }
`
const Heading = styled.span`
    margin-left: .6rem;
`
const ItemCart = styled.span`
    margin-left: .6rem;
    color: #f02d34;
`
const EmptyCart = styled.div`
    margin:2.5rem;
    text-align:center;

    h3{
        font-weight: 600;
        font-size: 1.2rem;

        @media screen and (max-width:37rem){
            font-size: 1.5rem;
        }
    }
`
const CartProductContainer = styled.div`
    margin-top: 1rem;
    padding: 1.2rem .6rem;
    overflow:auto;
`
const Product = styled.div`
    display: flex;
    padding: 1.2rem;
    justify-content:space-between;

    @media screen and (max-width:64rem){
        padding: 1.2rem .3rem;
    }
    @media screen and (max-width:37rem){
        /* padding:0 */
    }
`
const CartProductImg = styled.img`
    width: 30%;
    height: 9rem;
    border-radius: 1rem;
    background-color: #ebebeb;

    @media screen and (max-width:64rem){
        width: 25%;
        height: 25%;
    }
`
const ItemDesc = styled.div` 

    width:60%;
        h5{
            font-size: 1.5rem;
            color:#222;

            @media screen and (max-width:64rem){
                font-size: 1rem;
            }
            @media screen and (max-width:37rem){
                font-size: .8rem;
            }
        }

        h4{
            color:#222;
            font-size: 1.2rem;
            @media screen and (max-width:64rem){
                font-size: 1rem;
                color: black;
            }
            @media screen and (max-width:37rem){
                font-size: .7rem;
            }
        }
`
const ItemDescFlexTop = styled.div`
        display: flex;
        justify-content: space-between;
        color: #324d67;
`
const ItemDescFlexBottom = styled.div`
        display: flex;
        justify-content: space-between;
        color: #324d67;
        margin-top: 3.75rem;

        @media screen and (max-width:64rem){
            flex-wrap: wrap;
        }
`

const Quantity = styled.p`
    border: 1px solid gray;
    padding: .3rem;
    span{
        @media screen and (max-width:37rem){
            font-size: .6rem;
        }
    }
`
const Minus = styled.span`
    border-right: 1px solid #e9e9e9;
    color: #f02d34;
    font-size: 1rem;
    padding: .4rem .75rem;
    cursor: pointer;
`
const Num = styled.span`
    border-right: 1px solid #e9e9e9;
    font-size: 1.2rem;
    padding: .4rem .75rem;
    cursor: pointer;
`
const Plus = styled.span`
    color: rgb(49, 168, 49);
    font-size: 1rem;
    padding: .4rem .75rem;
    cursor: pointer;
`

const RemoveItem = styled.button`
    font-size: 1.5rem;
    color: #f02d34;
    cursor: pointer;
    background: transparent;
    border: none;
    @media screen and (max-width:37rem){
        font-size: 1.3rem;
    }
`
const CartBottom = styled.div`
    padding: 1.9rem 4rem;

    @media screen and (max-width:64rem){
        padding: 1.9rem;
    }
`
const Total = styled.div`
    display: flex;
    justify-content: space-between;

    h3{
        font-size: 1.5rem;
        @media screen and (max-width:64rem){
            font-size: 1.2rem;
        }
        @media screen and (max-width:64rem){
            font-size: 1rem;
        }
    }
`
const BtnContainer = styled.div`
    width: 25rem;
    margin: auto;

    @media screen and (max-width:64rem){
        width: 15rem;
        margin: auto;
    }
    @media screen and (max-width:37rem){
        width: 10rem;
        margin: auto;
    }
`
const CartButton = styled.button`
    width: 100%;
    max-width: 25rem;
    padding: .6rem .75rem;
    border-radius: 1rem;
    border: none;
    font-size: 1.2rem;
    margin-top: 2.5rem;
    text-transform: uppercase;
    background-color: #f02d34;
    color: #fff;
    cursor: pointer;
    transform: scale(1);
    transition: transform .5s ease;
    
    &:hover{
        transform: scale(1.1,1.1);
    }
    @media screen and (max-width:64rem){
        font-size: 1rem;
        max-width: 15rem;
    }
    
`
const CartIco = styled.p`
    font-size:2rem;

    @media screen and (max-width:64rem){
        font-size:4rem;
    }
    @media screen and (max-width:37rem){
        font-size:6rem;
    }
    
`
const Cart = () => {
    const cartRef = useRef();
    const {totalPrice , totalQuantities , cartItems , setShowCart ,toggleCartItemQuanitity , onRemove} = useStateContext();

    const handleCheckOut = async () => {
        const stripe = await getStripe();

        const response = await fetch('/api/stripe' , {
            method:'POST',
            headers: {
                'Content-Type' : 'application/json' , 
            },
            //body = 장바구니 항목 
            body:JSON.stringify(cartItems),
        });

        if(response.statusCode === 500) return;
        //응답이 500 이 아닌 경우 실행
        const data = await response.json();

        toast.loading("로딩중 ...");

        stripe.redirectToCheckout({sessionId : data.id})
    }
    return (
        <CartWrapper ref={cartRef}>
            <CartContainer>
                <CartHeader onClick={()=>setShowCart(false)}>
                    <AiOutlineLeft/>
                    <Heading>장바구니</Heading>
                    <ItemCart>(전체 {totalQuantities}개)</ItemCart>
                </CartHeader>
                {cartItems.length < 1 && (
                    <EmptyCart>
                        <CartIco><AiOutlineShopping/></CartIco>
                        <h3>장바구니가 비어있습니다</h3>
                        <Link href="/">
                            <CartButton onClick={()=>setShowCart(false)}>
                               쇼핑 하기 
                            </CartButton>
                        </Link>
                    </EmptyCart>
                )}
                <CartProductContainer>
                    {cartItems.length >= 1 && cartItems.map((item) => (
                        <Product key={item._id}>
                            <CartProductImg src={urlFor(item?.image[0])} alt={item.name}/>
                            <ItemDesc>
                                <ItemDescFlexTop>
                                    <h5>{item.name}</h5>
                                    <h4>{Numeral(item.price).format(0,0)}원</h4>
                                </ItemDescFlexTop>
                                <ItemDescFlexBottom>
                                    <div>
                                    <Quantity>
                                        <Minus onClick={()=>toggleCartItemQuanitity(item._id,"dec")}>
                                            <AiOutlineMinus/>
                                        </Minus>
                                        <Num>
                                            {item.quantity}
                                        </Num>
                                        <Plus onClick={()=>toggleCartItemQuanitity(item._id,"inc")}>
                                            <AiOutlinePlus/>
                                        </Plus>
                                    </Quantity>
                                    </div>
                                    <RemoveItem onClick={()=>onRemove(item)}>
                                        <TiDeleteOutline/>
                                    </RemoveItem>
                                </ItemDescFlexBottom>
                            </ItemDesc>
                        </Product>
                    ))}
                </CartProductContainer>
                {cartItems.length >=1 && (
                    <CartBottom>
                        <Total>
                            <h3>총 가격:</h3>
                            <h3>{Numeral(totalPrice).format(0,0)}원</h3>
                        </Total>
                        <BtnContainer>
                            <CartButton onClick={handleCheckOut}>
                                구매하기
                            </CartButton>
                        </BtnContainer>
                    </CartBottom>
                )}
            </CartContainer>
        </CartWrapper>
    );
};

export default Cart;