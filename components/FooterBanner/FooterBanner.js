import React from 'react';
import Link from 'next/link';
import { urlFor } from '../../lib/client';
import styled from 'styled-components';

const FooterBannerContainer = styled.div`
    padding: 100px 40px;
    background-color: #f02d34;
    border-radius: 15px;
    position: relative;
    height: 400px;
    line-height: 1;
    color: #fff;
    width: 100%;
    margin-top: 120px;

    @media screen and (max-width:800px){
        height: 560px;
        margin-top: 80px;
    }
`
const FooterBannerDesc = styled.div`
    display: flex ;
    justify-content: space-between;
    position:absolute;
    z-index:999;

    
    @media screen and (max-width:800px){
        flex-wrap: wrap;
    }
`
const DescLeft = styled.div`
    padding: 3rem 5rem;
    h3{
        font-weight: 900;

        font-size: 4rem;
        margin-left: 25px;
        @media screen and (max-width:800px){

            font-weight: 900;
            font-size: 50px;
            margin-left: 5px;
        }
    }

    p{
        margin:18px;

        @media screen and (max-width:800px){
            margin:18px;
        }
    }

` 
const DescRight = styled.div`
    line-height: 1.4;
    padding:3rem 5rem;

    h3{
        font-weight: 800;
        font-size: 60px;
        margin-right: 25px;

        @media screen and (max-width:800px){
            font-size: 45px;
            margin-right: 5px;
        }
    }

    p{
        font-size: 18px;
        margin:18px;
        @media screen and (max-width:800px){
            font-size: 18px;
        }
    }

` 
const FooterBannerButton = styled.button`
    border-radius: 15px;
    padding: 10px 16px;
    background-color: white;
    color: red;
    border: none;
    margin-top: 40px;
    font-size: 18px;
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
    @media screen and (max-width:800px){
        width: 77%;
        left: 30%;
        top: 6%;
        height: 56%
    }
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