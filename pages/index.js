import React, { useState, useEffect, useRef } from "react";
import Head from 'next/head'
import Script from 'next/script'
import fetch from 'node-fetch'
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import List from '../components/list'
import Arrow from '../components/svg/arrow'
import Logo from '../components/svg/logo'
import axios from "axios"
import Content from '../components/content'
import styles from '../styles/Home.module.css'
import { motion, useScroll, useSpring } from "framer-motion";

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

function returnClassName (i) {
  let className = '';
  switch(i) {
      case 0:
          className = ''
          break
      case 1:
          className = 'medium'
          break
      case 2:
          className = 'large'
          break
      case 3:
          className = 'mn'
          break
      case 4:
          className = 'medium'
          break
      case 5:
          className = 'medium'
          break
      default:
          className = ''
          break
  }
  return className;
}

function Home(props) {
    gsap.registerPlugin(ScrollTrigger)
  const { scrollYProgress } = useScroll();
  const logoRef = useRef();
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState(props.posts)
  const [maxPage, setMaxPage] = useState(0);
  const scaleX = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
    });
  const meta = {
    title: '',
    description: ''
  }
  const setAnimation = () => {
    let animation1 = gsap.timeline();
    let slogan1 = gsap.timeline();
    let slogan2 = gsap.timeline();
    let slogan3 = gsap.timeline();
    let slogan4 = gsap.timeline();
    let sloganScrub = .5;
    let opacity = .5;
    let y = -100;

    if (window.innerWidth < 750) {
      opacity = opacity*.5
      y = y*.5
    }

    ScrollTrigger.create({
        animation: animation1,
        trigger: ".container",
        start: "0",
        end: "8%",
        scrub: .5,
        invalidateOnRefresh: true,
        // markers: true
    });
    ScrollTrigger.create({
        animation: slogan1,
        trigger: ".container",
        start: "0",
        end: "5%",
        scrub: sloganScrub,
        invalidateOnRefresh: true,
        // markers: true
    });
    ScrollTrigger.create({
        animation: slogan2,
        trigger: ".container",
        start: "1%",
        end: "6%",
        scrub: sloganScrub - .1,
        invalidateOnRefresh: true,
        // markers: true
    });
    ScrollTrigger.create({
        animation: slogan3,
        trigger: ".container",
        start: "2%",
        end: "7%",
        scrub: sloganScrub - .2,
        invalidateOnRefresh: true,
        // markers: true
    });
    ScrollTrigger.create({
        animation: slogan4,
        trigger: ".container",
        start: "3%",
        end: "8%",
        scrub: sloganScrub - .3,
        invalidateOnRefresh: true,
        // markers: true
    });
    animation1.to("#top-logo", {
      y: y,opacity: opacity
    },0)
    slogan1.to(".slogan1", {
      y: y,opacity: opacity
    },0)
    slogan2.to(".slogan2", {
      y: y,opacity: opacity
    },0)
    slogan3.to(".slogan3", {
      y: y,opacity: opacity
    },0)
    slogan4.to(".slogan4", {
      y: y,opacity: opacity
    },0)
  }
  let i = 0

  getPageNum()

  async function getPageNum() {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp-json/wp/v2/posts`);
    const num = Number(res.headers['x-wp-totalpages']);
    setMaxPage(num)
  }

  async function GetDataFromWp() {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp-json/wp/v2/posts?_embed&page=${page+1}`);
    setPage((page) => page+1)
    setPosts((posts) => posts.concat(res.data))
  }
  useEffect(() => {
    ScrollTrigger.refresh()
    setAnimation();
  }, []);

  return(
    <>
    <Head>
      <title>Ketchup Inc. | 株式会社 Kｅｔｃｈｕｐ</title>
      <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}`} />
      <meta property="og:type" content="website" />
      <meta property="description" content="簡単で、便利で、形を変えて、どんなものでも、Webの世界を彩るサービスを。デザインから幅広いWebサイト制作まで、一貫した企画制作・運用。" />
      <meta property="og:title" content="Ketchup Inc. | 株式会社 Kｅｔｃｈｕｐ" />
      <meta property="og:description" content="簡単で、便利で、形を変えて、どんなものでも、Webの世界を彩るサービスを。デザインから幅広いWebサイト制作まで、一貫した企画制作・運用。" />
      <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/ogp.jpg`} />
      <meta name="twitter:card" content="summary_large_image"/>
      <link rel="icon" href={`${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`} />
    </Head>
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTAG}`}
      strategy="afterInteractive"
    />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', ${parseInt(process.env.NEXT_PUBLIC_GTAG)});
      `}
    </Script>
    <div className={styles.container}>
      <Content>
      <motion.div className="progress-bar" style={{ scaleX }} />
        <main id="home" className="main_">
          <section id="top">
              <div className="ruler flex space-between">
                  <div>
                      <h1 id="top-logo" className="logo" ref={logoRef}>
                        <Logo />
                      </h1>
                  </div>
                  <div>
                      <h2 className="slogan roc">
                        <span className="slogan1">
                          Add a bit of flavoring 
                        </span>
                          <br/>
                        <span className="slogan2">to those contents, </span><br/>
                        <span className="slogan3">and deliver them </span>
                        <br/>
                        <span className="slogan4">in an even better thing.</span>
                      </h2>
                  </div>
              </div>
          </section>
          <section className="works-wrapper">
              <p className="vertical rocextrawideLight">
                  WORKS
              </p>
              <div className="inner">
                  <ul className="flex">
                    {posts && 
                      posts.map((item, index) => {
                          let datum = {
                              thisCategories: ''
                          };
                          datum.max = posts.length;
                          datum.type = 'list';
                          datum.index = index;
                          datum.item = item;
                          for (let i = 0; i < item.categories.length; i++) {
                              for (let j = 0; j < props.cats.length; j++) {
                                  if (item.categories[i] === props.cats[j].id && props.cats[j].name !== 'Works') {
                                      datum.thisCategories += ` ${props.cats[j].name} /` 
                                  }
                              }
                          }
                          datum.className = returnClassName(i);
                          if (i === 5) {
                              i = 0;
                          } else {
                              i++;
                          }
                          return(
                            <List key={index} {...datum} />
                          )
                      })}
                  </ul>
                  <div className={`btn flex flex-sp space-between align-center ${(maxPage > page) ? '' : 'none'}`} onClick={GetDataFromWp} id="load-more">
                    <span className="text rocextrawideLight">LOAD MORE</span>
                    <Arrow className="white" />
                  </div>
              </div>
          </section>
        </main>
        {/* <Footer /> */}
      </Content>
    </div>
    </>
  )
}

export async function getStaticProps() {
  const res1 = await fetch(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp-json/wp/v2/posts?_embed`)
  const res2 = await fetch(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp-json/wp/v2/categories`)
  const posts = await res1.json()
  const cats = await res2.json()
 
  return {
    props: {
      posts,
      cats
    }
  }
}

export default Home