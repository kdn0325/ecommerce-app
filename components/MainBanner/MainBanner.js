import React from 'react';
import Link from 'next/link';
import { urlFor } from '../../lib/client';
import styled from 'styled-components';

const MainBannerContainer = styled.div`
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
        color: white;
        font-size: 10em;
        margin-left: -20px;
        text-transform: uppercase;

        @media screen and (max-width:800px){
            font-size: 50px;
        }
    }
    h3{
        font-size: 4rem;
        margin-top: 4px;
    }
    @media screen and (max-width:800px){
        font-size: 40px;
        height: 560px;
    }
` 
const BeatSolo = styled.p`
    font-size: 20px;
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
    z-index:10000 !important;

    @media screen and (max-width:800px){
        margin-top: 90px;
        z-index: 10000;
    }
` 
const MainBannerImg = styled.img`
    position: absolute;
    top: 0%;
    right:20%;
    width: 450px;
    height: 450px;
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
    color: #324d67;   

    @media screen and (max-width:800px){
        bottom: 60px;
    }

    h5{

        margin-bottom: 12px;
        font-weight: 700;
        font-size: 16px;
        /* color: black; */
        align-self: flex-end;
    }
    p{
        color: #5f5f5f;
        font-weight: 100;
        text-align: end;
    }
` 


const MainBanner = ({mainBanner}) => {
    return (
        <MainBannerContainer>
            <div>
                <BeatSolo>
                    {mainBanner.smallText}
                </BeatSolo>
                <h3>{mainBanner.midText}</h3>
                <h1>{mainBanner.largeText1}</h1>
                <MainBannerImg src={urlFor(mainBanner.image)} alt="headphones"/>
                <div>
                    <Link href={`/product/${mainBanner.product}`}>
                        <MainBannerButton type="button">{mainBanner.buttonText}</MainBannerButton>
                    </Link>
                    <MainBannerDesc>
                        <h5>상세 설명</h5>
                        <p>{mainBanner.desc}</p>
                    </MainBannerDesc>
                </div>
            </div>
        </MainBannerContainer>
    );
};

export default MainBanner;