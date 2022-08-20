import React, { useState } from "react";
import Head from 'next/head'
import Script from 'next/script'
import fetch from 'node-fetch'

// import { NextSeo } from 'next-seo'
import Image from 'next/image'
import List from '../components/list'
import Arrow from '../components/svg/arrow'
import useSWR from 'swr'
import axios from "axios"
import Content from '../components/content'
import fetcher from '../components/fetcher'
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
  const { scrollYProgress } = useScroll();
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


  return(
    <>
    <Head>
      <title>Ketchup Inc.</title>
      <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}`} />
      <meta property="og:type" content="website" />
      <meta property="description" content="Ketchup Inc." />
      <meta property="og:title" content="Ketchup Inc." />
      <meta property="og:description" content="Ketchup Inc." />
      <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/ogp.jpg`} />
      <meta name="twitter:card" content="summary_large_image"/>
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
                      <h1 className="logo">
                          <Image layout='fill' objectFit="contain" src="/img/common/logo.svg" alt="Ketchup" />
                      </h1>
                  </div>
                  <div>
                      <h2 className="slogan roc">
                          We create design <br/>+ development<br/> to keep balance<br/> around ketchup. 
                          {/* We know the internet and people in equal measure.  */}
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
                  {maxPage > page && <div className="btn flex flex-sp space-between align-center" onClick={GetDataFromWp}>
                    <span className="text rocextrawideLight">LOAD MORE</span>
                    <Arrow className="white" />
                  </div>}
              </div>
          </section>
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