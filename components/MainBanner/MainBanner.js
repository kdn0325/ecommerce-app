import React from 'react';
import Link from 'next/link';
import { urlFor } from '../../lib/client';
import styled from 'styled-components';

const MainBannerContainer = styled.ul`
    position: relative;
    height: 39rem;
    line-height: 0.9;
    width: 100%;
    cursor: pointer;

    @media screen and (max-width:64rem){
        line-height: 1.3;
        height: 35rem;
    }

    li{
        height:100%;
    }

    h1{
        font-size: 5em;
        margin-left: -1.2rem;
        text-transform: uppercase;
        color: #fff;
        position: absolute;
        top:20%;
        left:10%;
        z-index:99;

        @media screen and (max-width:64rem){
            font-size: 3rem;
        }
        @media screen and (max-width:37rem){
            font-size: 2rem;
        }
    }
    h3{
        font-size: 1rem;
        margin-top: .25rem;
        color: #fff;
        position: absolute;
        top:45%;
        left:10%;
        z-index:99;
        @media screen and (max-width:37rem){
            display:none;
        }
    }
    @media screen and (max-width:64rem){
        font-size: 2.5rem;
        height: 35rem;
    }
    @media screen and (max-width:37rem){
        height: 20rem;
    }
`

const MainBannerImg = styled.img`

    background-color:#000;
    border-radius:1.2rem;
    position:absolute;
    top:0;
    left:0;
    width: 100%;
    height:100%;
    z-index:50;
    opacity:.9;
    @media screen and (max-width:37rem){

    }

` 
const BeatSolo = styled.p`
    font-size: 1.2rem;
    color: #fff;
    position:absolute;
    top:50%;
    left:10%;
    z-index:99;
    
` 
const MainBannerButton = styled.button`
    border-radius: 1rem;
    padding: .6rem 1rem;
    background-color: #f02d34;
    color: #fff;
    border: none;
    margin-top: 2.5rem;
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;
    position:absolute;
    z-index:10000;
    top:60%;
    left:10%;

    @media screen and (max-width:64rem){
        margin-top: 5.5rem;
        z-index: 10000;
    }
    @media screen and (max-width:37rem){
        margin-top: 3rem;
    }
` 
const MainBannerDesc = styled.div`
    position: absolute;
    right: 10%;
    bottom: 5%;
    width: 19rem;
    line-height: 1.3;
    display: flex;
    flex-direction: column;
    color: #fff;
    z-index:99;

    @media screen and (max-width:64rem){
        display: none;
    }

    h5{
        margin-bottom: .75rem;
        font-weight: 700;
        font-size: 1rem;
        align-self: flex-end;
        color: #f5fffa;
        @media screen and (max-width:37rem){
            display:none;
        }
    }
    p{
        color: #f0f8ff;
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