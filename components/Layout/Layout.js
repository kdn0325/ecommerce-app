import React from 'react';
import Head from 'next/head';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import styled from 'styled-components';

const LayoutDiv = styled.div`
     
    padding: 10px;
    header{
        max-width: 80rem;
        margin: auto;
        height:50px;
        padding:1rem 0;
    @media screen and (max-width:50rem){

        }   
    }
    main{
        max-width: 80rem;
        padding:0 5rem;
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