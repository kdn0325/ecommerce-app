import React from 'react';
import Link from 'next/link';
import { urlFor } from '../../lib/client';
import styled from 'styled-components';

const FooterBannerContainer = styled.div`
    border-radius: 15px;
    position: relative;
    height: 400px;
    line-height: 1;
    color: #fff;
    width: 100%;
    margin-top: 120px;

    @media screen and (max-width:64rem){
        height: 560px;
        margin-top: 80px;
    }
`
const FooterBannerDesc = styled.div`
    display: flex ;
    justify-content: space-between;
    position:absolute;
    z-index:999;

    
    @media screen and (max-width:64rem){
        flex-wrap: wrap;
    }
`
const DescLeft = styled.div`
    width:50%;
    @media screen and (max-width:64rem){
        width:100%;
        padding:2rem;
    }
    h3{
        font-weight: 900;

        font-size: 3rem;
        margin-left: 4rem;
        @media screen and (max-width:64rem){
            font-weight: 900;
            font-size: 3rem;
            margin-left: 2rem;
        }
    }

    p{
        margin: 4rem;
        @media screen and (max-width:64rem){
            
        }
    }

` 
const DescRight = styled.div`
    line-height: 1.4;
    width:40%;
    @media screen and (max-width:64rem){
            display:none;
    }

    h3{
        font-weight: 800;
        font-size: 60px;
        margin-right: 25px;

        @media screen and (max-width:64rem){
            font-size: 45px;
            margin-right: 5px;
        }
    }

    p{
        font-size: 1rem;
        margin:2rem;
        @media screen and (max-width:64rem){
            font-size: 1rem;
        }
    }

` 
const FooterBannerButton = styled.button`
    border-radius: 1.5rem;
    padding: .8rem 1.2rem;
    background-color: white;
    color: red;
    border: none;
    margin: 2rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
` 
const FooterBannerImg = styled.img`
    position: absolute;
    width:100%;
    height:100%;
    top: 0;
    left: 0;
    z-index:99;
` 
//구조분해 할당
const FooterBanner = ({footerBanner:{discount,largeText1,largeText2,saleTime,smallText,midText,desc,product,buttonText,image}}) => {
    return (
        <FooterBannerContainer>
            <FooterBannerImg src={urlFor(image)} alt={product}/>
            <FooterBannerDesc>
                <DescLeft>
                    <p>{discount}</p>
                    <h3>{largeText1}</h3>
                    <h3>{largeText2}</h3>
                    <p>{saleTime}</p>
                </DescLeft>
                <DescRight>
                    <p>{smallText}</p>
                    <p>{midText}</p>
                    <p>{desc}</p>
                    <Link href={`/product/${product}`}>
                        <FooterBannerButton type="button">
                            {buttonText}
                        </FooterBannerButton>
                    </Link>
                </DescRight>
            </FooterBannerDesc>
        </FooterBannerContainer>
    );
};

export default FooterBanner;