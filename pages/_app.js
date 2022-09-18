import React, { useCallback, useEffect, useRef } from "react";
import { AnimatePresence } from 'framer-motion'
import { useRouter } from "next/router";
import Header from '../components/header'
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
  const isRunning = useRef(false) // スクロール多発防止用フラグ
  const isScrollToggle = useCallback(() => {
    let header = document.getElementById('header');
    if (isRunning.current) return
    isRunning.current = true
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    requestAnimationFrame(() => {
      if (scrollTop > window.innerHeight) {
          header.classList.remove('hide')
      } else {
          header.classList.add('hide')
      }
      isRunning.current = false
    })
  }, [])

  useEffect(() => {
    adobeLoader(document)
    let header = document.getElementById('header');
    let vh = window.innerHeight * 0.01;
    // カスタム変数--vhの値をドキュメントのルートに設定
    document.body.classList.add('loaded');
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    if (header) {
        header.classList.remove('show')
        if (pathname === '/') {
            header.classList.add('hide')
            document.addEventListener('scroll', isScrollToggle, { passive: true })
            return () => {
              document.removeEventListener('scroll', isScrollToggle, { passive: true })
            }
        } else {
            header.classList.remove('hide')
        }
    }
  }, [])
  return(
    <>
      <Header routes={routes} />
      <AnimatePresence
        initial={false}
        exitBeforeEnter
        // onExitComplete={() => {
          // window.scrollTo(0, 0)
        // }}
      >
        {Component &&
          <Component key={router.asPath} {...pageProps} /> 
        }
      </AnimatePresence>
    </>
  )
}

export default MyApp;
