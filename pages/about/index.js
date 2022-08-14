import Head from 'next/head'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { motion, useScroll, useSpring } from "framer-motion";
import Content from '../components/content'

export default function About() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
    });
  const meta = {
    title: 'ABOUT',
    description: ''
  }
  return (
    <>
        <NextSeo title="ABOUT | Ketchup Inc." opentGraph={{
          title: "ABOUT | Ketchup Inc.",
        }}/>
      <div className={styles.container}>
        <Content>
        <motion.div className="progress-bar" style={{ scaleX }} />
          <main id="about" className="common main_">
            <section id="top">
                <div className="ruler">
                    <h3 className="section-title rocextrawide red">ABOUT</h3>
                    <p className="section-text futura">
                        株式会社Ketchupは企業のコーポレートサイト、商品の魅力を伝えるプロモーションサイトをはじめ、<br/>
                        広告、企業、ブランドに纏わるさまざまなモノを企画・制作している、
                        「インターネット領域」に強みを持つ制作会社です。<br /><br />
                        その他にグラフィック制作、データ分析、撮影など、クリエイティブ領域全般の業務を行います。
                    </p>
                </div>
                <p className="vertical rocextrawideLight">
                    PROFILE
                </p>
                <div className="ruler">
                    <div className="company">
                        <div className="flex">
                            <p className="futura">
                                <span>Company Name</span>
                                <span>株式会社Ketchup</span>
                            </p>
                            <p className="futura">
                                <span>Founded</span>
                                <span>2022年7月1日</span>
                            </p>
                        </div>
                        <div className="flex">
                            <p className="futura">
                                <span>CEO</span>
                                <span>亀谷 晶太郎</span>
                            </p>
                            <p className="futura">
                                <span>Office</span>
                                <span>東京都世田谷区下馬2-2-5 301</span>
                            </p>
                        </div>
                        <div className="flex">
                            <p className="futura">
                                <span>Tel</span>
                                <span>080-4628-6277</span>
                            </p>
                            <p className="futura">
                                <span>Capital</span>
                                <span>1,000,000円</span>
                            </p>
                        </div>
                        <div>
                            <p className="futura">
                                <span>Fields of Activities</span>
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