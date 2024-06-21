import React, { useRef, useCallback,useEffect, useState } from "react";
import Header from './header'
import { useRouter } from "next/router";
import { motion, useIsPresent } from 'framer-motion'
import Footer from './footer'

export default function Content({ children }) {
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
  const checkLocation = () => {
    const menuLink = document.getElementsByClassName('menu-link');
    for (let i = 0; i < menuLink.length; i++) {
        let thisMenuLink = menuLink[i]
        if (thisMenuLink.getAttribute('data-pathname') === location.pathname) {
            thisMenuLink.classList.add('active');
        } else {
            thisMenuLink.classList.remove('active');
        }
    }
  }
const routes = [
  // { path: '/', name: 'Home', Element: '' },
  { path: '/works', name: 'Works', Element: '' },
  { path: '/about', name: 'About', Element: '' },
  { path: '/contact', name: 'Contact', Element: '' },
]
const ease = [0.37, 0, 0.63, 1];
  const waveAnimation = {
    key: "wave",
    initial: {
      y: ['240vh', '240vh'],
      // y: ['0vh', '0vh'],
    },
    animate: {
      y: ['-260vh', '-260vh', '-560vh'],
      // y: ['0vh', '0vh', '-100vh'],
    },
    exit: {
      y: ['0vh', '-260vh', '-260vh'],
      // y: ['100vh', '0vh', '0vh'],
    },
    transition: {
      duration: 2,
      // delay: 1,
      ease: ease
    },
}
  const boxAnimation = {
    key: "box",
    initial: {
        y: 0,
    },
    animate: {
        opacity: 1,
        // transition: {
        //   delay: 1
        // },
    },
    exit: {
        opacity: 1,
        // transition: {
        // },
    },
    transition: {
        delay: .5,
        duration: 0.2,
        ease: "easeOut"
    },
}
  useEffect(() => {
    checkLocation()
    let header = document.getElementById('header');
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
  return (
<>
    <motion.div
      key={router.asPath}
     {...waveAnimation}
      className="privacy-screen"
    >
    </motion.div>
    <div className="container">
      <Header routes={routes} />
      <motion.div
        key={router.asPath}
       {...boxAnimation}
      >
        { children }
        <Footer />
      </motion.div>
    </div>
  </>
  )
}