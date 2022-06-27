import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div `
    color: #222;
    text-align: center;
    margin-top: 20px;
    padding: 30px 10px;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1rem;

    &.icon{
        font-size: 1rem;
        display: flex;
    }
`
const Footer = () => {
    const [date,setDate] = useState();
    useEffect(()=>{
        setDate(new Date().getFullYear());
    },[]);
    return (
        <FooterContainer>
            <address>
                Copyright© {date} Abel Shop. All rights reserved
            </address>
        </FooterContainer>
    );
};

export default Footer;