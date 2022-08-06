import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from './components/header'
import Footer from './components/footer'
import Meta from './components/meta'
import '../styles/scss/style.scss'

const routes = [
  { path: '/', name: 'Home', Element: '' },
  // { path: '/works', name: 'Works', Element: Works },
  { path: '/about', name: 'About', Element: '' },
  { path: '/contact', name: 'Contact', Element: '' },
]
const meta = {
  title: ''
}

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? 
    <>
      <Meta {...meta} />
      <Header routes={routes} />
      <Component {...pageProps} /> 
      <Footer />
    </>
    : <div/>;
}

export default MyApp;
