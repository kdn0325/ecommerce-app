import React, { useState } from 'react';
import { client ,urlFor } from '../../lib/client';
import { AiOutlineMinus , AiOutlinePlus , AiFillStar , AiOutlineStar } from 'react-icons/ai';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';
import Numeral from "numeral"


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
            <div className="product-detail-container">
               <div>
                    <div className="image-container">
                        <img className="product-detail-image" src={urlFor(image && image[index])}/>
                    </div>
                    <div className="small-image-container">
                        {image?.map((item,i) => (<img src={urlFor(item)} className={i === index ? "small-image selected-image" : "small-image"} onMouseEnter={()=>setIndex(i)}/>))}
                    </div>
               </div>
                <div className="product-detail-desc">
                    <h1>{name}</h1>
                    <div className="reviews">
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
                    </div>
                    <h4>상세설명 : </h4>
                    <p>{details}</p>
                    <p className="price">{Numeral(price).format(0,0)}원</p>
                    <div className="quantity">
                        <h3>수량:</h3>
                        <p className="quantity-desc">
                            <span className="minus" onClick={decQty}>
                                <AiOutlineMinus/>
                            </span>
                            <span className="num" onClick="">
                                {qty}
                            </span>
                            <span className="plus" onClick={incQty}>
                                <AiOutlinePlus/>
                            </span>
                        </p>
                    </div>
                    <div className="buttons">
                        <button type="button" className="add-to-cart" onClick={()=>onAdd(product,qty)}>장바구니에 담기</button>
                        <button type="button" className="buy-now" onClick={handleBuyNow}>구매하기</button>
                    </div>
                </div>
            </div>
            <div className="maylike-products-wrapper">
                <h2>다른 고객이 함께 구매한 상품</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {products.map(item=><Product key={item._id} product={item}/>)}
                    </div>
                </div>
            </div>
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