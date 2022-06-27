import React from 'react';
import { client } from '../lib/client';
import { Product ,FooterBanner,MainBanner} from '../components';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

SwiperCore.use([Navigation, Pagination, Autoplay])


const ProductsBanner = styled.div`
    .swiper .swiper-pagination-bullet {
      background-color: #fff;
      margin: 0 10px;
    }
    .swiper-button-prev,
    .swiper-button-next {
      z-index: 1;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff !important;
      fill: black !important;
      stroke: black !important;
    }
    .swiper-button-prev {
      left: 50px;
    }
    .swiper-button-next {
      right: 50px;
    }
`
const ProductsHeader = styled.div`
    text-align: center;
    margin: 40px 0px;
    color: #222;
    h2{
      font-size: 40px;
      font-weight: 800;
      margin:40px 0;
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
    margin-top: 20px;
    width: 100%;
`

const Home = ({products,bannerData}) => {
  return (  
    <>
      <ProductsBanner>
        <Swiper spaceBetween={50} slidesPerView={1} navigation={true} pagination={{ clickable: true }} autoplay={{ delay: 4000 }} loop={true}>
              {bannerData?.map((mainBanner,i)=>(
                  <SwiperSlide key={i}>
                    <MainBanner mainBanner={mainBanner}/>
                  </SwiperSlide>
                  ))
              }
        </Swiper>
      </ProductsBanner>
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