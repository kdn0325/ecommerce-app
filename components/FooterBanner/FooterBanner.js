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
    
    @media screen and (max-width:800px){
        flex-wrap: wrap;
        gap: 20px;
    }
`
const DescLeft = styled.div`
    h3{
        font-weight: 900;
        font-size: 80px;
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

    h3{
        font-weight: 800;
        font-size: 60px;

        @media screen and (max-width:800px){
            font-size: 45px;
        }
    }

    p{
        font-size: 18px;
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
    /* top: -35%;
    left: 8%; */
    top: -25%;
    left: 25%;
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
                <FooterBannerImg src={urlFor(image)}/>
            </FooterBannerDesc>
        </FooterBannerContainer>
    );
};

export default FooterBanner;