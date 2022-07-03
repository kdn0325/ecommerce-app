import React, { useEffect, useMemo, useRef, useState } from 'react';
import { client } from '../lib/client';
import { Product ,FooterBanner,MainBanner} from '../components';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { MdExpandMore } from "react-icons/md";

SwiperCore.use([Navigation, Pagination, Autoplay])


const ProductsBanner = styled.div`
  width:100%;
    .swiper .swiper-pagination-bullet {
      background-color: #fff;
      margin: 0 .6rem;
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
      @media screen and (max-width:64rem){
        display: none;
      }
    }
    .swiper-button-prev {
      left: 3rem;
    }
    .swiper-button-next {
      right: 3rem;
    }
    
`
const ProductsHeader = styled.div`
    text-align: center;
    margin: 2.5rem 0;
    color: #222;
    h2{
      font-size: 2.5rem;
      font-weight: 800;
      margin:2.5rem 0;
      @media screen and (max-width:37rem){
        font-size: 1.5rem;
      }
    }

    p{
      font-size: 1rem;
      font-weight: 200;
      @media screen and (max-width:37rem){
        font-size: .8rem;
      }
    }
`
const ProductsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 1.2rem;
    width: 100%;
`
const Load = styled.div`
    width:100%;
    padding: 5rem 0;
`
const LoadMore = styled.button`
    display: block;
    position: relative;
    width: 100%;
    height: 3.7rem;
    margin: 0 auto;
    border: 1px solid #222;
    box-shadow: 4px 4px #f8f8f8;
    color:#222;
    background:transparent;
    cursor: pointer;
`

const Home = ({products,bannerData}) => {
  const [load,setLoad] = useState(4);
  const [postSize] = useState(16);
  const showMoreItems = ()=>{
    setLoad((prevLoad) => prevLoad +8)
  }
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
          {products?.slice(0,load).map((product)=><Product key={product._id} product={product}/>)}
        </ProductsContainer>
        {
         postSize >= load && 
         <Load>
          <LoadMore type="button" onClick={showMoreItems}>더보기<MdExpandMore/></LoadMore>
         </Load>
        }
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