import React from 'react';
import { AiFillInstagram , AiOutlineTwitter} from 'react-icons/ai';
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

    &.icon{
        font-size: 30px;
        display: flex;
    }
`
const Footer = () => {
    return (
        <FooterContainer>
            <p>2022 Abel Shop All rights reserverd</p>
            <p className="icons">
                <AiFillInstagram/>
                <AiOutlineTwitter/>
            </p>
        </FooterContainer>
    );
};

export default Footer;