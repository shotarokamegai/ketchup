import React, { useEffect } from "react";
import Head from 'next/head'
import Script from 'next/script'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { gsap } from "gsap";
import styles from '../../styles/Home.module.css'

import Content from '../../components/content'
import WorkTogether from '../../components/work-together'

export default function About() {
  const returnY = () => {
    let y;
    if (window.innerWidth < 750) {
        y = window.innerWidth * -.7;
    } else {
        y = window.innerWidth * -.297222;
    }
    return y
  }
  const setAnimation = () => {
    gsap.to('#lamp', {
        y: () => returnY(),
        scrollTrigger: {
          trigger: '.container',
          start: `0`, 
          end: `20%`,
          scrub: 1,
// once:true,
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
// once:true,
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
// once:true,
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
// once:true,
          invalidateOnRefresh: true
        }
      });
    gsap.to('#container', {
        scrollTrigger: {
          trigger: '.container',
          start: `0`, 
          end: `40%`,
          scrub: 1,
// once:true,
          pin: true,
          invalidateOnRefresh: true
        }
      });
  }
  useEffect(() => {
      setAnimation()
      ScrollTrigger.refresh(true)
      window.onresize = () => {
        console.log('resize')
        if (window.innerWidth < 750) {
        } else {
          ScrollTrigger.refresh(true)
          setAnimation()
        }
      }
      console.log('about loaded')
  }, [])
  return (
    <>
    <Head>
        <title>ABOUT | Ketchup Inc.</title>
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}/about/`} />
        <meta property="og:type" content="website" />
        <meta property="description" content="Ketchup Inc." />
        <meta property="og:title" content="ABOUT | Ketchup Inc." />
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

          gtag('config', ${parseInt(process.env.NEXT_PUBLIC_GTAG)});
        `}
      </Script>
      <div className={styles.container}>
        <Content>
          <main id="about" className="common main_">
            <section id="top">
                <div className="ruler">
                    <h2 className="section-title red fixed">
                      <span className="borax italic">About</span>
                    </h2>
                    <div className="img">
                        <div className="bg" id="bg">
    					   	<img width="" height="" src="/img/common/bg.png" alt="" />
                        </div>
                        <div className="lamp" id="lamp">
    					   	<img width="" height="" src="/img/common/lamp.png" alt="" />
    					   	<img id="light" width="" height="" src="/img/common/light.png" alt="" />
                        </div>
                        <div className="team" id="team">
    					   	<img width="" height="" src="/img/common/team.png" alt="" />
                        </div>
                    </div>
                    <p className="section-text red">
                        トマトソースは<br className="sp" />
                        トマトをベースに作られました。<br />
                        その後トマトソースをいつでも楽しめるように<br className="sp" />
                        ケチャップが開発され、<br className="pc" />
                        世界中で味わえるような<br className="sp" />調味料として普及しました。<br /><br />
                        世の中には素晴らしいアイディア、<br className="sp" />コンテンツが無数に広がっています。<br />
                        私たちの力で少し味付けをして、<br className="sp" />さらにより良い形で届けられるように。<br /><br />
                        Ketchupはそんな想いで設立された、<br className="sp" />クリエイティブカンパニーです。
                    </p>
                </div>
                <div className="ruler">
                    <div className="company">
                        <div className="flex">
                            <p>
                                <span className="roc red">Company Name</span>
                            </p>
                            <p>
                                <span className="red">株式会社Ketchup</span>
                            </p>
                        </div>
                        <div className="flex">
                            <p>
                                <span className="roc red">Founded</span>
                            </p>
                            <p>
                                <span className="red">2022年7月1日</span>
                            </p>
                        </div>
                        <div className="flex">
                            <p>
                                <span className="roc red">CEO</span>
                            </p>
                            <p>
                                <span className="red">亀谷 晶太郎</span>
                            </p>
                        </div>
                        <div className="flex">
                            <p>
                                <span className="roc red">Office</span>
                            </p>
                            <p>
                                <span className="red">〒152-0003 <br className="sp" />東京都目黒区碑文谷5-15-6 ダイナシティ碑文谷 416</span>
                            </p>
                        </div>
                        <div className="flex">
                            <p>
                                <span className="roc red">Tel</span>
                            </p>
                            <p>
                                <span className="red">03-5936-6477</span>
                            </p>
                        </div>
                        <div className="flex">
                            <p>
                                <span className="roc red">Capital</span>
                            </p>
                            <p>
                                <span className="red">1,000,000円</span>
                            </p>
                        </div>
                        <div className="flex">
                            <p>
                                <span className="roc red">Fields of Activities</span>
                            </p>
                            <p>
                                <span className="red">
                                    Web制作（コーポレートサイト・ブランドサイト・EC サイト・オウンドメディア・LP 他）
                                    ブランド戦略・デジタルブランディング（コミュニケーション戦略・カスタマーエクスペリエンス・CI/VI開発 他）
                                    グラフィック制作（広告・会社案内・入社案内・パンフレット・ポスター 他）
                                    WEBシステム・アプリケーション開発（CMS開発・EC開発・フロントエンド開発・アニメーション 他）
                                    WEBサイトの保守・運用支援（取材・ライティング・更新支援・デジタルマーケティング）
                                </span>
                            </p>
                        </div>
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