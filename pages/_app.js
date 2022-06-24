import React from 'react';
import {Layout} from "../components"
import { StateContext } from '../context/StateContext';
import { Toaster } from 'react-hot-toast';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset};
    body{
        padding: 0;
        margin: 0;
        font-family: 'Noto Sans KR', sans-serif;
    };
`

function MyApp({ Component, pageProps }) {
  return(
      <StateContext>
        <GlobalStyle/>
        <Layout>
          <Toaster/>
          <Component {...pageProps} />
        </Layout>
      </StateContext>
  )
}

export default MyApp
