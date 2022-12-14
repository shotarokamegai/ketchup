import Head from 'next/head'
import Script from 'next/script'
import styles from '../../styles/Home.module.css'
import { motion, useScroll, useSpring } from "framer-motion";

import Content from '../../components/content'

export default function About() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
    });
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
        <motion.div className="progress-bar" style={{ scaleX }} />
          <main id="about" className="common main_">
            <section id="top">
                <div className="ruler">
                    <h3 className="section-title rocextrawide red">ABOUT</h3>
                    <p className="section-text">
                        トマトソースは<br className="sp" />
                        トマトをベースに作られました。<br />
                        その後トマトソースをいつでも楽しめるように<br className="sp" />
                        ケチャップが開発され、<br className="pc" />
                        世界中で味わえるような<br className="sp" />調味料として普及しました。<br /><br />
                        世の中には素晴らしいアイディア、<br className="sp" />コンテンツが無数に広がっています。<br />
                        私たちの力で少し味付けをして、<br className="sp" />さらにより良い形で届けられるように。<br /><br />
                        Ketchupはそんな想いで設立された、<br className="sp" />クリエイティブカンパニーです。
                    </p>
                    <div className="img">
                        <img src="/img/common/ketchup-illustration.png" alt="" />
                    </div>
                </div>
                <p className="vertical rocextrawideLight">
                    PROFILE
                </p>
                <div className="ruler">
                    <div className="company">
                        <div className="flex">
                            <p>
                                <span className="futura">Company Name</span>
                                <span>株式会社Ketchup</span>
                            </p>
                            <p>
                                <span className="futura">Founded</span>
                                <span>2022年7月1日</span>
                            </p>
                        </div>
                        <div className="flex">
                            <p>
                                <span className="futura">CEO</span>
                                <span>亀谷 晶太郎</span>
                            </p>
                            <p>
                                <span className="futura">Office</span>
                                <span>東京都世田谷区野沢3-23-20 MIURA TERRACE HOUSE B</span>
                            </p>
                        </div>
                        <div className="flex">
                            <p>
                                <span className="futura">Tel</span>
                                <span>080-4628-6277</span>
                            </p>
                            <p>
                                <span className="futura">Capital</span>
                                <span>1,000,000円</span>
                            </p>
                        </div>
                        <div>
                            <p>
                                <span className="futura">Fields of Activities</span>
                                <span>
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
          </main>
        </Content>
      </div>
    </>
  )
}