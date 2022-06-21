import React, { useEffect, useState } from 'react';
import { useStateContext } from '../context/StateContext';
import { BsBagCheckFill } from "react-icons/bs";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { runFireworks } from '../lib/utility';

const success = () => {
    const {setCartItems,setTotalPrice,setTotalQuantities} = useStateContext();
    const [order,setOrder] = useState(null);
    
    useEffect(()=>{
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        runFireworks();
    },[]);
    return (
        <div className="success-wrapper">
            <div className="success">
                <p className="icon">
                    <BsBagCheckFill/>
                </p>
                <h2>구매가 완료되었습니다!</h2>
                <p className="email-msg">메일에서 영수증을 확인하십시오</p>
                <p className="description">
                    궁금한 내용이 있으면 메일을 전송해주세요
                    <a className="email" href="sexy-ehdsud@nate.com">
                    sexy-ehdsud@nate.com
                    </a>
                </p>
                <Link href="/">
                    <button type="button" width="300px" className="btn">
                        계속 쇼핑하기
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default success;