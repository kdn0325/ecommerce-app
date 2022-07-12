import React, { useState } from 'react';
import { client ,urlFor } from '../../lib/client';
import { AiOutlineMinus , AiOutlinePlus , AiFillStar , AiOutlineStar } from 'react-icons/ai';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';
import Numeral from "numeral"
import styled, { keyframes } from 'styled-components';

const ProductDetailContainer = styled.div`
    display: flex;
    justify-content:space-between;
    margin: 4rem 2.5rem 2.5rem;
    color: #222;

    @media screen and (max-width:64rem){
        flex-wrap: wrap;
        margin: 1.2rem;
    }
`
const ProductLeft = styled.div`
    width:50%;
    @media screen and (max-width:37rem){
        display:flex;
        flex-direction:row-reverse;
    }
`
const ProductDetailImg = styled.img`
    border-radius: 1rem;
    background-color: #ebebeb;
    width: 80%;
    cursor: pointer;
    transition: .3s ease-in-out;
    height: 22rem;

    @media screen and (max-width:64rem){
        height: 20rem;
    }
    @media screen and (max-width:37rem){
        height: 10rem;
    }
    
    &:hover{
        background-color: #f02d34;
    }
`
const ImgContainer = styled.div`

    @media screen and (max-width:37rem){
        width:100%
    }  

`
const SmallImgContainer = styled.div`
    display: flex;
    margin-top: 1.2rem;

    @media screen and (max-width:64rem){
       flex-wrap:wrap;
       margin:0;
    }
    @media screen and (max-width:37rem){
        font-size:.5rem;
        flex-wrap:wrap;
        flex-direction:column;
        width:50%;
    }  

    .small-image{
        border-radius: .5rem;
        background-color: #ebebeb;
        margin-top:1rem;
        height: 4rem;
        cursor: pointer;
        @media screen and (max-width:37rem){
            width: 2rem;
            height: 2rem;
        }  
    }
    .selected-image{
        background-color:#f02d34;
    }
`
const ProductDetailDesc = styled.div`
    width:50%;
    letter-spacing: -0.5px;
    line-height:150%;
    @media screen and (max-width:37rem){
        line-height:100%;
        width:40%;
    } 


    h1{
        font-size:2rem;

        @media screen and (max-width:37rem){
            font-size:1rem;
        }  
    }
    h4{
        margin: 1.9rem 0;
        @media screen and (max-width:37rem){
            font-size:.5rem;
        }  
    }
`
const Review = styled.div`
    color: #f7511a;
    margin-top: .6rem;
    display: flex;
    align-items: center;
    p{
        color: #f02d34;
        margin-top: 0;
        margin: 1rem 0;
    }
`
const Price = styled.p`
    font-weight: 600;
    font-size: 1.5rem;
    margin: 1.9rem 0;
    color:#f7511a;
    @media screen and (max-width:37rem){
        font-size: 1rem;
    }
`

const Quantity = styled.div`
    display: flex;
    margin-top: .6rem ;
    align-items: center;
    span{
        @media screen and (max-width:37rem){
            font-size: .6rem;
        }
    }
`

const Minus = styled.span`
    border-right: 1px solid #e9e9e9;
    color: #f02d34;
    font-size: 1.37rem;
    padding: .37rem .75rem;
    cursor: pointer;
    @media screen and (max-width:37rem){
        font-size: .6rem;
    }
`
const Num = styled.span`
    border-right: 1px solid #e9e9e9;
    font-size: 1.2rem;
    padding: .37rem .75rem;
    cursor: pointer;
`
const Plus = styled.span`
    color: rgb(49, 168, 49);
    font-size: 1.37rem;
    padding: .37rem .75rem;
    cursor: pointer;
`

const QuantityDesc = styled.p`
    border: 1px solid gray;
    padding: .37rem;
`
const Buttons = styled.div`
    display: flex;
`
const AddToCart = styled.button`
    background-color: #222;
    padding: .6rem 1.2rem;
    border: 1px solid #222 ;
    margin-top: 2.5rem;
    font-size: 1.1rem;
    font-weight: 500;
    color: #fff;
    cursor: pointer;
    width: 12.5rem;
    transform: scale(1,1);
    transition: transform 0.5s ease;
    &:hover{
        transform:scale(1.1,1.1)
    }
    @media screen and (max-width:64rem){
        width: 9rem;
    }
    @media screen and (max-width:37rem){
        width: 4rem;
        height: 2rem;
        font-size: .5rem;
        padding:0;
    }
`
const BuyNow = styled.button`
    width: 12.5rem;
    padding: .6rem 1.2rem;
    background-color: #f7511a;
    color: white;
    border: none;
    margin-top: 2.5rem;
    margin-left: .6rem;
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;
    transform: scale(1,1);
    transition: transform 0.5s ease;

    &:hover{
        transform:scale(1.1)
    }
    @media screen and (max-width:64rem){
        width: 9rem;
    }
    @media screen and (max-width:37rem){
        width: 4rem;
        height: 2rem;
        font-size: .5rem;
        padding:0;
    }
`
const MaylikeProductsWrapper = styled.div`
    margin-top: 7.5rem;

    h2{
        text-align: center;
        margin: 3rem;
        color: #222;
        font-size: 1.8rem;
    }
`
const MarqueeAni = keyframes`
    {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
    } 
`
const MaylikeProductsContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1.2rem;
    position: absolute;
        white-space: nowrap;
        will-change: transform;
        animation: ${MarqueeAni} 15s linear infinite;
        width: 180%;

        @media screen and (max-width:64rem){
            animation: ${MarqueeAni} 30s linear infinite;
            width: 550%;
        }
        &:hover{
            animation-play-state: paused;
        }
`
const Marquee = styled.div`
    position: relative;
    height: 25rem;
    width: 100%;
    overflow-x: hidden;
`


const ProductDetails = ({product,products}) => {
    //구조 분해 할당
    const {image,name,details,price} = product;
    const [index,setIndex] = useState(0);
    const {decQty , incQty , qty , onAdd , setShowCart} = useStateContext();
    const handleBuyNow = () =>{
        onAdd(product,qty);

        setShowCart(true);
    }
    const [limit,setLimit] = useState(50);
    const toggleEllipsis = (str,limit) =>{
        return {
            string:str.slice(0,limit),
            isShowmore: str.length > limit
        }
    };

    const onClickMore = (str) => () =>{
        setLimit(str.length);
    };
    return (
        <div>
            <ProductDetailContainer>
               <ProductLeft>
                    <ImgContainer>
                        <ProductDetailImg src={urlFor(image && image[index])} alt={name}/>
                    </ImgContainer>
                    <SmallImgContainer>
                        {image?.map((item,i) => (<img key={i} src={urlFor(item)} alt={name} className={i === index ? "small-image selected-image" : "small-image"} onMouseEnter={()=>setIndex(i)}/>))}
                    </SmallImgContainer>
               </ProductLeft>
                <ProductDetailDesc>
                    <h1>{name}</h1>
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
                    <h4>{details}</h4>
                    <Price>{Numeral(price).format(0,0)}원</Price>
                    <Quantity>
                        <QuantityDesc>
                            <Minus onClick={decQty}>
                                <AiOutlineMinus/>
                            </Minus>
                            <Num>
                                {qty}
                            </Num>
                            <Plus onClick={incQty}>
                                <AiOutlinePlus/>
                            </Plus>
                        </QuantityDesc>
                    </Quantity>
                    <Buttons>
                        <AddToCart type="button" onClick={()=>onAdd(product,qty)}>장바구니</AddToCart>
                        <BuyNow type="button" onClick={handleBuyNow}>구매하기</BuyNow>
                    </Buttons>
                </ProductDetailDesc>
            </ProductDetailContainer>
            <MaylikeProductsWrapper>
                <h2>다른 고객이 함께 구매한 상품</h2>
                <Marquee>
                    <MaylikeProductsContainer>
                        {products.map(item=><Product key={item._id} product={item}/>)}
                    </MaylikeProductsContainer>
                </Marquee>
            </MaylikeProductsWrapper>
        </div>
    );
};

//동적라우팅 + getStaticProps를 원할 때 사용
export const getStaticPaths = async ()=>{
    const query = `*[_type == "product"]{
        slug {
            current
        }
    }`;
    const products = await client.fetch(query);
    // pre-render할 Path
    const paths = products.map((product)=>({
        params:{
            slug:product.slug.current
        }
        }));
    return {
        paths,
        fallback : 'blocking'

    };
    //빌드타임에 pre-rendering할 경로 리턴
    //fallback :  paths 이외의 경로들에 대해 추후 요청이 들어오면 만들어 줄지 말지. 만다면 404를 리턴함.
}

//서버사이드 랜더링 

//getStaticProps: 페이지 동적 경로가 있고 사용하는 경우 정의 하는데 필요함 정적으로 생성
export const getStaticProps = async ({ params:{slug}}) =>{
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'
    
    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);

    console.log(product)
 
    return {
      props:{products,product}
    }
}

export default ProductDetails;