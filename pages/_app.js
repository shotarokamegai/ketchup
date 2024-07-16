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
  
  const returnY = () => {
    let y;
    if (window.innerWidth < 750) {
        y = window.innerWidth * -.7;
    } else {
        y = window.innerWidth * -.297222;
    }
    return y
  }
  const aboutSetAnimation = () => {
    gsap.to('#lamp', {
        y: () => returnY(),
        scrollTrigger: {
          trigger: '.container',
          start: `0`, 
          end: `20%`,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    gsap.to('#bg', {
        alpha: () => `1`,
        scrollTrigger: {
          trigger: '.container',
          start: `10%`, 
          end: `35%`,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    gsap.to('#light', {
        alpha: () => `1`,
        scrollTrigger: {
          trigger: '.container',
          start: `25%`, 
          end: `30%`,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    gsap.to('#team', {
        y: () => `0`,
        alpha: () => `1`,
        scrollTrigger: {
          trigger: '.container',
          start: `30%`, 
          end: `35%`,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    gsap.to('#container', {
        scrollTrigger: {
          trigger: '.container',
          start: `0`, 
          end: `40%`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true
        }
      });
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
    document.body.classList.remove('initial');
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
    if (router.pathname.match(/about/)) {
      aboutSetAnimation()
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
