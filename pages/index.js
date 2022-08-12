import React, { useState } from "react";
import fetch from 'node-fetch'

import Image from 'next/image'
import List from './components/list'
import Arrow from './components/svg/arrow'
import useSWR from 'swr'
import axios from "axios"
import Content from './components/content'
import fetcher from './components/fetcher'
import styles from '../styles/Home.module.css'
import { motion, useScroll, useSpring } from "framer-motion";


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
//   const { scrollYProgress } = useScroll();
//   const [page, setPage] = useState(1);
//   const [posts, setPosts] = useState(props.posts)
//   const [maxPage, setMaxPage] = useState(0);
//   const scaleX = useSpring(scrollYProgress, {
//       stiffness: 100,
//       damping: 30,
//       restDelta: 0.001
//     });
//   let i = 0

//   console.log(posts)

//   getPageNum()

//   function getPageNum() {
//     async function a() {
//        const res = await axios.get(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp-json/wp/v2/posts`);
//        const num = Number(res.headers['x-wp-totalpages']);

//        setMaxPage(num)
//     }
//     a()
//   }

//   function GetDataFromWp() {
//     async function a() {
//         const res = await axios.get(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp-json/wp/v2/posts?_embed&page=${page+1}`);
//         setPage((page) => page+1)
//         setPosts((posts) => posts.concat(res.data))
//     }
//     a()
//   }


  return(
    <></>
    // <div className={styles.container}>
    //   <Content>
    //   <motion.div className="progress-bar" style={{ scaleX }} />
    //     <main id="home" className="main_">
    //       <section id="top">
    //           <div className="ruler flex space-between">
    //               <div>
    //                   <h1 className="logo">
    //                       <Image layout='fill' objectFit="contain" src="/img/common/logo.svg" alt="Ketchup" />
    //                   </h1>
    //               </div>
    //               <div>
    //                   <h2 className="slogan roc">
    //                       We know the internet and people in equal measure. 
    //                   </h2>
    //               </div>
    //           </div>
    //       </section>
    //       <section className="works-wrapper">
    //           <p className="vertical rocextrawideLight">
    //               WORKS
    //           </p>
    //           <div className="inner">
    //               <ul className="flex">
    //                 {posts && 
    //                   posts.map((item, index) => {
    //                       let datum = {
    //                           thisCategories: ''
    //                       };
    //                       datum.index = index;
    //                       datum.item = item;
    //                       for (let i = 0; i < item.categories.length; i++) {
    //                           for (let j = 0; j < props.cats.length; j++) {
    //                               if (item.categories[i] === props.cats[j].id && props.cats[j].name !== 'Works') {
    //                                   datum.thisCategories += ` ${props.cats[j].name} /` 
    //                               }
    //                           }
    //                       }
    //                       datum.className = returnClassName(i);
    //                       if (i === 5) {
    //                           i = 0;
    //                       } else {
    //                           i++;
    //                       }
    //                       return(
    //                         <List key={index} {...datum} />
    //                       )
    //                   })}
    //               </ul>
    //               {maxPage > page && <div className="btn flex flex-sp space-between align-center" onClick={GetDataFromWp}>
    //                 <span className="text rocextrawideLight">LOAD MORE</span>
    //                 <Arrow className="white" />
    //               </div>}
    //           </div>
    //       </section>
    //     </main>
    //   </Content>
    // </div>
  )
}

export async function getStaticProps() {
//   const res1 = await fetch(`https://pokeapi.co/api/v2/pokemon/`)
//   const res2 = await fetch(`https://pokeapi.co/api/v2/pokemon/`)
  const res1 = await fetch(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp-json/wp/v2/posts?_embed/`)
  const res2 = await fetch(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp-json/wp/v2/categories/`)
  
  const posts = await res1.json()
  const cats = await res2.json()
 
  return {
    props: {
      posts: posts,
      cats: cats
    //   posts: JSON.parse(JSON.stringify(posts)),
    //   cats:  JSON.parse(JSON.stringify(cats))
    }
  }
}

export default Home