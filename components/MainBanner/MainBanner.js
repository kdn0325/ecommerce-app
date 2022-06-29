import React from 'react';
import Link from 'next/link';
import { urlFor } from '../../lib/client';
import styled from 'styled-components';

const MainBannerContainer = styled.ul`
    /* padding: 100px 40px; */
    position: relative;
    height: 620px;
    line-height: 0.9; 
    width: 100%;
    cursor: pointer;

    @media screen and (max-width:64rem){
        line-height: 1.3;
        height: 560px;
    }
    li{
        height:100%
    }

    h1{
        font-size: 5em;
        margin-left: -20px;
        text-transform: uppercase;
        color: #fff;
        position: absolute;
        top:20%;
        left:10%;
        z-index:99;

        @media screen and (max-width:64rem){
            font-size: 50px;
        }
    }
    h3{
        font-size: 1rem;
        margin-top: 4px;
        color: #fff;
        position: absolute;
        top:45%;
        left:10%;
        z-index:99; 
    }
    @media screen and (max-width:64rem){
        font-size: 40px;
        height: 560px;
    }
`

const MainBannerImg = styled.img`
    background-color:#000;
    border-radius:20px;
    position:absolute;
    top:0;
    left:0;
    width: 100%;
    height:100%;
    z-index:50;
    opacity:.9;
    @media screen and (max-width:64rem){
        width: 100%;
    }

` 
const BeatSolo = styled.p`
    font-size: 20px;
    color: #fff;
    position:absolute;
    top:50%;
    left:10%;
    z-index:99;
    
` 
const MainBannerButton = styled.button`
    border-radius: 15px;
    padding: 10px 16px;
    background-color: #f02d34;
    color: #fff;
    border: none;
    margin-top: 40px;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    position:absolute;
    z-index:10000;
    top:60%;
    left:10%;

    @media screen and (max-width:64rem){
        margin-top: 90px;
        z-index: 10000;
    }
` 
const MainBannerDesc = styled.div`
    position: absolute;
    right: 10%;
    bottom: 5%;
    width: 300px;
    line-height: 1.3;
    display: flex;
    flex-direction: column;
    color: #fff;
    z-index:99;

    @media screen and (max-width:64rem){
        display: none;
    }

    h5{

        margin-bottom: 12px;
        font-weight: 700;
        font-size: 16px;
        /* color: black; */
        align-self: flex-end;
        color: #fff;
    }
    p{
        color: #6e6e73;
        font-weight: 100;
        text-align: end;

        @media screen and (max-width:64rem){
            display:none;
        }
    }
` 


const MainBanner = ({mainBanner}) => {
    const {image,product,buttonText,smallText,midText,largeText1,desc} = mainBanner;
    return (
        <Link href={`/product/${product}`}>
            <MainBannerContainer>
                <li>
                <MainBannerImg src={urlFor(image)} alt={product}/>
                    <BeatSolo>
                        {smallText}
                    </BeatSolo>
                    <h3>{midText}</h3>
                    <h1>{largeText1}</h1>
                    <div>
                        <p>
                            <MainBannerButton type="button">{buttonText}</MainBannerButton>
                        </p>
                        <MainBannerDesc>
                            <h5>상세 정보</h5>
                            <p>{desc}</p>
                        </MainBannerDesc>
                    </div>
                </li>
            </MainBannerContainer>
        </Link>
    );
};

export default MainBanner;