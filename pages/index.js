import React from 'react';
import { client } from '../lib/client';
import { Product ,FooterBanner,HeroBanner} from '../components';

const Home = ({products,bannerData}) => {
  return (  
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>
      <div className="products-heading">
        <h2>스토어. 좋아하는 제품을 구입하는 가장 좋은 방법.</h2>
        <p>최신 제품. 따끈따끈한 신제품 이야기.</p>
      </div>
      <div className="products-container">
        {products?.map((product)=><Product key={product._id} product={product}/>)}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]}/>
    </>
  );
};


//서버사이드 랜더링 

export const getServerSideProps = async () =>{
  const query = `*[_type == "product"]`
  const products = await client.fetch(query);

  const bannerQuery = `*[_type == "banner"]`
  const bannerData = await client.fetch(bannerQuery);

  return {
    props:{products,bannerData}
  }
}

export default Home;