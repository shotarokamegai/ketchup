import React, { useState, useEffect, useRef } from "react";
import Head from 'next/head'
import Script from 'next/script'
import fetch from 'node-fetch'
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import List from '../components/list'
import WorkTogether from '../components/work-together'
import Arrow from '../components/svg/arrow'
import Logo from '../components/svg/logo'
import axios from "axios"
import Content from '../components/content'
import styles from '../styles/Home.module.css'
import { motion, useScroll, useSpring } from "framer-motion";

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

// function returnClassName (i) {
//   let className = '';
//   switch(i) {
//       case 0:
//           className = 'box1'
//           break
//       case 1:
//           className = 'box2'
//           break
//       case 2:
//           className = 'box3'
//           break
//       case 3:
//           className = 'box4'
//           break
//       default:
//           className = ''
//           break
//   }
//   return className;
// }

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
  const showList = () => {
    // setTimeout(() => {
    // }, 1000);
    // let list = document.getElementsByClassName('hide');

    // for (let i = 0; i < list.length; i++) {
    //   let thisList = list[i];
    //   thisList.classList.remove('hide');
    // }
  }
  const setList = () => {
    console.log('setList');
    console.log(posts);
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
  const setAnimation = () => {
    const parallax = document.getElementsByClassName('parallax');
    gsap.to('#top-logo', {
      scale: () => `1.5`,
      alpha: () => `0`,
      // ease: "power1.out",
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
      gsap.to(elm, {
        y: () => `${-window.innerWidth*.1}`,
        // ease: "power1.out",
        scrollTrigger: {
          trigger: '.container',
          start: `${start}`, 
          end: `${end}`,
          scrub: .5,
          invalidateOnRefresh: true
        }
      });
    }
    // ScrollTrigger.create({
    //   pin: true, //トリガー要素を固定する
    //   trigger: ".container",
    //   startTrigger: ".slogan",
    //   start: "top top",
    //   endTrigger: ".slogan",
    //   end:`top top-=${window.innerHeight}`,
    //  // サイドメニューの高さ125px+start位置の50px=1７５px
    //   markers: true,
    // });
    // gsap.to('.slogan', {
    //   y: () => `${window.innerWidth*.486111111111}`,
    //   // ease: "power1.out",
    //   scrollTrigger: {
    //     pin: true,
    //     markers: true,
    //     trigger: '.container',
    //     start: `top top`, 
    //     end: `top top+=${window.innerHeight}`,
    //     scrub: .5,
    //     invalidateOnRefresh: true
    //   }
    // });
    // ScrollTrigger.create({
    //     trigger: ".container",
    //     start: "0",
    //     end: `${window.innerHeight}`,
    //     scrub: .5,
    //     invalidateOnRefresh: true,
    //     // markers: true
    // });
  }
  // const setAnimation = () => {
  //   let animation1 = gsap.timeline();
  //   let slogan1 = gsap.timeline();
  //   let slogan2 = gsap.timeline();
  //   let slogan3 = gsap.timeline();
  //   let slogan4 = gsap.timeline();
  //   let sloganScrub = .5;
  //   let opacity = .5;
  //   let y = -100;

  //   if (window.innerWidth < 750) {
  //     opacity = opacity*.5
  //     y = y*.5
  //   }

  //   ScrollTrigger.create({
  //       animation: animation1,
  //       trigger: ".container",
  //       start: "0",
  //       end: "8%",
  //       scrub: .5,
  //       invalidateOnRefresh: true,
  //       // markers: true
  //   });
  //   ScrollTrigger.create({
  //       animation: slogan1,
  //       trigger: ".container",
  //       start: "0",
  //       end: "5%",
  //       scrub: sloganScrub,
  //       invalidateOnRefresh: true,
  //       // markers: true
  //   });
  //   ScrollTrigger.create({
  //       animation: slogan2,
  //       trigger: ".container",
  //       start: "1%",
  //       end: "6%",
  //       scrub: sloganScrub - .1,
  //       invalidateOnRefresh: true,
  //       // markers: true
  //   });
  //   ScrollTrigger.create({
  //       animation: slogan3,
  //       trigger: ".container",
  //       start: "2%",
  //       end: "7%",
  //       scrub: sloganScrub - .2,
  //       invalidateOnRefresh: true,
  //       // markers: true
  //   });
  //   ScrollTrigger.create({
  //       animation: slogan4,
  //       trigger: ".container",
  //       start: "3%",
  //       end: "8%",
  //       scrub: sloganScrub - .3,
  //       invalidateOnRefresh: true,
  //       // markers: true
  //   });
  //   animation1.to("#top-logo", {
  //     y: y,opacity: opacity
  //   },0)
  //   slogan1.to(".slogan1", {
  //     y: y,opacity: opacity
  //   },0)
  //   slogan2.to(".slogan2", {
  //     y: y,opacity: opacity
  //   },0)
  //   slogan3.to(".slogan3", {
  //     y: y,opacity: opacity
  //   },0)
  //   slogan4.to(".slogan4", {
  //     y: y,opacity: opacity
  //   },0)
  // }
  let i = 0

  console.log('here')

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
  useEffect(() => {
    //TOP用アニメーション
    const loadFunc = () => {
      ScrollTrigger.refresh()
      setAnimation();
      showList();
    }

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
      <motion.div className="progress-bar" style={{ scaleX }} />
        <main id="home" className="main_">
          <section id="top">
              <div className="ruler">
                  <h1 id="top-logo" className="logo fixed fade" data-start="0" data-end="10%" ref={logoRef}>
                  {/* <h1 id="top-logo" className="logo absolute parallax" data-start="0" data-end="10%" ref={logoRef}> */}
                    <Logo />
                  </h1>
                  <div className="est red flex flex-end absolute parallax" data-start="0%" data-end="15%">
                    <span className="roc-grotesk">EST.</span>
                    <span className="borax italic">2022</span>
                  </div>
                  <div className="mix-text red vertical absolute scroll-trigger parallax" data-start="0%" data-end="25%" data-target="works">
                    <div className="mix-text__inner">
                      <span className="roc-grotesk-wide">SCROLL</span>
                      <span className="borax italic">Down</span>
                      <span className="triangle flex">
                        <span></span>
                        <span></span>
                        <span></span>
                      </span>
                    </div>
                  </div>
                  <h2 className="slogan borax red">
                  Add a bit of flavoring to those contents,<br/>and deliver them in an even better thing.
                  </h2>
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
                  <div className={`btn btn-full ${(maxPage > page) ? '' : 'none'}`} onClick={GetDataFromWp} id="load-more">
                    <div className="section-line top absolute bg-red"></div>
                    <div className="section-line bottom absolute bg-red"></div>
                    <div className="cover left">
                      <div className="cover__inner bg-red"></div>
                    </div>
                    <div className="cover right">
                      <div className="cover__inner bg-red"></div>
                    </div>
                    <div className="mix-text red">
                      <div className="mix-text__inner">
                        <span className="roc-grotesk-wide">MORE</span>
                        <span className="borax italic">Works</span>
                        <span className="icon">
                          <Arrow color="#c8102e" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </section>
          <WorkTogether />
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