import React from 'react';
import { AiFillInstagram , AiOutlineTwitter} from 'react-icons/ai';
import styled from 'styled-components';

const FooterContainer = styled.div `
    color: #324d67;
    text-align: center;
    margin-top: 20px;
    padding: 30px 10px;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    justify-content: center;

    &.icon{
        font-size: 30px;
        display: flex;
        gap: 10px;
    }
`
const Footer = () => {
    return (
        <FooterContainer>
            <p>2022 Abel's Store All rights reserverd</p>
            <p className="icons">
                <AiFillInstagram/>
                <AiOutlineTwitter/>
            </p>
        </FooterContainer>
    );
};

export default Footer;