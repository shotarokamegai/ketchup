import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Head from 'next/head'
import Script from 'next/script'
import axios from "axios"
import Image from 'next/image'
import List from '../../components/list'
import { useRouter } from "next/router";
import Arrow from '../../components/svg/arrow';
import { motion, useScroll, useSpring } from "framer-motion";
import Content from '../../components/content'
import styles from '../../styles/Home.module.css'

export default function Work(props) {
    gsap.registerPlugin(ScrollTrigger)
    const [load, setOnload] = useState(false);
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

    const setGallery = (images) => {
      let html = '';
      if (images) {
        for (let i = 0; i < images.length; i++) {
          let html_ = `<div class="column">`;
          let imgs = images[i]['imgs']
          for (let k = 0; k < imgs.length; k++) {
            let img = imgs[k];
              html_ += 
                  `<div class="img" key=${k}>
                    <img src=${img['img']['url']} alt="" />
                  </div>`;
            // html += `${html_}</div>`;
          }
          html += `${html_}</div>`;
        }
      }
      // setOnload(true);
      return(html)
    }

    const playVideo = () => {
      let video = document.getElementsByTagName('video')
      if (video.length !== 0) {
        for (let i = 0; i < video.length; i++) {
          video[i].play()
        }
      }
    }

    const onLoad = (e) => {
      // if (e.target.srcset) {
        // e.target.dataset.load = "done";
        ScrollTrigger.refresh();
        setOnload(true)
      // }
    };

    useEffect(() => {
      playVideo()
      onLoad();
    }, [id]);
    return (
      <>
    <Head>
      <title>{`${props.post.title.rendered.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'')} | Ketchup Inc.`}</title>
      <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`} />
      <meta property="og:type" content="website" />
      <meta property="description" content="Ketchup Inc." />
      <meta property="og:title" content={`${props.post.title.rendered.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'')} | Ketchup Inc.`} />
      <meta property="og:description" content="Ketchup Inc." />
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

        gtag('config', ${process.env.NEXT_PUBLIC_GTAG});
      `}
    </Script>
      <div className={styles.container}>
      <Content>
        <motion.div className="progress-bar" style={{ scaleX }} />
        <main id="work" className={`common main_`}>
          <section id="top">
            <div className="ruler">
                <h3 className="section-title rocextrawide red">WORKS</h3>
            </div>
            <p className="vertical rocextrawideLight">
              WORKS
            </p>
            <div className="ruler">
                <div className={`keyv-wrap ${load && 'active'}`}>
                  <div className="img">
                    <picture className={`picture${props.post.id}`}>
                      <source srcSet={props.post['acf']['pc_thumbnail']} media="(min-width: 750px)" />
                      <img layout='fill' src={props.post['acf']['sp_thumbnail']} alt={props.post && props.post.title.rendered} />
                    </picture>
                  </div>
                  <div className="cover"></div>
                </div>
                <div className="detail flex space-between">
                  <div>
                    <h2 className="title futura bold" dangerouslySetInnerHTML={{__html: props.post.title.rendered.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'')}}></h2>
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
                <div className="gallery" dangerouslySetInnerHTML={{__html: setGallery(props.post['acf']['images'])}}></div>
                {props.post['acf']['video']['url'] !== '' && <div className="gallery video"><div className="img"><video src={props.post['acf']['video']['url']} playsInline autoPlay muted loop /></div></div>}
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
                          let datum = {
                            thisCategories: ''
                        };
                        datum.max = props.posts.length;
                        datum.type = 'others';
                        datum.index = index;
                        datum.item = item;
                        for (let i = 0; i < item.categories.length; i++) {
                            for (let j = 0; j < props.cats.length; j++) {
                                if (item.categories[i] === props.cats[j].id && props.cats[j].name !== 'Works') {
                                    datum.thisCategories += ` ${props.cats[j].name} /` 
                                }
                            }
                        }
                        datum.className = ''
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
  // const wpClient = new WP({
  //   endpoint: `${process.env.NEXT_PUBLIC_WP_API_URL}/wp-json/wp/v2/posts`
  // })
  const res1 = await axios.get(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp-json/wp/v2/posts/?per_page=100`)
  const posts = await res1.data
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
