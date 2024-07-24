import React, { useState, useEffect, useRef } from "react";
import Head from 'next/head'
import Script from 'next/script'
import fetch from 'node-fetch'
import Link from 'next/link'
import { gsap,  Power3  } from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import List from '../components/list'
import WorkTogether from '../components/work-together'
import Arrow from '../components/svg/arrow'
import Slogan from '../components/svg/slogan'
import SloganSp from '../components/svg/slogan_sp'
import Logo from '../components/svg/logo'
import axios from "axios"
import Content from '../components/content'
import styles from '../styles/Home.module.css'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

function Home(props) {
  gsap.registerPlugin(ScrollTrigger)
  const logoRef = useRef();
  const scrollRef = useRef();
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState(props.posts)
  const [maxPage, setMaxPage] = useState(0);
  const setList = () => {
    return posts.map((item, index) => {
        let datum = {
            thisCategories: ''
        };
        datum.last = false;
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
        datum.className = ` hide`;
        if (i === 3) {
            i = 0;
        } else {
            i++;
        }
        console.log(posts.length);
        if (index === posts.length-1) {
          console.log(`index${index}`);
          console.log('last');
        }
        return(
          <List key={index} {...datum} />
        )
    })
  }
  const toScroll = () => {
    console.log(scrollRef)
    const target = document.getElementById(scrollRef.current.getAttribute('data-target'));
    let elemRect = target.getBoundingClientRect();
    let scrollY = window.scrollY || window.pageYOffset;
    let top = elemRect.top + scrollY;

    gsap.to([document.body, document.documentElement], 1, { scrollTop: top, ease: Power3.easeInOut });
  }
  const setAnimation = () => {
    const parallax = document.getElementsByClassName('parallax');
    gsap.to('#top-logo', {
      y: () => `-50%`,
      scrollTrigger: {
        trigger: '.container',
        start: `0`, 
        end: `5%`,
        scrub: .5,
        invalidateOnRefresh: true
      }
    });
    for (let i = 0; i < parallax.length; i++) {
      const elm = parallax[i];
      const start = elm.getAttribute('data-start');
      const end = elm.getAttribute('data-end');
      const amount = parseFloat(elm.getAttribute('data-amount'));
      gsap.to(elm, {
        y: () => `${-window.innerWidth*amount}`,
        scrollTrigger: {
          trigger: '.container',
          start: `${start}`, 
          end: `${end}`,
          scrub: .5,
          invalidateOnRefresh: true
        }
      });
    }
  }
  let i = 0

  const GetDataFromWp = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp-json/wp/v2/posts?_embed&page=${page+1}`);
    setPage((page) => page+1)
    setPosts((posts) => posts.concat(res.data))
  }
  const GetPageNum = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp-json/wp/v2/posts`);
    const num = Number(res.headers['x-wp-totalpages']);
    console.log(`getPageNum ${num}`);
    setMaxPage(num)
  }
  const loadFunc = () => {
    ScrollTrigger.refresh(true)
    setAnimation();
  }

  useEffect(() => {
    //TOP用アニメーション
    loadFunc();
    GetPageNum();
  // }, []);
  }, [posts]);
  return(
    <>
    <Head>
      <title>Ketchup Inc. | 株式会社 Ketchup</title>
      <meta name="description" content="Add a bit of flavoring to those contents, and deliver them in an even better thing. | デザインから幅広いWebサイト制作まで、一貫した企画制作・運用。" />
      <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}`} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Ketchup Inc. | 株式会社 Ketchup" />
      <meta property="og:description" content="Add a bit of flavoring to those contents, and deliver them in an even better thing. | デザインから幅広いWebサイト制作まで、一貫した企画制作・運用。" />
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
        <main id="home" className="main_">
          <section id="top">
              <div className="ruler">
                <div className="vh">
                  <div className="logo absolute">
                  <h1 id="top-logo">
                    <div className="parallax" data-start="0" data-end="10%" ref={logoRef} data-amount=".15">
                      <Logo color="bg-red fill" />
                    </div>
                  </h1>
                  </div>
                  <div className="mix-text red vertical absolute scroll-trigger parallax" data-start="0%" data-end="25%" data-amount=".1" data-target="works" ref={scrollRef} onClick={toScroll}>
                    <div className="mix-text__inner">
                      <span className="roc-grotesk-wide">SCROLL</span>
                      <span className="borax italic">Down</span>
                      <span className="triangle flex flex-sp">
                        <span></span>
                        <span></span>
                        <span></span>
                      </span>
                    </div>
                  </div>
                  <div className="est absolute red flex flex-end parallax" data-start="0%" data-end="15%" data-amount=".11">
                    <span className="roc-grotesk">EST.</span>
                    <span className="borax italic">2022</span>
                  </div>
                  <h2 className="slogan borax red absolute parallax" data-start="0%" data-end="20%" data-amount=".07">
                    <span className="pc">
                      <Slogan color="bg-red fill" />
                    </span>
                    <span className="sp">
                      <SloganSp color="bg-red fill" />
                    </span>
                  {/* Add a bit of flavoring to those contents,<br/>and deliver them in an even better thing. */}
                  </h2>
                </div>
              </div>
          </section>
          <section id="works" className="section">
              <div className="ruler">
                <h2 className="section-title red">
                  <span className="roc-grotesk medium">Featured</span>
                  <span className="borax italic">Works</span>
                </h2>
                <div className="section-line bg-red"></div>
                <div className="works-wrapper">
                  <ul className="flex">
                    { posts && setList() }
                  </ul>
                  <Link href="/works" scroll={false}>
                    <div className={`btn btn-full slide-parent double ${(maxPage > page) ? '' : 'none'}`}>
                      <div className="section-line top absolute bg-red"></div>
                      <div className="section-line bottom absolute bg-red"></div>
                      <div className="slide-text">
                        <div className="slide-cover">
                          <div className="slide-cover-left"></div>
                          <div className="slide-cover-right"></div>
                        </div>
                        <div className="mix-text red">
                          <div className="mix-text__inner">
                            <span className="roc-grotesk-wide">MORE</span>
                            <span className="borax italic">Works</span>
                            <span className="icon arrow">
                              <Arrow color="bg-red stroke" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
          </section>
          <WorkTogether />
        </main>
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