import React, { useEffect, useState } from "react";
import Head from 'next/head'
import { useRouter } from "next/router";
import Header from './components/header'
import AnimatedPage from './components/animatedPage';
import '../styles/scss/style.scss'

const routes = [
  { path: '/', name: 'Home', Element: '' },
  // { path: '/works', name: 'Works', Element: Works },
  { path: '/about', name: 'About', Element: '' },
  { path: '/contact', name: 'Contact', Element: '' },
]

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = router.pathname;

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? 
    <>
      <Head>
        <link rel="stylesheet" href="//use.typekit.net/ueg2vna.css" key="font" />
      </Head>
      <Header routes={routes} />
      <AnimatedPage>
        <Component {...pageProps} /> 
      </AnimatedPage>
    </>
    : <div/>;
}

export default MyApp;
