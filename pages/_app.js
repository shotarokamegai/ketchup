import React, { useCallback, useEffect, useRef } from "react";
import Lenis from '@studio-freight/lenis'
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { AnimatePresence } from 'framer-motion'
import { useRouter } from "next/router";
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
  // const pathname = router.asPath;

  const initLenis = () => {
    const lenis = new Lenis()


    lenis.on('scroll', (e) => {
      // console.log(e)
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }

  useEffect(() => {
    const loadFunc = () => {
      console.log('_app.js 更新')
      console.log(Component)
      adobeLoader(document)
      let vh = window.innerHeight * 0.01;
      // カスタム変数--vhの値をドキュメントのルートに設定
      document.body.classList.add('loaded');
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      initLenis();
    }
    loadFunc();
  })
  return(
    <>
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
