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
    margin: 60px 40px 40px;
    color: #222;

    @media screen and (max-width:800px){
        flex-wrap: wrap;
        margin: 20px;
    }
`
const ProductLeft = styled.div`
    width:50%;
`
const ProductDetailImg = styled.img`
    border-radius: 15px;
    background-color: #ebebeb;
    width: 400px;
    height: 400px;
    cursor: pointer;
    transition: .3s ease-in-out;

    @media screen and (max-width:800px){
        width: 350px;
        height: 350px;
    }
    
    &:hover{
        background-color: #f02d34;
    }
`
const ImgContainer = styled.div`

`
const SmallImgContainer = styled.div`
    display: flex;
    margin-top: 20px;

    .small-image{
        border-radius: 8px;
        background-color: #ebebeb;
        width: 70px;
        height: 70px;
        cursor: pointer;
    }
    .selected-image{
        background-color:#f02d34;
    }
`
const ProductDetailDesc = styled.div`
    width:50%;
    letter-spacing: -0.5px;
    line-height:150%;


    h1{
        font-size:32px
    }
    h4{
        margin: 30px 0;
    }
`
const Review = styled.div`
    color: #f02d34;
    margin-top: 10px;
    display: flex;
    align-items: center;
    p{
        color: #324d67;
        margin-top: 0px;
        margin: 15px 0;
    }
`
const Price = styled.p`
    font-weight: 700 ;
    font-size: 26px;
    margin: 30px 0;
    color:#f02d34;
`

const Quantity = styled.div`
    display: flex;
    margin-top: 10px ;
    align-items: center;
`

const Minus = styled.span`
    border-right: 1px solid #e9e9e9;
    color: #f02d34;
    font-size: 16px;
    padding: 6px 12px;
    cursor: pointer;
`
const Num = styled.span`
    border-right: 1px solid #e9e9e9;
    font-size: 20px;
    padding: 6px 12px;
    cursor: pointer;
`
const Plus = styled.span`
    color: rgb(49, 168, 49);
    font-size: 16px;
    padding: 6px 12px;
    cursor: pointer;
`

const QuantityDesc = styled.p`
    border: 1px solid gray;
    padding: 6px;
`
const Buttons = styled.div`
    display: flex;
`
const AddToCart = styled.button`
    background-color: #222;
    padding: 10px 20px;
    border: 1px solid #222 ;
    margin-top: 40px;
    font-size: 18px;
    font-weight: 500;
    color: #fff;
    cursor: pointer;
    width: 220px;
    transform: scale(1, 1);
    transition: transform 0.5s ease;
    &:hover{
        transform:scale(1.1,1.1)
    }
    @media screen and (max-width:800px){
        width: 150px;
    }
`
const BuyNow = styled.button`
    width: 200px;
    padding: 10px 20px;
    background-color: #f7511a;
    color: white;
    border: none;
    margin-top: 40px;
    margin-left: 10px;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    transform: scale(1, 1);
    transition: transform 0.5s ease;

    @media screen and (max-width:800px){
        width: 150px;
    }

    &:hover{
        transform:scale(1.1,1.1)
    }
`
const MaylikeProductsWrapper = styled.div`
    margin-top: 120px;

    h2{
        text-align: center;
        margin: 50px;
        color: #324d67;
        font-size: 28px;
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
    margin-top: 20px;
    position: absolute;
        white-space: nowrap;
        will-change: transform;
        animation: ${MarqueeAni} 15s linear infinite;
        width: 180%;

        @media screen and (max-width:800px){
            animation: ${MarqueeAni} 10s linear infinite;
            width: 550%;
        }
        &:hover{
            animation-play-state: paused;
        }
`
const Marquee = styled.div`
    position: relative;
    height: 400px;
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
                    <p>{details}</p>
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