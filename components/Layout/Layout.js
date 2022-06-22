import React from 'react';
import Head from 'next/head';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import styled from 'styled-components';

const LayoutDiv = styled.div`
    padding: 10px;
    main{
        max-width: 1400px; 
        margin: auto;
        width: 100%;
    }
` 

const Layout = ({children}) => {
    return (
        <LayoutDiv>
            {/* next에서 head태그 사용  */}
            <Head>
                <title>Store</title>
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