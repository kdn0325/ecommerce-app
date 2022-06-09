import React from 'react';
import { async } from 'regenerator-runtime';
import { client ,urlFor } from '../../lib/client';
import { AiOutlineMinus , AiOutlinePlus , AiFillStar , AiOutlineStar } from 'react-icons/ai';
import { Product } from '../../components';

const ProductDetails = ({product,products}) => {
    //구조 분해 할당
    const {image,name,details,price} = product;
    return (
        <div>
            <div className="product-detail-container">
                <div className="image-container">
                    <img src={urlFor(image && image[0])}/>
                </div>
                {/* <div className="small-image-container">
                    {image?.map((item,i) => (<img src={urlFor(item)} className="" onMouseEnter=""/>))}
                </div> */}
                <div className="product-details-desc">
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
                    <h4>Details : </h4>
                    <p>{details}</p>
                    <p className="price">${price}</p>
                    <div className="quantity">
                        <h3>Quantity:</h3>
                        <p className="quantity-desc">
                            <span className="minus" onClick="">
                                <AiOutlineMinus/>
                            </span>
                            <span className="minus" onClick="">
                                0
                            </span>
                            <span className="minus" onClick="">
                                <AiOutlinePlus/>
                            </span>
                        </p>
                    </div>
                    <div className="buttons">
                        <button type="button" className="add-to-cart" onClick="">Add to Cart</button>
                        <button type="button" className="buy-now" onClick="">Buy Now</button>
                    </div>
                </div>
            </div>
            
            <div className="maylike-products-wrapper">
                <h2>You may also like</h2>
                <div className="marquee">
                    <div className="maylike-product-container track">
                        {products.map(item=><Product key={item._id} product={item}/>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const getStaticPaths = async ()=>{
    const query = `*[_type == "product"]{
        slug {
            current
        }
    }`
    const products = await client.fetch(query);
    const paths = products.map((product)=>({params:{slug:product.slug.current}}))
    return {
        paths,
        fallback : 'blocking'
    }
}

//서버사이드 랜더링 

//getStaticProps: 페이지 동적 경로가 있고 사용하는 경우 정의 하는데 필요함 정적으로 생성
export const getStaticProps = async ({params:{slug}}) =>{
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`
    const productQuery = '*[_type == "product"]'
    const product = await client.fetch(query);
    const products = await client.fetch(productQuery);
    console.log(product)

    return {
      props:{products,product}
    }
}

export default ProductDetails;