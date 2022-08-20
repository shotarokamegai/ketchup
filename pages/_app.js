import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from '../components/header'
import AnimatedPage from '../components/animatedPage';
import '../styles/scss/style.scss'

const routes = [
  { path: '/', name: 'Home', Element: '' },
  // { path: '/works', name: 'Works', Element: Works },
  { path: '/about', name: 'About', Element: '' },
  { path: '/contact', name: 'Contact', Element: '' },
]

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
  }, [])
  return(
    <>
      <Header routes={routes} />
      <AnimatedPage>
        <Component {...pageProps} /> 
      </AnimatedPage>
    </>
  )
}

export default MyApp;
