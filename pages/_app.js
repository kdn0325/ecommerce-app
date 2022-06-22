import React from 'react';
import {Layout} from "../components"
import '../styles/globals.css'
import { StateContext } from '../context/StateContext';
import { Toaster } from 'react-hot-toast';
import GlobalStyle from '../styles/Globalstyle';

function MyApp({ Component, pageProps }) {
  return(
    <StateContext>
        <Layout>
          <GlobalStyle/>
          <Toaster/>
          <Component {...pageProps} />
        </Layout>
      </StateContext>
  )
}

export default MyApp
