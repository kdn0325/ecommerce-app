import React from 'react';
import Link from "next/link";
import { urlFor } from "../../lib/client";
import Numeral from "numeral"
import styled from 'styled-components';

const ProductContainer = styled.div`

` 
const ProductCard = styled.div`

    cursor: pointer;
    transform: scale(1, 1);
    transition: transform 0.5s ease;
    color: #324d67;

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
` 
const ProductPrice = styled.p`
    font-weight: 800;
    margin-top: 6px;
    color: black;
` 

const Product = ({product:{image,name,slug,price}}) => {
    return (
        <ProductContainer>
            <Link href={`/product/${slug.current}`}>
                <ProductCard>
                    <ProductImg src={urlFor(image && image[0])} width={250} height={250}/>
                    <ProductName>{name}</ProductName>
                    <ProductPrice>{Numeral(price).format(0,0)}원</ProductPrice>
                </ProductCard>
            </Link>
        </ProductContainer>
    );
};

export default Product;