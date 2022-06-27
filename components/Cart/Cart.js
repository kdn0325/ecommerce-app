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
    width: 600px;
    background-color: #fff;
    float: right;
    padding: 40px 10px;

    @media screen and (max-width:800px){
        width: 415px;
        padding: 4px;
    }
`
const CartHeader = styled.button`
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    margin-left: 10px;
    border: none;
    background-color: transparent;
    
    @media screen and (max-width:800px){
        margin-top: 35px;
    }
`
const Heading = styled.span`
    margin-left: 10px;
`
const ItemCart = styled.span`
    margin-left: 10px;
    color: #f02d34;
`
const EmptyCart = styled.div`
    margin:40px;
    text-align:center;

    h3{
        font-weight: 600;
        font-size: 20px;
    }
`
const CartProductContainer = styled.div`
    margin-top: 15px;
    overflow: auto;
    max-height: 70vh;
    padding: 20px 10px;

    @media screen and (max-width:800px){
        margin-top: 10px;
    }
`
const Product = styled.div`
    display: flex;
    padding: 20px;
    justify-content:space-between;

    @media screen and (max-width:800px){
        padding: 20px 5px;
    }
`
const CartProductImg = styled.img`
    width: 30%;
    height: 150px;
    border-radius: 15px;
    background-color: #ebebeb;

    @media screen and (max-width:800px){
            width: 25%;
            height: 25%;
    }
`
const ItemDesc = styled.div` 

    width:60%;
        @media screen and (max-width:800px){
            width: 200px;
        }


        h5{
            font-size: 24px;
            color:#222;

            @media screen and (max-width:800px){
                font-size: 16px;
            }
        }

        h4{
            color:#222;
            font-size: 20px;
            @media screen and (max-width:800px){
                font-size: 16px;
                color: black;
            }
        }
`
const ItemDescFlexTop = styled.div`
        display: flex;
        justify-content: space-between;
        width: 350px;
        color: #324d67;

        @media screen and (max-width:800px){
            flex-wrap: wrap;
        }
`
const ItemDescFlexBottom = styled.div`
        display: flex;
        justify-content: space-between;
        width: 350px;
        color: #324d67;
        margin-top: 60px;

        @media screen and (max-width:800px){
            flex-wrap: wrap;
        }
`

const Quantity = styled.p`
    border: 1px solid gray;
    padding: 6px;
`
const Minus = styled.span`
    border-right: 1px solid #e9e9e9;
    color: #f02d34;
    font-size: 16px;
    padding: 6px 12px;
    cursor: pointer;
`
const Num = styled.span`
    border-right: 1px solid #e9e9e9;
    font-size: 20px;
    padding: 6px 12px;
    cursor: pointer;
`
const Plus = styled.span`
    color: rgb(49, 168, 49);
    font-size: 16px;
    padding: 6px 12px;
    cursor: pointer;
`


const RemoveItem = styled.button`
    font-size: 24px;
    color: #f02d34;
    cursor: pointer;
    background: transparent;
    border: none;
`
const CartBottom = styled.div`
    padding: 30px 65px;
}

    @media screen and (max-width:800px){
        padding: 30px;
    }
`
const Total = styled.div`
    display: flex;
    justify-content: space-between;

    h3{
        font-size: 22px;
        @media screen and (max-width:800px){
            font-size: 20px;
        }
    }
`
const BtnContainer = styled.div`
    width: 400px;
    margin: auto;

    @media screen and (max-width:800px){
        width: 300px;
        margin: auto;
    }
`
const CartButton = styled.button`
    width: 100%;
    max-width: 400px;
    padding: 10px 12px;
    border-radius: 15px;
    border: none;
    font-size: 20px;
    margin-top: 40px;
    text-transform: uppercase;
    background-color: #f02d34;
    color: #fff;
    cursor: pointer;
    transform: scale(1);
    transition: transform .5s ease;
    
    &:hover{
        transform: scale(1.1,1.1);
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
                    <ItemCart>({totalQuantities} items)</ItemCart>
                </CartHeader>
                {cartItems.length < 1 && (
                    <EmptyCart>
                        <AiOutlineShopping size={150}/>
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