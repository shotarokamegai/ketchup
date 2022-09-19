import React, { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { AnimatePresence } from 'framer-motion'
import { useRouter } from "next/router";
// import Header from '../components/header'
import '../styles/scss/style.scss'
import adobeLoader from "../components/adobeLoader";

const routes = [
  { path: '/', name: 'Home', Element: '' },
  // { path: '/works', name: 'Works', Element: Works },
  { path: '/about', name: 'About', Element: '' },
  { path: '/contact', name: 'Contact', Element: '' },
]

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pathname = router.asPath;

  useEffect(() => {
    adobeLoader(document)
    let vh = window.innerHeight * 0.01;
    // カスタム変数--vhの値をドキュメントのルートに設定
    document.body.classList.add('loaded');
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, [])
  return(
    <>
      {/* <Header routes={routes} /> */}
      <AnimatePresence
        initial={false}
        exitBeforeEnter
        onExitComplete={() => {
          ScrollTrigger.refresh()
          window.scrollTo(0, 0)
        }}
      >
        {Component &&
          <Component key={router.asPath} {...pageProps} /> 
        }
      </AnimatePresence>
    </>
  )
}

export default MyApp;
