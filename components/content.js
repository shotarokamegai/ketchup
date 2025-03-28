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
// const ease = [0.37, 0, 0.63, 1];
const waveEase = [0, 0, 0, 0];
const gifEase = [.25,.1,.25,1];
const waveAnimation = {
  key: "wave",
  initial: {
    y: ['150vh', '150vh','150vh', '150vh'],
    // y: ['0vh', '0vh'],
  },
  animate: {
    // y: ['0vh', '0vh','0vh', '0vh'],
    y: ['0vh', '0vh','-200vh', '-200vh'],
    // y: ['-20vw', '-20vw','-180vw', '-180vw'],
    // y: ['0vh', '0vh', '-100vh']
  },
  exit: {
    y: ['150vh', '150vh','0vh', '0vh'],
    // y: ['140vw', '140vw','-20vw', '-20vw'],
    // y: ['100vh', '0vh', '0vh'],
  },
  transition: {
    duration: 1.5,
    // delay: -.5,
    ease: waveEase
  },
}
const gifAnimation = {
  key: "gif",
  initial: {
    scale: [1, 1],
    x: ["-50%","-50%","-50%",],
    y: ["-50%","-50%","-50%",]
  },
  animate: {
    scale: [1, 1, 1, 0, 0, 0, 0],
    x: ["-50%","-50%","-50%",],
    y: ["-50%","-50%","-50%",]
  },
  exit: {
    scale: [0, 0, 0, 0, 1, 1, 1],
    x: ["-50%","-50%","-50%",],
    y: ["-50%","-50%","-50%",]
  },
  transition: {
    duration: 1.5,
    ease: gifEase
    // ease: gifEase
    // ease: "easeOut"
  },
}
const onStart = (e) => {
  const privacyScreen = document.getElementsByClassName('privacy-screen')[0];
  if (e.y[0] === '0vh') {
    privacyScreen.classList.remove('start');
    privacyScreen.classList.add('end');
  } else {
    privacyScreen.classList.add('start');
    privacyScreen.classList.remove('end');
  }
  console.log("Animation started")
}
const onComplete = (e) => {
  console.log("Animation completed")
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
      onAnimationStart={onStart}
      onAnimationComplete={onComplete}
     {...waveAnimation}
      className="privacy-screen end"
    >
    </motion.div>
    <motion.div
      key={router.asPath}
     {...gifAnimation}
      id="gif"
    >
      <img src="/img/common/ktcp-bottle.gif" />
    </motion.div>
    <Header routes={routes} />
    <div className="container">
        { children }
        <Footer />
    </div>
  </>
  )
}