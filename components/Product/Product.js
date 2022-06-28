import React from 'react';
import Link from "next/link";
import { urlFor } from "../../lib/client";
import Numeral from "numeral"
import styled from 'styled-components';
import {AiFillStar , AiOutlineStar } from 'react-icons/ai';


const ProductContainer = styled.div`
    margin-right:10px;

` 
const ProductCard = styled.div`
    cursor: pointer;
    transform: scale(1, 1);
    transition: transform 0.5s ease;
    color: #324d67;
    padding:1rem;

    &:hover{
        transform: scale(1.1,1.1)
    }
` 
const ProductImg = styled.img`
    border-radius: 15px;
    background-color: #ebebeb;
    transform: scale(1, 1);
    transition: transform 0.5s ease;
` 
const ProductName = styled.p`
    font-weight: 500;
    margin:1rem 0;
    color:#555;
` 
const ProductPrice = styled.p`
    font-weight: 800;
    margin-top: 6px;
    color: #222;
    font-size:22px;
` 
const Review = styled.div`
    color: #222;
    margin-top: 10px;
    display: flex;
    align-items: center;
    p{
        color: #324d67;
        margin-top: 0px;
    }
`

const Product = ({product:{image,name,slug,price}}) => {
    return (
        <ProductContainer>
            <Link href={`/product/${slug.current}`}>
                <ProductCard>
                    <ProductImg src={urlFor(image && image[0])} width={250} height={250} alt={name}/>
                    <ProductName>2022 {name}</ProductName> 
                    <ProductPrice>{Numeral(price).format(0,0)}원</ProductPrice>
                    <Review>
                        <div>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiOutlineStar/>
                        </div>
                        <p>
                            (20)
                        </p>
                    </Review>
                </ProductCard>
            </Link>
        </ProductContainer>
    );
};

export default Product;