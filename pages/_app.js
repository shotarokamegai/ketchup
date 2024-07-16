import React, { useState, useEffect, useRef } from "react";
import Lenis from '@studio-freight/lenis'
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { AnimatePresence } from 'framer-motion'
import { useRouter } from "next/router";
import '../styles/scss/style.scss'
import adobeLoader from "../components/adobeLoader";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const myRef = useRef(null);
  const [initial, setInitial] = useState(false);
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

    if (window.innerWidth < 750) {

    } else {
      requestAnimationFrame(raf)
    }
  }

  const initialFunc = () => {
    adobeLoader(document)
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.body.classList.add('initial');
    setTimeout(() => {
      document.body.classList.add('loaded');
    }, 10)
    initLenis();
  }

  const loadFunc = () => {
    console.log('_app.js 更新')
    console.log(router.pathname)
    // console.log(Component)
    // カスタム変数--vhの値をドキュメントのルートに設定
    document.body.classList.remove('initial');
    // document.addEventListener("mousemove", moveCursor);
    // document.addEventListener('mousewheel', stickCursor);
    // gsap.set("#cursor", {xPercent: -50, yPercent: -50});
    // var ball = document.querySelector("#cursor");
    // var pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    // var mouse = { x: pos.x, y: pos.y };
    // var speed = 0.5;
        
    // var fpms = 60 / 1000;
        
    // var xSet = gsap.quickSetter(ball, "x", "px");
    // var ySet = gsap.quickSetter(ball, "y", "px");
        
    // window.addEventListener("mousemove", e => {    
    //   mouse.x = e.x;
    //   mouse.y = e.y;  
    // });

  }

  useEffect(() => {
    if (!initial) {
      setInitial(true)
      initialFunc();
      console.log('hogehoge initial')
    } else {
      loadFunc();
      console.log('hogehoge maikai')
    }
  }, [router.pathname])
  return(
    <>
      <div id="cursor" ref={myRef}></div>
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
