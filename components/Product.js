import React from 'react';
import Link from "next/link";
import { urlFor } from "../lib/client";
import Numeral from "numeral"

const Product = ({product:{image,name,slug,price}}) => {
    return (
        <div>
            <Link href={`/product/${slug.current}`}>
                <div className="product-card">
                    <img src={urlFor(image && image[0])} width={250} height={250} className="product-image"/>
                    <p className="product-name">{name}</p>
                    <p className="product-price">{Numeral(price).format(0,0)}원</p>
                </div>
            </Link>
        </div>
    );
};

export default Product;