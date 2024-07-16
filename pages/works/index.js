import React, { useState, useEffect, useRef } from "react";
import Head from 'next/head'
import Script from 'next/script'
import fetch from 'node-fetch'
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import List from '../../components/list'
import WorkTogether from '../../components/work-together'
import Arrow from '../../components/svg/arrow'
import axios from "axios"
import Content from '../../components/content'
import styles from '../../styles/Home.module.css'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

function Works(props) {
  gsap.registerPlugin(ScrollTrigger)
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState(props.posts)
  const [maxPage, setMaxPage] = useState(0);
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
        <main id="works" className="main_">
          <section id="works" className="section">
              <div className="ruler">
                <h2 className="section-title red fixed">
                  <span className="borax italic">Works</span>
                </h2>
                <div className="works-wrapper">
                  <ul className="flex">
                    { posts && setList() }
                  </ul>
                  <div className={`btn btn-full slide-parent double ${(maxPage > page) ? '' : 'none'}`} onClick={GetDataFromWp} id="load-more">
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

export default Works