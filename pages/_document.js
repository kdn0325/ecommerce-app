import React from "react";
import Document, { Main, NextScript, Head } from "next/document"; //next의 html과 나머지 기타 기능들을 넣어주는 Main과 NextScript
import Helmet from "react-helmet"; // head태그에 넣을 정보를 jsx로 작성할 수 있게 도와준다.
import { ServerStyleSheet } from "styled-components";
// _document.js는 index.html을 꾸며주는거다라고 생각하면 된다.
// class형으로 밖에 못 하는게 조금 아쉽다.
// ServerStyleSheet을 사용하여 서버사이드렌더링을 하게 할 수 있다.

class MyDocument extends Document {
  static async getInitialProps(context) {
    const initialProps = await Document.getInitialProps(context)
    const sheet = new ServerStyleSheet(); // 서버사이드 렌더링 할 수 있게함.
    const page = context.renderPage(App => props =>
      sheet.collectStyles(
        <>
          <App {...props} />
        </>
      )
    );
    const styleTags = sheet.getStyleElement();
    return {...initialProps, ...page, helmet: Helmet.renderStatic(), styleTags};
  }
  render() {
    const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet; // helmet으로 부터 받아온다.
    const htmlAttrs = htmlAttributes.toComponent();
    const bodyAttrs = bodyAttributes.toComponent();
    return (
      //html이랑 head, body 부분에 각각 props들을 넣어준다
      <html {...htmlAttrs}> 
        <Head> 
          {this.props.styleTags}
          {Object.values(helmet).map(el => el.toComponent())} 
        </Head>
        <body {...bodyAttrs}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;