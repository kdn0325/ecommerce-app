import React from 'react';
import { client } from '../lib/client';
import { Product ,FooterBanner,MainBanner} from '../components';
import styled from 'styled-components';

const ProductsHeader = styled.div`
    text-align: center;
    margin: 40px 0px;
    color: #324d67;
    h2{
      font-size: 40px;
      font-weight: 800;
    }

    p{
      font-size: 16px;
      font-weight: 200;
    }
`
const ProductsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
    width: 100%;
`

const Home = ({products,bannerData}) => {
  return (  
    <>
      <MainBanner mainBanner={bannerData.length && bannerData[0]}/>
      <ProductsHeader>
        <h2>스토어. 좋아하는 제품을 구입하는 가장 좋은 방법.</h2>
        <p>최신 제품. 따끈따끈한 신제품 이야기.</p>
      </ProductsHeader>
      <ProductsContainer>
        {products?.map((product)=><Product key={product._id} product={product}/>)}
      </ProductsContainer>
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