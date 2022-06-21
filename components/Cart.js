import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus , AiOutlinePlus , AiOutlineLeft , AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline} from "react-icons/ti"
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';
import Numeral from "numeral"
import toast from 'react-hot-toast';

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
        <div className="cart-wrapper" ref={cartRef}>
            <div className="cart-container">
                <button type="button" className="cart-heading" onClick={()=>setShowCart(false)}>
                    <AiOutlineLeft/>
                    <span className="heading">장바구니</span>
                    <span className="cart-num-items">({totalQuantities} items)</span>
                </button>
                {cartItems.length < 1 && (
                    <div className="empty-cart">
                        <AiOutlineShopping size={150}/>
                        <h3>장바구니가 비어있습니다</h3>
                        <Link href="/">
                            <button type="button" className="btn" onClick={()=>setShowCart(false)}>
                               쇼핑 하기 
                            </button>
                        </Link>
                    </div>
                )}
                <div className="product-container">
                    {cartItems.length >= 1 && cartItems.map((item) => (
                        <div className="product" key={item._id}>
                            <img src={urlFor(item?.image[0])} className="cart-product-image"/>
                            <div className="item-desc">
                                <div className="flex top">
                                    <h5>{item.name}</h5>
                                    <h4>{Numeral(item.price).format(0,0)}원</h4>
                                </div>
                                <div className="flex bottom">
                                    <div>
                                    <p className="quantity-desc">
                                        <span className="minus" onClick={()=>toggleCartItemQuanitity(item._id,"dec")}>
                                            <AiOutlineMinus/>
                                        </span>
                                        <span className="num" onClick="">
                                            {item.quantity}
                                        </span>
                                        <span className="plus" onClick={()=>toggleCartItemQuanitity(item._id,"inc")}>
                                            <AiOutlinePlus/>
                                        </span>
                                    </p>
                                    </div>
                                    <button type="button" className="remove-item" onClick={()=>onRemove(item)}>
                                        <TiDeleteOutline/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {cartItems.length >=1 && (
                    <div className="cart-bottom">
                        <div className="total">
                            <h3>총 가격:</h3>
                            <h3>{Numeral(totalPrice).format(0,0)}원</h3>
                        </div>
                        <div className="btn-container">
                            <button type="button" className="btn" onClick={handleCheckOut}>
                                구매하기
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;