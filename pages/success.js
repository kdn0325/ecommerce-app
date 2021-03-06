import React, { useEffect } from 'react';
import { useStateContext } from '../context/StateContext';
import { BsBagCheckFill } from "react-icons/bs";
import Link from 'next/link';
import { runFireworks } from '../lib/utility';
import styled from 'styled-components';


const SuccessWrapper = styled.div`
    background-color: white;
    min-height: 60vh;

    @media screen and (max-width:64rem){
        min-height: 69vh;
    }
`
const SuccessContainer = styled.div`
    width: 62rem;
    margin: auto;
    margin-top: 10rem;
    background-color: #dcdcdc;
    padding: 3rem;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media screen and (max-width:64rem){
        width: 23rem;
        margin-top: 6.25rem;
        padding: 1.2rem;
        height: 22rem;
    }

    h2{
        text-transform: capitalize;
        margin-top: 1rem 0;
        font-weight: 900;
        font-size: 2.5rem;
        color:#324d67;

        @media screen and (max-width:64rem){
            font-size: 1rem;
        }
    }
    .icon{
        color: green;
        font-size: 2.5rem;
    }
`
const EmailMsg = styled.p`
    font-size: 1rem;
    font-weight: 600;
    text-align: center;

`
const Description = styled.p`
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
    margin: .6rem;
    margin-top: 1.9rem;

    .email{
        margin-left: .3rem;
        color: #f02d34;
    }

`
const Button = styled.button`
    width: 100%;
    max-width: 25rem;
    padding: .6rem .75rem;
    border-radius: 1rem;
    border: none;
    font-size: 1.2rem;
    margin-top: .6rem;
    margin-top: 2.5rem;
    text-transform: uppercase;
    background-color: #f02d34;
    color: #fff;
    cursor: pointer;
    transform: scale(1, 1);
    transition: transform 0.5s ease;
    
    &:hover{
        transform: scale(1.1,1.1);
    }
`
const Success = () => {
    const {setCartItems,setTotalPrice,setTotalQuantities} = useStateContext();
    
    useEffect(()=>{
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        runFireworks();
    },[setCartItems,setTotalPrice,setTotalQuantities]);
    return (
        <SuccessWrapper>
            <SuccessContainer>
                <p className="icon">
                    <BsBagCheckFill/>
                </p>
                <h2>????????? ?????????????????????!</h2>
                <EmailMsg>???????????? ???????????? ??????????????????</EmailMsg>
                <Description>
                    ????????? ????????? ????????? ????????? ??????????????????
                    <a className="email" href="sexy-ehdsud@nate.com">
                    sexy-ehdsud@nate.com
                    </a>
                </Description>
                <Link href="/">
                    <Button type="button" width="300px">
                        ?????? ????????????
                    </Button>
                </Link>
            </SuccessContainer>
        </SuccessWrapper>
    );
};

export default Success;