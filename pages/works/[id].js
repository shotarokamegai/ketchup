import React, { useEffect, useState, useRef } from "react";
import Head from 'next/head'
import Script from 'next/script'
import WP from 'wpapi'
import axios from "axios"
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import { useRouter } from "next/router";
import Arrow from '../../components/svg/arrow';
import { motion, useScroll, useSpring } from "framer-motion";
// import fetcher from '../../components/fetcher'
import Content from '../../components/content'
import styles from '../../styles/Home.module.css'

// function GetDataFromWp(id) {
//   const { data, error } = useSWR([
//     `${process.env.NEXT_PUBLIC_WP_API_URL}/wp-json/wp/v2/posts/${id}?_embed`,
//     `${process.env.NEXT_PUBLIC_WP_API_URL}/wp-json/wp/v2/posts?_embed&exclude=${id}`,
//     `${process.env.NEXT_PUBLIC_WP_API_URL}/wp-json/wp/v2/categories`
//   ],
//   fetcher,
//   )
//   return {
//     data: data ? data : [],
//     isLoading: !data && !error,
//     isError: error,
//   }
// }

export default function Work(props) {
    const router = useRouter(); 
    const { id } = router.query;
    // const { data, isLoading, isError } = GetDataFromWp(id)
    
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
    });

    let i = 0

    const getCategories = (cats) => {
      let thisCategories = '';
      for (let i = 0; i < props.post.categories.length; i++) {
          for (let j = 0; j < cats.length; j++) {
              if (props.post.categories[i] === cats[j].id && cats[j].name !== 'Works') {
                thisCategories += ` ${cats[j].name} /` 
              }
          }
      }
      return(
        <p className="categories futura">
            {thisCategories.slice( 0, -1 )}
        </p>
      )
    }

    const setGallery = (imgs) => {
      let html = '';
      for (let i = 0; i < imgs.length; i++) {
        let img_ = imgs[i]['img']
        let html_ = `<div class="column ${imgs[i]['classname']}">`;
        for (let j = 0; j < img_.length; j++) {
          if (img_[j]['url'].match(/mov/)) {
            html_ += 
                `<div class="img" key=${j}>
                  <video src=${img_[j]['url']} playsInline autoPlay muted loop />
                </div>`;
          } else {
            html_ += 
                `<div class="img" key=${j}>
                  <img src=${img_[j]['url']} alt="" />
                </div>`;
          }
        }
        html += `${html_}</div>`;
      }
      return(html)
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // if (isError) return(null)
    // //ロード中
    // if (isLoading) return(null)
    return (
      <>
    <Head>
      <title>{`${props.post.title.rendered} | Ketchup Inc.`}</title>
      <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`} />
      <meta property="og:type" content="website" />
      <meta property="description" content="Ketchup Inc." />
      <meta property="og:title" content={`${props.post.title.rendered} | Ketchup Inc.`} />
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

        gtag('config', ${process.env.NEXT_PUBLIC_GTAG});
      `}
    </Script>
      <div className={styles.container}>
      <Content>
        <motion.div className="progress-bar" style={{ scaleX }} />
        <main id="work" className={`common main_ show`}>
        {/* <main id="work" className={`common main_ ${data.length !== 0 && 'show'}`}> */}
          <section id="top">
            <div className="ruler">
                <h3 className="section-title rocextrawide red">WORK</h3>
            </div>
            <p className="vertical rocextrawideLight">
              WORK
            </p>
            <div className="ruler">
                <div className="keyv-wrap">
                  <div className="img">
                    <Image layout='fill' objectFit="contain" src={props.post['_embedded']['wp:featuredmedia'][0].source_url} alt={props.post.title.rendered} />
                  </div>
                </div>
                <div className="detail flex space-between">
                  <div>
                    <h2 className="title futura bold" dangerouslySetInnerHTML={{__html: props.post.title.rendered}}></h2>
                    <p className="text" dangerouslySetInnerHTML={{__html: props.post.content.rendered}}></p>
                  </div>
                  <div>
                    <a className="flex pc align-center" href={props.post['acf']['url']} target="_blank" rel="noopener noreferrer">
                      <span className="text rocextrawide red">VIEW SITE</span>
                      <Arrow />
                    </a>
                    { getCategories(props.cats) }
                    <div className="client">
                      <p className="futura bold">Client</p>
                      <p className="futura">{props.post['acf']['client']}</p>
                    </div>
                    <a className="flex sp flex-sp align-center" href={props.post['acf']['url']} target="_blank" rel="noopener noreferrer">
                      <span className="text rocextrawide red">VIEW SITE</span>
                      <Arrow />
                    </a>
                  </div>
                </div>
                <div className="gallery" dangerouslySetInnerHTML={{__html: setGallery(props.post['acf']['images'])}}>
                </div>
            </div>
          </section>
          <section className="works-wrapper other-works-wrapper">
            <div className="ruler">
                <h3 className="section-title rocextrawide red">OTHER WORKS</h3>
            </div>
              <p className="vertical rocextrawideLight">
                OTHER WORKS
              </p>
            <div className="ruler">
              <div className="inner">
                  <ul className="flex flex-sp">
                      {props.posts.map((item, index) => {
                          let thisCategories = '';
                          for (let i = 0; i < item.categories.length; i++) {
                              for (let j = 0; j < props.cats.length; j++) {
                                  if (item.categories[i] === props.cats[j].id && props.cats[j].name !== 'Works') {
                                      thisCategories += ` ${props.cats[j].name} /` 
                                  }
                              }
                          }
                          if (index < 9) {
                            return(
                                <li key={index}>
                                    <Link href={`/works/${item.id}`}>
                                      <a>
                                        <div className="img">
                                            <Image layout='fill' objectFit="contain" src={item._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url} alt="" />
                                        </div>
                                        <div className="detail">
                                            <p className="title bold futura" dangerouslySetInnerHTML={{__html: item.title.rendered}}></p>
                                            <p className="categories futura">
                                                {thisCategories.slice( 0, -1 )}
                                            </p>
                                        </div>
                                      </a>
                                    </Link>
                                </li>
                            )
                          } else {
                            return (null)
                          }
                      })}
                  </ul>
                </div>
            </div>
          </section>
        </main>
        </Content>
      </div>
      </>
    )
}

export async function getStaticPaths() {
  const wpClient = new WP({
    endpoint: `${process.env.NEXT_PUBLIC_WP_API_URL}/wp-json`
  })
  const posts = await wpClient.posts()
  return {
      paths: posts.map(post => ({
          params: {
            id: String(post.id)
          }
      })),
      fallback: false
  }
}

export async function getStaticProps({params}) {
  const res1 = await axios.get(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp-json/wp/v2/posts/${params.id}?_embed`)
  const res2 = await axios.get(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp-json/wp/v2/categories`)
  const res3 = await axios.get(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp-json/wp/v2/posts?_embed&exclude=${params.id}`)
  const post = await res1.data
  const cats = await res2.data
  const posts = await res3.data

  return {
    props: {
      post,
      cats,
      posts
    },
  }
}
