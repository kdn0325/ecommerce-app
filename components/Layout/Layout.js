import React from 'react';
import Head from 'next/head';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import styled from 'styled-components';

const LayoutDiv = styled.div`
    max-width: 80rem;
    margin: auto;
    padding:0 5rem;

    @media screen and (max-width:37rem){
        max-width: 100%;
        padding:0 .2rem;
    }   
    header{
        width:100%;
        margin: auto;
        padding:1rem 0;

    @media screen and (max-width:64rem){

        }   
    }
    @media screen and (max-width:37rem){
        width:100%;
        
    }
    main{
        
        margin: auto;
    }
` 

const Layout = ({children}) => {
    return (
        <LayoutDiv>
            {/* next에서 head태그 사용  */}
            <Head>
                <title>Abel Shop</title>
            </Head>
            <header>
                <Navbar/>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <Footer/>
            </footer>
        </LayoutDiv>
    );
};

export default Layout;