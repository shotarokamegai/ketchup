import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Head from 'next/head'
import Script from 'next/script'
import axios from "axios"
import Link from 'next/link'
import { useRouter } from "next/router";
import Arrow from '../../components/svg/arrow';
import WorkTogether from '../../components/work-together';
import { motion } from "framer-motion";
import Content from '../../components/content'
import styles from '../../styles/Home.module.css'

export default function Work(props) {
    gsap.registerPlugin(ScrollTrigger)
    const [load, setOnload] = useState(false);
    const router = useRouter(); 
    const { id } = router.query;
    
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
        <p className="roc-grotesk medium red">
            {thisCategories.slice( 0, -1 )}
        </p>
      )
    }

    const setGallery = (images) => {
      let html = '';
      if (images) {
        for (let i = 0; i < images.length; i++) {
          let imgs = images[i]['imgs']
          let className = '';
          if (imgs.length > 1) {
            className += 'flex space-between double';
          } else if (imgs.length > 2) {
            className += 'flex space-between triple';
          }
          let html_ = `<div class="column ${className}">`;
          for (let k = 0; k < imgs.length; k++) {
            let img = imgs[k];
              html_ += 
                  `<div class="img addactive" key=${k}>
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
  const scrollAnimation = () => {
    let addactive = document.getElementsByClassName('addactive');

    for (let i = 0; i < addactive.length; i++) {
      let elm = addactive[i];
      let start = `top center+=${window.innerHeight/4}`;
      if (elm.classList.contains('blur')) {
        start = `top center`;
      }
      gsap.to(elm, {
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: elm,
          start: start, 
          onEnter: () => {
            elm.classList.add('active');
            if (elm.classList.contains('show')) {
              setTimeout(() => {
                elm.classList.add('nowillchange');
              }, 3000)
            }
          }
        }
      });
    }
  }

    const onLoad = (e) => {
        ScrollTrigger.refresh(true);
        setOnload(true)
        scrollAnimation();
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
        <main id="work" className={`common main_`}>
          <section id="top">
            <div className="ruler">
              <h2 className="section-title red fixed">
                <span className="borax italic">Works</span>
              </h2>
            </div>
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
                <div className="left">
                <p dangerouslySetInnerHTML={{__html: `(${props.post.id})`}} className="index roc-grotesk light red"></p>
                  <div className="title">
                    <h2 className="roc-grotesk red" dangerouslySetInnerHTML={{__html: props.post.title.rendered.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'')}}></h2>
                  </div>
                  <div className={ props.post['acf']['url'] !== '' ? "categories flex align-center" : "categories flex align-center no-url" }>
                    { getCategories(props.cats) }
                  </div>
                </div>
                <div className="right">
                  <div className="client">
                    <p className="borax red italic">Client</p>
                    <p className="roc-grotesk red medium">{props.post['acf']['client']}</p>
                  </div>
                  {props.post['acf']['url'] !== '' && 
                    <a href={props.post['acf']['url']} rel="noopener noreferrer" target="_blank">
                        <div className='mix-text red'>
                            <div className="mix-text__inner">
                                <span className='roc-grotesk-wide'>VISIT</span>
                                <span className='borax italic no-m'>Site</span>
                                <span className='icon instagram'>
                                    <Arrow color="bg-red stroke" />
                                </span>
                                <span className='mix-text-line bg-red'></span>
                            </div>
                        </div>
                    </a>
                  }
                </div>
              </div>
              {props.post['acf']['video'] &&
                <div className="gallery video">
                  <div className="img addactive">
                    <video src={props.post['acf']['video']} playsInline autoPlay muted loop />
                  </div>
                </div>
              }
              <div className="gallery" dangerouslySetInnerHTML={{__html: setGallery(props.post['acf']['images'])}}></div>
              </div>
              <Link href="/works" scroll={false}>
                <div className={`btn btn-full`}>
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
                        <Arrow color="bg-red stroke" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
          </section>
          <WorkTogether />
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
