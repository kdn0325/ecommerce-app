import React from 'react';
import {Layout} from "../components"
import { StateContext } from '../context/StateContext';
import { Toaster } from 'react-hot-toast';
import GlobalStyle from '../styles/GlobalStyle';

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
