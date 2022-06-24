import React from 'react';
import Link from 'next/link';
import { urlFor } from '../../lib/client';
import styled from 'styled-components';

const MainBannerContainer = styled.ul`
    padding: 100px 40px;
    border-radius: 15px;
    position: relative;
    height: 500px;
    line-height: 0.9; 
    width: 100%;

    @media screen and (max-width:800px){
        line-height: 1.3;
        height: 560px;
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

        @media screen and (max-width:800px){
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
    @media screen and (max-width:800px){
        font-size: 40px;
        height: 560px;
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
    color: white;
    border: none;
    margin-top: 40px;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    position:absolute;
    z-index:10000;
    top:60%;
    left:10%;

    @media screen and (max-width:800px){
        margin-top: 90px;
        z-index: 10000;
    }
` 
const MainBannerImg = styled.img`
    position:absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    z-index:50;
    @media screen and (max-width:800px){
        width: 77%;
        height: 62%;
        top: -2%;
        right: -6%;
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

    @media screen and (max-width:800px){
        bottom: 60px;
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
        color: #fff;
        font-weight: 100;
        text-align: end;
    }
` 


const MainBanner = ({mainBanner:{image,product,buttonText,smallText,midText,largeText1,desc}}) => {
    return (
        <MainBannerContainer>
            <li>
            <MainBannerImg src={urlFor(image)} alt="image"/>
                <BeatSolo>
                    {smallText}
                </BeatSolo>
                <h3>{midText}</h3>
                <h1>{largeText1}</h1>
                <div>
                    <Link href={`/product/${product}`}>
                        <MainBannerButton type="button" onClick="">{buttonText}</MainBannerButton>
                    </Link>
                    <MainBannerDesc>
                        <h5>상세 정보</h5>
                        <p>{desc}</p>
                    </MainBannerDesc>
                </div>
            </li>
        </MainBannerContainer>
    );
};

export default MainBanner;